const db = require("../../db/db");

async function getAllAccount(req) {
  const data = await db.query("select * from account");
  return {
    success: true,
    data,
  };
}

async function getAccountById(req) {
  let data;
  const { id } = req.query;
  if (id !== undefined) {
    data = await db.query("SELECT * FROM account WHERE id=?;", [id]);
  } else {
    data;
  }
  return {
    success: true,
    data,
  };
}

async function getCreateAccount(req) {
  let data;
  const { title, body, created_by } = req.body;
  req.files[0]
    ? (data = await db.query(
        "INSERT INTO  account(title, cover_img, body, created_by, created_at , updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [title, req.files[0].filename, body, created_by]
      ))
    : (data = await db.query(
        "INSERT INTO  account(title, cover_img, body, created_by, created_at , updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [title, null, body, created_by]
      ));
  return {
    success: true,
    data,
  };
}

async function getUpdateAccount(req) {
  const { id, title, body, created_by } = req.body;
  const cover_img = req.files[0].filename;

  const data = await db.query(
    `UPDATE account
     SET title=?, cover_img=?, body=?, created_by=?, updated_at=now()
     WHERE id=?`,
    [title, cover_img, body, created_by, id]
  );
  return {
    success: true,
    data,
  };
}

async function getDeleteAccount(req) {
  let data;
  const { id } = req.query;
  if (id !== undefined) {
    data = await db.query("DELETE FROM account where id = ?", [id]);
  } else {
    data;
  }
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllAccount,
  getAccountById,
  getCreateAccount,
  getUpdateAccount,
  getDeleteAccount,
};