const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const path = require('path');

const DOWNLOAD_DIR = path.join(__dirname, '../public/images/tvs');
const DATA_FILE = path.join(__dirname, '../src/data/tvs.json');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

function decodeQP(input) {
  return input.replace(/=\r?\n/g, '').replace(/=([0-9A-F]{2})/gi, (match, p1) => String.fromCharCode(parseInt(p1, 16)));
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`Status: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

function extractTVsFromMHTML(mhtmlPath, limit = 20) {
  if (!fs.existsSync(mhtmlPath)) {
    console.error("MHTML file not found!");
    return [];
  }
  const mhtml = fs.readFileSync(mhtmlPath, 'utf8');
  const htmlRaw = mhtml.substring(mhtml.indexOf('<html'), mhtml.indexOf('------MultipartBoundary', mhtml.indexOf('<html')));
  const html = decodeQP(htmlRaw);
  
  const regex = /<div[^>]*id="([0-9]+)"[^>]*>.*?alt="([^"]+)"[^>]*src="([^"]+)"/gis;
  const items = [];
  let match;
  
  while ((match = regex.exec(html)) !== null && items.length < limit) {
    const id = match[1];
    let title = match[2].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/=E2=80=9D/g, '"').replace(/â€/g, '"');
    const smallImageUrl = match[3];
    const largeImageUrl = smallImageUrl.replace('/small/', '/large/');
    
    let brand = "Unknown";
    const knownBrands = ["Samsung", "LG", "Sony", "TCL", "Hisense", "Vizio", "Element", "RCA", "Furrion"];
    for (const b of knownBrands) {
      if (title.toLowerCase().includes(b.toLowerCase())) { brand = b; break; }
    }
    
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cleanModel = `m-${id}`;
    const cleanSku = `sku-${id}`;
    const productUrl = `https://www.brandsmartusa.com/${brand.toLowerCase()}/${id}/${slug}.htm`;
    
    items.push({
      id: `${slug}-model-${cleanModel}-sku-${cleanSku}`,
      brandsmartId: id,
      brand,
      title,
      productUrl,
      sourceImageUrl: largeImageUrl,
      images: [`/images/tvs/tv-${items.length + 1}-1.webp`], // Base image
      model: `M-${id}`,
      sku: `SKU-${id}`,
      price: Math.floor(Math.random() * 1000) + 299.99,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 10,
      description: `Premium ${brand} TV. Enjoy incredible contrast, resolution, and smart platform features.`,
      features: ["4K UHD", "Smart Platform", "HDR10", "120Hz Refresh Rate"],
      specifications: {
         "Screen Size": title.match(/\d+"|\d+”/)?.[0] || "55\"",
         "Resolution": "4K Ultra HD",
         "Display Type": "LED",
         "Smart TV": "Yes",
         "HDMI Ports": "3"
      }
    });
  }
  return items;
}

(async () => {
  console.log('1. Parsing local MHTML file to extract top 400 TVs...');
  const mhtmlPath = path.join(__dirname, '../TV & Home Theater - BrandsMartUSA.mhtml');
  const tvs = extractTVsFromMHTML(mhtmlPath, 400);
  
  if (tvs.length === 0) {
    console.log("No TVs extracted. Check MHTML file location.");
    return;
  }
  console.log(`Extracted ${tvs.length} TVs!`);

  console.log('2. Launching Playwright to scrape full image galleries and specs from PDPs...');
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/124.0.0.0 Safari/537.36' });
  const page = await context.newPage();
  
  for (let i = 0; i < tvs.length; i++) {
    const tv = tvs[i];
    console.log(`\nScraping PDP [${i+1}/${tvs.length}]: ${tv.productUrl}`);
    
    try {
      // Navigate to the PDP
      await page.goto(tv.productUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(3000); // Wait for gallery to load
      
      // Extract gallery images and specs
      const scrapedData = await page.evaluate(() => {
        const galleryImages = Array.from(document.querySelectorAll('.thumbnail-list img, .gallery img, img[src*="syndigo/images/product/"]'))
                                   .map(img => img.src.replace('/small/', '/large/'))
                                   .filter(src => src.includes('/large/'));
        
        const priceEl = document.querySelector('.sale-price, .price-block');
        const priceMatch = priceEl ? priceEl.innerText.match(/\$([0-9,]+\.[0-9]{2})/) : null;
        
        const featuresList = Array.from(document.querySelectorAll('.product-features li, .key-features li')).map(li => li.innerText);
        
        return {
           gallery: [...new Set(galleryImages)],
           price: priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : null,
           features: featuresList
        };
      });
      
      if (scrapedData.gallery.length > 0) {
        tv.sourceGalleryUrls = scrapedData.gallery;
        tv.images = scrapedData.gallery.map((_, idx) => `/images/tvs/tv-${i+1}-${idx+1}.webp`);
        console.log(`   -> Found ${scrapedData.gallery.length} gallery images!`);
      }
      if (scrapedData.price) tv.price = scrapedData.price;
      if (scrapedData.features.length > 0) tv.features = scrapedData.features.slice(0, 5);
      
    } catch (e) {
      console.log(`   -> Timeout or block on PDP. Using default single image.`);
      tv.sourceGalleryUrls = [tv.sourceImageUrl]; // Fallback to primary
    }
  }
  
  await browser.close();

  console.log('\n3. Downloading high-res assets...');
  for (let i = 0; i < tvs.length; i++) {
    const tv = tvs[i];
    const urls = tv.sourceGalleryUrls || [tv.sourceImageUrl];
    for (let j = 0; j < urls.length; j++) {
      const dest = path.join(DOWNLOAD_DIR, `tv-${i+1}-${j+1}.webp`);
      try {
        await downloadImage(urls[j], dest);
      } catch (err) {}
    }
    delete tv.sourceImageUrl;
    delete tv.sourceGalleryUrls;
    delete tv.brandsmartId;
    delete tv.productUrl;
  }
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(tvs, null, 2));
  console.log(`\nSuccessfully generated updated database at ${DATA_FILE}`);
})();
