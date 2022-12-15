const db = require("../../db/db");

async function getCreateImage(req) {
  const images = req.files.map((image) => {
    return image.filename;
  });
  return {
    images,
  };
}
async function getCreateFile(req) {
  const file = req.files.map((file) => {
    return file.filename;
  });
  return {
    file,
  };
}

module.exports = {
  getCreateImage,
  getCreateFile,
};
