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
        return `http://localhost:3001/uploads/${image.filename}`;
      });
    //    await db.query(
    //     "INSERT INTO  images(cover_img) VALUES (?)",
    //     [images]
    //   );
      return {
        data:images,
      };
}



module.exports = {
    getCreateImage,

};
