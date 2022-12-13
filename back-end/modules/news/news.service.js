const db = require("../../db/db");

async function getAllNews(req) {
  const { page, limit } = req.query;
  let data, totalPage, data_count, startId;
  if (page !== undefined || limit !== undefined) {
    startId = (page - 1) * limit;
    data_count = await db.query("select count(*) as count from news");
    totalPage = data_count && data_count[0].count / limit;
    data = await db.query(
      ` SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at, 
        news.updated_at,type_status, users.firstName as created_by FROM news
        left JOIN users ON created_by = users.id limit ?, ?`,
      [JSON.stringify(startId), limit]
    );
  } else {
    data;
  }

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
  let data, totalPage, data_count, startId;
  if (page !== undefined || type !== undefined) {
    startId = (page - 1) * 6;
    data_count = await db.query(
      "select count(*) as count  from news where type=?",
      [type]
    );
    totalPage = data_count && data_count[0].count / 6;
    data = await db.query(
      `SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at, 
       news.updated_at,type_status, users.firstName as created_by FROM news
       left JOIN users ON created_by = users.id limit ?, 6
    `,
      [type, JSON.stringify(startId)]
    );
  } else {
    data;
  }
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
  let data;
  if (id !== undefined) {
    data = await db.query("SELECT * FROM news where id = ?", [id]);
  } else {
    data;
  }
  return {
    success: true,
    data,
  };
}

async function getCreateNews(req) {
  const { title, body, created_by, type } = req.body;
  req.files[0]
    ? (data = await db.query(
        "INSERT INTO  news(title, cover_img, body, created_by , type, created_at , updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [title, req.files[0].filename, body, created_by, type]
      ))
    : (data = await db.query(
        "INSERT INTO  news(title, cover_img, body, created_by , type, created_at , updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [title, null, body, created_by, type]
      ));
  return {
    success: true,
    data,
  };
}

async function getUpdateNews(req) {
  const { id, title, body, created_by, type } = req.body;
  req.files[0]
    ? (data = await db.query(
        `UPDATE news
     SET title=?, cover_img=?, body=?, created_by=?, type=?, updated_at=now()
     WHERE id=?`,
        [title, coverImg, body, created_by, type, id]
      ))
    : (data = await db.query(
        `UPDATE news
     SET title=?, cover_img=?, body=?, created_by=?, type=?, updated_at=now()
     WHERE id=?`,
        [title, null, body, created_by, type, id]
      ));

  return {
    success: true,
    data,
  };
}

async function getDeleteNews(req) {
  const { id } = req.query;
  if (id !== undefined) {
    data = await db.query("DELETE FROM news where id = ?", [id]);
  } else {
    data;
  }
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
