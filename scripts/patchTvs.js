const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../src/data/tvs.json');
const tvs = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const updates = {
  "tcl-98-qm8k-series-qd-mini-led-qled-4k-uhd-smart-tv-with-google-tv-model-m-269464-sku-sku-269464": {
    model: "98QM8K",
    sku: "6625840",
    originalPrice: 1999.99,
    price: 999.99,
    manualUrl: "https://www.brandsmartusa.com/syndigo/pdfs/manuals/f6c38e93-2c5c-4876-b580-3b8a26af9147.pdf"
  },
  "tcl-85-qm8k-series-qd-mini-led-qled-4k-uhd-smart-tv-with-google-tv-model-m-269463-sku-sku-269463": {
    model: "85QM8K",
    sku: "6625843",
    originalPrice: 1799.99,
    price: 349.99,
    manualUrl: "https://www.brandsmartusa.com/syndigo/pdfs/manuals/6c79b133-4787-49e3-b495-bbe53c0ef861.pdf"
  },
  "tcl-65-qm8k-series-qd-mini-led-qled-4k-uhd-smart-tv-with-google-tv-model-m-269461-sku-sku-269461": {
    model: "65QM8K",
    sku: "6625842",
    originalPrice: 999.99,
    price: 299.99,
    manualUrl: "https://www.brandsmartusa.com/syndigo/pdfs/manuals/6c79b133-4787-49e3-b495-bbe53c0ef861.pdf"
  }
};

const commonDescription = `TCL QM8K Series Smart TV is The New, Ultimate Choice TV for fast action movies, sports, and next level gaming TCL’s Halo Control System that includes the New Super High Energy LED Microchip, Condensed Micro Lens, Micro OD Reduced Optical Distance, CrystGlow WHVA Panel, Enhanced QLED, Zero Delay Transient Response, Bi-direction 23-bit Backlight Controller, and Dynamic Light Algorithm for Stunning “Halo-Free” Images. With up to LD3800 Precise Dimming Series and up to HDR5000 Brightness, you’ll experience pure black levels and a great picture in virtually any room lighting environment. TCL's AIPQ PRO Processor, an advanced processor optimizing each scene provides an unrivaled cinematic experience. 144Hz native panel refresh rate with Motion Rate 480 focuses on best-in-class motion clarity producing smooth video playback. With TCL's Game Accelerator 288 and Auto Game Mode gameplay is blistering fast keeping you ahead of the competition. TCL QM8K TVs feature Audio by Bang & Olfusen as well as Dolby Atmos and DTS Virtual:X for accurate, immersive sound.`;

const commonFeatures = [
  "QD-Mini LED | CL Halo Control System | Up to LD3800 Precise Dimming",
  "High HDR5000 Brightness",
  "CrystGlow WHVA Panel | Enhanced QLED",
  "4K UltraHD Resolution | 144Hz Native Refresh Rate",
  "Game Accelerator 288",
  "TCL AIPQ PRO Processor | Motion Rate 480 with MEMC Frame Insertion | Filmmaker Mode",
  "HDR ULTRA with Dolby Vision IQ, HDR10+, HDR10, & HLG | Audio by BANG & OLUFSEN | Dolby Atmos Audio",
  "DTS Virtual:X | ATSC 3.0 NextGen TV Digital Tuner | IMAX Enhanced Certification",
  "Auto Game Mode (ALLM) with AMD FreeSync Premium Pro",
  "Ultra Slim Design",
  "Google TV Smart OS with Hands-Free Voice Control and Backlit Voice Remote | Bluetooth Personal Audio | 4 HDMI Inputs including one with eARC | Wi-Fi 6 | Google Chromecast Built-in | Apple AirPlay 2",
  "Works with: Amazon Alexa, Google Assistant, Apple HomeKit"
];

let updatedCount = 0;
tvs.forEach(tv => {
  if (updates[tv.id]) {
    Object.assign(tv, updates[tv.id]);
    tv.description = commonDescription;
    tv.features = commonFeatures;
    updatedCount++;
  }
});

fs.writeFileSync(dataFile, JSON.stringify(tvs, null, 2));
console.log(`Updated ${updatedCount} TVs!`);
