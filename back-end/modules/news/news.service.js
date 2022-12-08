const db = require("../../db/db");

async function getAllNews(req) {
  const { page, limit } = req.query;
  const startId = (page - 1) * limit;
  const data_count = await db.query("select count(*) as count from news");
  const totalPage = data_count[0].count / limit;
  const data = await db.query("select * from news limit ?, ?", [
    JSON.stringify(startId),
    limit,
  ]);
  return {
    totalPages: Math.ceil(totalPage),
    totalDatas: data_count[0].count,
    currentPage: JSON.parse(page),
    currentPageSize: JSON.parse(limit),
    data,
  };
}
async function getNewsPage(req) {
  const { page, type } = req.query;
  const startId = (page - 1) * 6;
  const data_count = await db.query(
    "select count(*) as count  from news where type=?",
    [type]
  );
  const totalPage = data_count[0].count / 6;
  const data = await db.query("select * from news where type=? limit ?, 6", [
    type,
    JSON.stringify(startId),
  ]);
  return {
    totalPages: Math.ceil(totalPage),
    totalDatas: data_count[0].count,
    currentPage: JSON.parse(page),
    currentPageSize: 6,
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

async function getCreateNews(req) {
  const { title, body, created_by, type } = req.body;
  let data;
  req.files[0]
    ? (data = await db.query(
        "INSERT INTO  news(title, cover_img, body, created_by , type, created_at , updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [title, req.files[0].filename, body, created_by, type]
      ))
    : (data = await db.query(
        "INSERT INTO  news(title, cover_img, body, created_by , type, created_at , updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [title, " ", body, created_by, type]
      ));

  return {
    success: true,
    data,
  };
}

async function getUpdateNews(req) {
  const { id, title, body, created_by, type } = req.body;
  const coverImg = req.files[0].filename;
  const data = await db.query(
    `UPDATE news
     SET title=?, cover_img=?, body=?, created_by=?, type=?, updated_at=now()
     WHERE id=?`,
    [title, coverImg, body, created_by, type, id]
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
