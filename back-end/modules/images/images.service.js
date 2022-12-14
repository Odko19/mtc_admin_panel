const db = require("../../db/db");

async function getCreateImage(req) {
  const images = req.files.map((image) => {
    return `http://localhost:3001/v1/uploads/${image.filename}`;
  });
  return {
    images,
  };
}

module.exports = {
  getCreateImage,
};
