const db = require("../../db/db");
const bcrypt = require("bcryptjs");

async function getAllUsers(req) {
  const data = await db.query("select * from users");
  return {
    success: true,
    data,
  };
}

async function getCreateUser(req) {
  const { name, password, user_access } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const data = await db.query(
    "INSERT INTO  users(name, password, user_access) VALUES (?, ?, ?)",
    [name, hashedPass, user_access]
  );
  console.log(data);
  return {
    success: true,
    data,
  };
}

async function getUpdateUser(req) {
  const { id, name, password, user_access } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const data = await db.query(
    `UPDATE users
     SET name=?, password=?, user_access=? WHERE id=?`,
    [name, hashedPass, user_access, id]
  );
  return {
    success: true,
    data,
  };
}

async function getDeleteUser(req) {
  const { id } = req.query;
  const data = await db.query("DELETE FROM users where id = ?", [id]);
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllUsers,
  getCreateUser,
  getUpdateUser,
  getDeleteUser,
};
