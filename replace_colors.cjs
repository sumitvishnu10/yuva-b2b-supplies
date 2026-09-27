const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function findAndReplace(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findAndReplace(filePath);
    } else if (filePath.endsWith('.css') || filePath.endsWith('.jsx')) {
      // Exclude Footer.css from the powder-blue variable replacement 
      // (already manually replaced color to #B3DEF8).
      // Wait, Footer.css might have rgba(179, 222, 248) if it had any, but grep said it didn't.
      
      let content = fs.readFileSync(filePath, 'utf8');
      
      let newContent = content
        .replace(/#B3DEF8/gi, '#0F4C81')
        .replace(/179,\s*222,\s*248/g, '15, 76, 129');
        
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
}

findAndReplace(directoryPath);
console.log('Done!');
