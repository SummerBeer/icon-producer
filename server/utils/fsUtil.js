const fs = require('fs');
const path = require('path');
const logger = require('./logger.js');

function isPathExist(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) {
        reject(false);
      }
      resolve(stat);
    });
  });
}

module.exports = {
  mkdir: async (path) => {
    const isExist = await isPathExist(path).catch((err) => logger.error(err));
    if (isExist) return;
    return new Promise((resolve, reject) => {
      fs.mkdir(path, (err) => {
        if (err) reject(err);
        resolve(true);
      })
    });
  },
  clear: () => {
    const filePath = path.join(__dirname, '../../upload/svg');
    const files = fs.readdirSync(filePath);
    files.forEach((v) => {
      if (!/(.svg)$/.test(v)) {
        fs.unlinkSync(`${filePath}/${v}`);
      }
    })
  }
}