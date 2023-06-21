const db_mtc = require("../../db/db_mtc_admin_panel");

async function getAllAccount(req) {
  const { id } = req.query;
  if (req.query) {
    if (id) {
      const data = await db_mtc.query("SELECT * FROM account WHERE id=?; ", [
        id,
      ]);
      return {
        ...data[0],
      };
    } else {
      const data = await db_mtc.query(
        "select * from account ORDER BY created_at desc "
      );
      return {
        success: true,
        data,
      };
    }
  }
}

async function getCreateAccount(req) {
  let data;

  const { title, body, created_by } = req.body;
  req.files[0]
    ? (data = await db_mtc.query(
        "INSERT INTO  account(title, cover_img, body, created_by, created_at , updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
        [title, req.files[0].filename, body, created_by]
      ))
    : (data = await db_mtc.query(
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
  let data;
  console.log(req.files[0]);
  req.files[0]
    ? (data = await db_mtc.query(
        `UPDATE account
     SET title=?, cover_img=?, body=?, created_by=?, updated_at=now()
     WHERE id=?`,
        [title, req.files[0].filename, body, created_by, id]
      ))
    : (data = await db_mtc.query(
        `UPDATE account
     SET title=?, cover_img=?, body=?, created_by=?, updated_at=now()
     WHERE id=?`,
        [title, null, body, created_by, id]
      ));

  return {
    success: true,
    data,
  };
}

async function getDeleteAccount(req) {
  let data;
  const { id } = req.query;
  if (id !== undefined) {
    data = await db_mtc.query("DELETE FROM account where id = ?", [id]);
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
  getCreateAccount,
  getUpdateAccount,
  getDeleteAccount,
};
