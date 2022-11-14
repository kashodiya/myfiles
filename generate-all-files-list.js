const fs = require('fs');
const { resolve } = require('path');
const { readdir } = require('fs').promises;

const curDir = __dirname;

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        console.log(dirent);
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

const start = async function (a, b) {
    let files = await getFiles('files');
    files = files.map((f) => {
        return f.substring(curDir.length);
    })
    console.log(files);
    console.log(curDir);
    fs.writeFileSync('all-files.json', JSON.stringify(files, null, 2));
}

// Call start
start();
