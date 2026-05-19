const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../src/data/tvs.json');
const tvs = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

tvs.forEach(tv => {
  // Create a clean slug from the title
  const cleanTitle = tv.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const cleanModel = tv.model.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const cleanSku = tv.sku.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Update the ID to be the new long slug
  tv.id = `${cleanTitle}-model-${cleanModel}-sku-${cleanSku}`;
});

fs.writeFileSync(dataFile, JSON.stringify(tvs, null, 2));
console.log(`Updated ${tvs.length} TVs with new slug URLs!`);
