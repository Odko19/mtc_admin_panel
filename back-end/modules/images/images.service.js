const db = require("../../db/db");

async function getCreateImage(req) {
  const images = req.files.map((image) => {
    return `http://10.0.10.53:3001/v1/uploads/${image.filename}`;
  });
  return {
    images,
  };
}

module.exports = {
  getCreateImage,
};
