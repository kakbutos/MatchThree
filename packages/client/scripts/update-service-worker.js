import { readFile, writeFile } from 'fs';
import files from '../dist/manifest.json' assert { type: "json" };

/**
 * Скрипт добавляет в dist/sw.js статику
 * с корректными наименованиями assets (c hash)
 */

const urls = files['index.html'].assets
  .concat(files['index.html'].file)
  .concat(files['index.html'].css)
  .filter(name => !name.includes('.map'));

readFile('dist/sw.js', (error, content) => {
  const data = content.toString();
  const newContent = data.replace("%HASHURLS%", JSON.stringify(urls));

  writeFile('dist/sw.js', newContent, (error) => {
    error ? console.log(`Error: ${error}`) : console.log(`Success update service-worker`);
  });
});
