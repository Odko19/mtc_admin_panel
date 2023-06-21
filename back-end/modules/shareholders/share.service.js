const db_mtc = require("../../db/db_mtc_admin_panel");

async function getAllShare(req) {
  const { id, page, limit } = req.query;
  if (req.query) {
    if (id) {
      const data = await db_mtc.query(
        "SELECT * FROM shareholders WHERE id=?;",
        [id]
      );
      return {
        ...data[0],
      };
    }
    if (page && limit) {
      const startId = (page - 1) * limit;
      const data_count = await db_mtc.query(
        "select count(*) as count from shareholders"
      );
      const totalPage = data_count && data_count[0].count / limit;
      const data = await db_mtc.query(
        "select * from shareholders ORDER BY created_at desc limit ?, ?",
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
  }
}

async function getCreateShare(req) {
  let data;
  const { title, body, created_by } = req.body;
  req.files[0]
    ? (data = await db_mtc.query(
        "INSERT INTO  shareholders(title, cover_img, body, created_by, created_at , updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [title, req.files[0].filename, body, created_by]
      ))
    : (data = await db_mtc.query(
        "INSERT INTO  shareholders(title, cover_img, body, created_by, created_at , updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [title, null, body, created_by]
      ));
  return {
    success: true,
    data,
  };
}

async function getUpdateShare(req) {
  const { id, title, body, created_by } = req.body;
  let data;
  req.files[0]
    ? (data = await db_mtc.query(
        `UPDATE shareholders
     SET title=?, cover_img=?, body=?, created_by=?, updated_at=now()
     WHERE id=?`,
        [title, req.files[0].filename, body, created_by, id]
      ))
    : (data = await db_mtc.query(
        `UPDATE shareholders
     SET title=?, cover_img=?, body=?, created_by=?, updated_at=now()
     WHERE id=?`,
        [title, null, body, created_by, id]
      ));
  return {
    success: true,
    data,
  };
}

async function getDeleteShare(req) {
  let data;
  const { id } = req.query;
  if (id) {
    data = await db_mtc.query("DELETE FROM shareholders where id = ?", [id]);
  } else {
    data;
  }
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllShare,
  getCreateShare,
  getUpdateShare,
  getDeleteShare,
};
