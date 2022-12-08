const db = require("../../db/db");

async function getAllAccount(req) {
  const data = await db.query("select * from account");
  return {
    success: true,
    data,
  };
}

async function getAccountById(req) {
  const { id } = req.query;
  const data = await db.query("SELECT * FROM account WHERE id=?;", [id]);
  return {
    success: true,
    data,
  };
}

async function getCreateAccount(req) {
  const { title, body, created_by } = req.body;
  console.log(req.body);
  const images = req.files.map((image) => {
    return `http://localhost:3001/uploads/${image.filename}`;
  });
  const data = await db.query(
    "INSERT INTO  account(title, cover_img, body, created_by, created_at , updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [title, images, body, created_by]
  );
  return {
    success: true,
    data,
  };
}

async function getUpdateAccount(req) {
  const { id, title, body, created_by } = req.body;
  console.log(id, title, body, created_by);
  const images = req.files.map((image) => {
    return `http://localhost:3001/uploads/${image.filename}`;
  });
  const data = await db.query(
    `UPDATE account
     SET title=?, cover_img=?, body=?, created_by=?, updated_at=now()
     WHERE id=?`,
    [title, images, body, created_by, id]
  );
  return {
    success: true,
    data,
  };
}

async function getDeleteAccount(req) {
  const { id } = req.query;
  const data = await db.query("DELETE FROM account where id = ?", [id]);
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
