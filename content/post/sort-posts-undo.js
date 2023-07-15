const fs = require('fs');
const path = require('path');

function getFolders() {
  return fs.readdirSync(__dirname, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function undoFolderRename(folders) {
  const pattern = /^(\d{1,})-(.*)$/;
  folders.forEach((folder) => {
    const match = folder.match(pattern);
    if (match) {
      const [, , originalName] = match;
      const oldFolderPath = path.join(__dirname, folder);
      const newFolderPath = path.join(__dirname, originalName);
      fs.renameSync(oldFolderPath, newFolderPath);
      console.log(`Renamed "${folder}" back to "${originalName}"`);
    }
  });
}

function main() {
  const folders = getFolders();
  undoFolderRename(folders);
}

main();