const db = require("../../db/db");

async function getAllShare(req) {
  const data = await db.query("select * from shareholders");
  return {
    success: true,
    data,
  };
}

async function getShareById(req) {
  let data;
  const { id } = req.query;
  if (id !== undefined) {
    data = await db.query("SELECT * FROM shareholders WHERE id=?;", [id]);
  } else {
    data;
  }
  return {
    success: true,
    data,
  };
}

async function getCreateShare(req) {
  let data;
  const { title, body, created_by } = req.body;
  req.files[0]
    ? (data = await db.query(
        "INSERT INTO  shareholders(title, cover_img, body, created_by, created_at , updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [title, req.files[0].filename, body, created_by]
      ))
    : (data = await db.query(
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
  const cover_img = req.files[0].filename;
  const data = await db.query(
    `UPDATE shareholders
     SET title=?, cover_img=?, body=?, created_by=?, updated_at=now()
     WHERE id=?`,
    [title, cover_img, body, created_by, id]
  );
  return {
    success: true,
    data,
  };
}

async function getDeleteShare(req) {
  let data;
  const { id } = req.query;
  if (id !== undefined) {
    data = await db.query("DELETE FROM shareholders where id = ?", [id]);
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
  getShareById,
  getCreateShare,
  getUpdateShare,
  getDeleteShare,
};
