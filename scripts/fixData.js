const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../src/data/tvs.json');
const tvs = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

tvs.forEach(tv => {
  // Fix double double quotes (e.g., '75""' -> '75"')
  tv.title = tv.title.replace(/""/g, '"');
  
  // Also clean up any lingering ' "" ' or space issues
  tv.title = tv.title.replace(/\s+/g, ' ').trim();
});

fs.writeFileSync(dataFile, JSON.stringify(tvs, null, 2));
console.log(`Cleaned double quotes for ${tvs.length} TVs!`);
