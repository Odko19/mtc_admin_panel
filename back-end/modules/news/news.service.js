const db = require("../../db/db");

async function getAllNews(req) {
  const data = await db.query("select * from news");
  return {
    success: true,
    data,
  };
}
async function getNewsById(req) {
  const { id } = req.query;
  const data = await db.query("SELECT * FROM news where id = ?", [id]);
  return {
    success: true,
    data,
  };
}

async function getNewsPage(req) {
  const { page, limit, type } = req.query;
  const startId = (page - 1) * limit;
  const data_count = await db.query(
    "select count(*) as count  from news where type=?",
    [type]
  );
  let page_total = data_count[0].count / limit;
  if (data_count[0].count / limit !== 0) {
    console.log(data_count[0].count / limit + 1);
  } else {
    console.log(data_count[0].count / limit);
  }
  // console.log(count);
  const data = await db.query("select * from news where type=? limit ?, ?", [
    type,
    JSON.stringify(startId),
    limit,
  ]);
  return {
    success: true,
    pagination: {},
    data,
  };
}

async function getCreateNews(req) {
  const { title, body, created_by, type } = req.body;
  const images = req.files.map((image) => {
    return `http://localhost:3001/uploads/${image.filename}`;
  });
  const data = await db.query(
    "INSERT INTO  news(title, cover_img, body, created_by , type, created_at , updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
    [title, images, body, created_by, type]
  );
  return {
    success: true,
    data,
  };
}

async function getUpdateNews(req) {
  const { id, title, body, created_by, type } = req.body;
  console.log(id, title, body, created_by, type);
  const images = req.files.map((image) => {
    return `http://localhost:3001/uploads/${image.filename}`;
  });
  const data = await db.query(
    `UPDATE news
     SET title=?, cover_img=?, body=?, created_by=?, type=?, updated_at=now()
     WHERE id=?`,
    [title, images, body, created_by, type, id]
  );
  return {
    success: true,
    data,
  };
}

async function getDeleteNews(req) {
  const { id } = req.query;
  const data = await db.query("DELETE FROM news where id = ?", [id]);
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllNews,
  getNewsById,
  getNewsPage,
  getCreateNews,
  getUpdateNews,
  getDeleteNews,
};
