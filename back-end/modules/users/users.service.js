const db = require("../../db/db");
const bcrypt = require("bcryptjs");

async function getAllUsers(req) {
  const data = await db.query("select * from users");
  return {
    success: true,
    data,
  };
}

async function getUserById(req) {
  let data;
  const { id } = req.query;
  if (id !== undefined) {
    data = await db.query("SELECT * FROM users WHERE id=?", [id]);
  } else {
    data;
  }
  return {
    success: true,
    data,
  };
}

async function getCreateUser(req) {
  const { firstName, password, permission } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const data = await db.query(
    "INSERT INTO  users(firstName, password, permission) VALUES (?, ?, ?)",
    [firstName, hashedPass, permission]
  );
  return {
    success: true,
    data,
  };
}

async function getUpdateUser(req) {
  const { id, firstName, password, permission } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const data = await db.query(
    `UPDATE users
     SET firstName=?, password=?, permission=? WHERE id=?`,
    [firstName, hashedPass, permission, id]
  );
  return {
    success: true,
    data,
  };
}

async function getDeleteUser(req) {
  let data;
  const { id } = req.query;
  if (id !== undefined) {
    data = await db.query("DELETE FROM users where id = ?", [id]);
  } else {
    data;
  }
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllUsers,
  getUserById,
  getCreateUser,
  getUpdateUser,
  getDeleteUser,
};
