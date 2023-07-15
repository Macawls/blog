// Prepends all folders with a number based on the date in the frontmatter of the first .md file in the folder.

const fs = require('fs');
const path = require('path');

function getFolders() {
  return fs.readdirSync(__dirname, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function getFolderDates(folders) {
  const pattern = /date\s*=\s*"(.*)"/;
  return folders.map((folder) => {
    const files = fs.readdirSync(path.join(__dirname, folder));
    const mdFiles = files.filter((file) => path.extname(file) === '.md');
    if (mdFiles.length > 0) {
      const mdFile = mdFiles[0];
      const mdFilePath = path.join(__dirname, folder, mdFile);
      const contents = fs.readFileSync(mdFilePath, 'utf-8');
      const match = contents.match(pattern);
      if (match) {
        const date = match[1];
        return { folder, date };
      }
    }
    return { folder, date: '' };
  }).filter((folderDate) => folderDate.date !== '');
}

function sortFoldersByDate(folderDates) {
  return folderDates.sort((a, b) => a.date.localeCompare(b.date));
}

function renameFolders(sortedFolders) {
  sortedFolders.forEach((folder, index) => {
    const newFolder = `${index}-${folder.folder}`;
    const oldFolderPath = path.join(__dirname, folder.folder);
    const newFolderPath = path.join(__dirname, newFolder);
    fs.renameSync(oldFolderPath, newFolderPath);
    console.log(`Renamed "${folder.folder}" to "${newFolder}"`);
  });
}

function main() {
  const folders = getFolders();
  const folderDates = getFolderDates(folders);
  const sortedFolders = sortFoldersByDate(folderDates);
  renameFolders(sortedFolders);
}

main();