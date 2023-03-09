const db = require("../../db/db");

async function getAllCoverImg(req) {
  const { type, id } = req.query;
  if (type) {
    const data = await db.query(`select * from coverImg where type=?`, [type]);
    return {
      data,
    };
  }
  if (id) {
    const data = await db.query(`select * from coverImg where id=?`, [id]);
    return {
      data,
    };
  }
}
async function getCreateCoverImg(req) {
  const { type, created_by } = req.body;
  const data = await db.query(
    "INSERT INTO  coverImg(image, type, created_by, created_at, updated_at ) VALUES (?, ?, ?, NOW(), NOW())",
    [req.files[0].filename, type, created_by]
  );
  return {
    success: true,
    data,
  };
}
async function getUpdateCoverImg(req) {
  const { type, created_by, id } = req.body;
  console.log(req.body);
  console.log(req.files[0].filename);
  const data = await db.query(
    `UPDATE coverImg SET image=?,  type=?, created_by=?, updated_at=now() WHERE id=?`,
    [req.files[0].filename, type, created_by, id]
  );
  return {
    success: true,
    data,
  };
}
async function getDeleteCoverImg(req) {
  const { id } = req.query;
  const data = await db.query("DELETE FROM coverImg where id = ?", [id]);
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllCoverImg,
  getCreateCoverImg,
  getUpdateCoverImg,
  getDeleteCoverImg,
};
