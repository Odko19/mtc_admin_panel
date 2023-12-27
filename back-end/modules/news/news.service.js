const db_mtc = require("../../db/db_mtc_admin_panel");

async function getAllNews(req) {
  const { page, limit, id, type, customer } = req.query;
  if (page && limit) {
    const startId = (page - 1) * limit;
    const data_count = await db_mtc.query("select count(*) as count from news");
    const totalPage = data_count && data_count[0].count / limit;
    const data = await db_mtc.query(
      ` SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at,
          news.updated_at, news.expires_at, news.customer_type, users.firstName as created_by,
          datediff(news.expires_at, now()) as duration FROM news
          left JOIN users ON created_by = users.id ORDER BY created_at desc `,
      [JSON.stringify(startId), limit]
    );

    await data.map((a) => {
      if (a.duration <= 0) {
        return (a.duration = "Дууссан");
      } else {
        return (a.duration = `${a.duration} хоног`);
      }
    });

    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: data_count[0].count,
      currentPage: JSON.parse(page),
      currentPageSize: JSON.parse(limit),
      data,
    };
  }
  if (id) {
    const data = await db_mtc.query(
      `SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at,
       news.updated_at, news.expires_at, news.customer_type, users.firstName as created_by,
       datediff(news.expires_at, now()) as duration FROM news
       left JOIN users ON created_by = users.id where news.id=?
      `,
      [id]
    );
    await data.map((a) => {
      if (a.duration <= 0) {
        return (a.duration = "Дууссан");
      } else {
        return (a.duration = `${a.duration} хоног`);
      }
    });
    return {
      ...data[0],
    };
  }
  if (page && type && customer) {
    const { page, type } = req.query;
    const startId = (page - 1) * 6;
    const data_count = await db_mtc.query(
      "select count(*) as count  from news where type=? and customer_type =?",
      [type, customer]
    );

    const totalPage = data_count && data_count[0].count / 6;
    const data = await db_mtc.query(
      `SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at,
        news.updated_at, news.expires_at,  news.customer_type, users.firstName as created_by,
        datediff(news.expires_at, now()) as duration  FROM news
        left JOIN users ON created_by = users.id where type=? && customer_type=? ORDER BY created_at desc limit ?, 6
      `,
      [type, customer, JSON.stringify(startId)]
    );
    await data.map((a) => {
      if (a.duration <= 0) {
        return (a.duration = "Дууссан");
      } else {
        return (a.duration = `${a.duration} хоног`);
      }
    });
    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: data_count[0].count,
      currentPage: JSON.parse(page),
      currentPageSize: 6,
      data,
    };
  }
}

async function getSearchNews(req) {
  const { limit, page, value } = req.query;
  const startId = (page - 1) * limit;
  const data = await db_mtc.query(
    `SELECT news.id, news.title, news.cover_img, news.body, news.type, news.created_at,
          news.updated_at, news.expires_at, news.customer_type, users.firstName as created_by,
          datediff(news.expires_at, now()) as duration FROM news
          left JOIN users ON created_by = users.id  where news.title LIKE ? ORDER BY created_at  `,
    [`%${value}%`]
  );
  const totalPage = data?.length / limit;

  return {
    success: true,
    totalPages: Math.ceil(totalPage),
    totalDatas: data?.length,
    currentPage: JSON.parse(page),
    currentPageSize: limit,
    data,
  };
}

async function getCreateNews(req) {
  const { title, body, created_by, type, expires_at, customer_type } = req.body;
  let data;
  expires_at
    ? (data = await db_mtc.query(
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
    : (data = await db_mtc.query(
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

  if (req.files[0] === undefined) {
    expires_at
      ? (data = await db_mtc.query(
          `UPDATE news
   SET title=?,  body=?, created_by=?, type=?, updated_at=now() , expires_at=?, customer_type=?
   WHERE id=?`,
          [title, body, created_by, type, expires_at, customer_type, id]
        ))
      : (data = await db_mtc.query(
          `UPDATE news
   SET title=?, body=?, created_by=?, type=?, updated_at=now(), expires_at=?, customer_type=?
   WHERE id=?`,
          [title, body, created_by, type, null, customer_type, id]
        ));
  } else {
    expires_at
      ? (data = await db_mtc.query(
          `UPDATE news
SET title=?, cover_img=?, body=?,  created_by=?, type=?, updated_at=now() , expires_at=?, customer_type=?
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
      : (data = await db_mtc.query(
          `UPDATE news
SET title=?,  cover_img=?, body=?, created_by=?, type=?, updated_at=now(), expires_at=?, customer_type=?
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
  }

  return {
    success: true,
    data,
  };
}

async function getDeleteNews(req) {
  const { id } = req.query;
  let data;
  if (id) {
    data = await db_mtc.query("DELETE FROM news where id = ?", [id]);
  }
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllNews,
  getSearchNews,
  getCreateNews,
  getUpdateNews,
  getDeleteNews,
};
