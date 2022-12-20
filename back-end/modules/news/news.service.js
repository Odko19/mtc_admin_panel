const db = require("../../db/db");

async function getAllNews(req) {
  const { page, limit, id, type, customer } = req.query;
  if (page && limit) {
    const startId = (page - 1) * limit;
    const data_count = await db.query("select count(*) as count from news");
    const totalPage = data_count && data_count[0].count / limit;
    const data = await db.query(
      ` SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at, 
          news.updated_at, news.expires_at, news.customer_type, users.firstName as created_by,
          datediff(news.expires_at, now()) as duration FROM news
          left JOIN users ON created_by = users.id ORDER BY created_at desc limit ?, ?`,
      [JSON.stringify(startId), limit]
    );
    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: data_count[0].count,
      currentPage: JSON.parse(page),
      currentPageSize: JSON.parse(limit),
      data,
    };
  }
  if (id) {
    const data = await db.query(
      `SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at, 
       news.updated_at, news.expires_at, news.customer_type, users.firstName as created_by,
       datediff(news.expires_at, now()) as duration FROM news
       left JOIN users ON created_by = users.id where news.id=?
      `,
      [id]
    );
    return {
      ...data[0],
    };
  }
  if (page && type && customer) {
    const { page, type } = req.query;
    const startId = (page - 1) * 6;
    const data_count = await db.query(
      "select count(*) as count  from news where type=?",
      [type]
    );

    const totalPage = data_count && data_count[0].count / 6;
    const data = await db.query(
      `SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at, 
        news.updated_at, news.expires_at,  news.customer_type, users.firstName as created_by,
        datediff(news.expires_at, now()) as duration  FROM news
        left JOIN users ON created_by = users.id where type=? && customer_type=? ORDER BY created_at desc limit ?, 6  
      `,
      [type, customer, JSON.stringify(startId)]
    );

    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: data_count[0].count,
      currentPage: JSON.parse(page),
      currentPageSize: 6,
      data,
    };
  }
}

async function getCreateNews(req) {
  const { title, body, created_by, type, expires_at, customer_type } = req.body;
  let data;
  expires_at
    ? (data = await db.query(
        "INSERT INTO  news(title, cover_img, body, created_by , type, created_at , updated_at, expires_at, customer_type) VALUES (?, ?, ?, ?, ?, NOW(), NOW(),?,?)",
        [
          title,
          req.files[0].filename,
          body,
          created_by,
          type,
          expires_at,
          customer_type,
        ]
      ))
    : (data = await db.query(
        "INSERT INTO  news(title, cover_img, body, created_by , type, created_at , updated_at, expires_at, customer_type) VALUES (?, ?, ?, ?, ?, NOW(), NOW(),?,?)",
        [
          title,
          req.files[0].filename,
          body,
          created_by,
          type,
          null,
          customer_type,
        ]
      ));
  return {
    success: true,
    data,
  };
}

async function getUpdateNews(req) {
  const { id, title, body, created_by, type, expires_at, customer_type } =
    req.body;
  let data;
  expires_at
    ? (data = await db.query(
        `UPDATE news
     SET title=?, cover_img=?, body=?, created_by=?, type=?, updated_at=now() , expires_at=?, customer_type=?
     WHERE id=?`,
        [
          title,
          req.files[0].filename,
          body,
          created_by,
          type,
          expires_at,
          customer_type,
          id,
        ]
      ))
    : (data = await db.query(
        `UPDATE news
     SET title=?, cover_img=?, body=?, created_by=?, type=?, updated_at=now(), expires_at=?, customer_type=?
     WHERE id=?`,
        [
          title,
          req.files[0].filename,
          body,
          created_by,
          type,
          null,
          customer_type,
          id,
        ]
      ));
  return {
    success: true,
    data,
  };
}

async function getDeleteNews(req) {
  const { id } = req.query;
  let data;
  if (id) {
    data = await db.query("DELETE FROM news where id = ?", [id]);
  }
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllNews,
  getCreateNews,
  getUpdateNews,
  getDeleteNews,
};
