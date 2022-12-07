const db = require("../../db/db");

async function getAllNews(req) {
  const data = await db.query("select * from news");
  return {
    success: true,
    data,
  };
}

async function getCreateImage(req) {
  const images = req.files.map((image) => {
    return `http://10.0.10.53:3001/uploads/${image.filename}`;
  });
  return {
    images,
  };
}

module.exports = {
  getCreateImage,
};
