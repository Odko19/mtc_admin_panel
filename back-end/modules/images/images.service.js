// const db_mtc = require("../../db/db_mtc_admin_panel");

async function getCreateImage(req) {
  const images = req.files.map((image) => {
    return image.filename;
  });
  return {
    images,
  };
}
async function getCreateFile(req) {
  console.log(req.files);
  const file = req.files.map((file) => {
    return {
      file: file.filename,
      name: file.originalname,
    };
  });
  return {
    file,
  };
}

module.exports = {
  getCreateImage,
  getCreateFile,
};
