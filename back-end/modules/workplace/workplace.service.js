const db = require("../../db/db");

async function getAllWorkplace(req) {
  const { id, page, limit, type, cv_id } = req.query;
  if (req.query) {
    if (id) {
      const data = await db.query(
        "SELECT workplace_id,workplace_name,workplace_role,workplace_requirements, entity_name as workplace_type, firstName as created_by,expires_at, created_at , updated_at FROM workplace JOIN entity ON workplace_type = entity.entity_id JOIN users ON created_by = users.id where workplace_id = ?",
        [id]
      );
      return {
        ...data[0],
      };
    }
    if (page && limit) {
      const startId = (page - 1) * limit;
      const data_count = await db.query(
        "select count(*) as count from workplace"
      );
      const totalPage = data_count && data_count[0].count / limit;
      const data = await db.query(
        `select workplace_id,workplace_name,workplace_role,workplace_requirements, entity_name as workplace_type, firstName as created_by, expires_at,created_at , updated_at FROM workplace JOIN entity ON workplace_type = entity.entity_id JOIN users ON created_by = users.id ORDER BY workplace_id desc limit ?, ?`,
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
    if (page && type) {
      const { page, type } = req.query;
      const startId = (page - 1) * 6;
      const data_count = await db.query(
        "select count(*) as count  from workplace where workplace_type=?",
        [type]
      );
      const totalPage = data_count && data_count[0].count / 6;
      const data = await db.query(
        `SELECT workplace_id,workplace_name,workplace_role,workplace_requirements, entity_name as workplace_type, firstName as created_by, expires_at,created_at , updated_at FROM workplace JOIN entity ON workplace_type = entity.entity_id JOIN users ON created_by = users.id where workplace_type=? ORDER BY created_at desc limit ?, 6 `,
        [type, JSON.stringify(startId)]
      );
      return {
        totalPages: Math.ceil(totalPage),
        totalDatas: data_count[0].count,
        currentPage: JSON.parse(page),
        currentPageSize: 6,
        data,
      };
    }
    if (cv_id) {
      const data = await db.query(
        "SELECT workplace_cv.cv_id as cv_id, cv_name, workplace_name from workplace_cv JOIN workplace ON workplace_cv.cv_workplace_id = workplace.workplace_id where cv_workplace_id = ?",
        [cv_id]
      );
      return {
        data,
      };
    }
  } else {
    console.log("alda");
  }
}

async function getCreateWorkplace(req) {
  const {
    workplace_name,
    workplace_role,
    workplace_requirements,
    workplace_type,
    expires_at,
    created_by,
  } = req.body;
  const data = await db.query(
    "INSERT INTO  workplace(workplace_name, workplace_role, workplace_requirements, workplace_type, created_by,expires_at, created_at, updated_at) VALUES (?, ?, ?, ?,?, ?, now(),now())",
    [
      workplace_name,
      workplace_role,
      workplace_requirements,
      workplace_type,
      created_by,
      expires_at,
    ]
  );
  return {
    success: true,
    data,
  };
}

async function getUpdateWorkplace(req) {
  const {
    workplace_id,
    workplace_name,
    workplace_role,
    workplace_requirements,
    workplace_type,
    created_by,
    expires_at,
  } = req.body;
  const data = await db.query(
    `UPDATE workplace
     SET workplace_name=?, workplace_role=?, workplace_requirements=?, workplace_type=?, created_by=?,expires_at=?, updated_at = now()
     WHERE workplace_id=?`,
    [
      workplace_name,
      workplace_role,
      workplace_requirements,
      workplace_type,
      created_by,
      expires_at,
      workplace_id,
    ]
  );

  return {
    success: true,
    data,
  };
}

async function getDeleteWorkplace(req) {
  const { id } = req.query;
  const data = await db.query("DELETE FROM workplace where workplace_id = ?", [
    id,
  ]);

  return {
    success: true,
    data,
  };
}

async function getWorkplaceCv(req) {
  const { id } = req.body;
  const data = await db.query(
    "INSERT INTO  workplace_cv(cv_name,cv_workplace_id) VALUES (?, ?)",
    [req.files[0].filename, id]
  );
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllWorkplace,
  getCreateWorkplace,
  getUpdateWorkplace,
  getDeleteWorkplace,
  getWorkplaceCv,
};
