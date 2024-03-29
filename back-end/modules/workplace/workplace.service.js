const db_mtc = require("../../db/db_mtc_admin_panel");

async function getAllWorkplace(req) {
  const { id, page, limit } = req.query;
  if (req.query) {
    if (id) {
      const data = await db_mtc.query(
        "SELECT * from workplace where workplace_id = ?",
        [id]
      );
      return {
        ...data[0],
      };
    }
    if (page && limit) {
      const startId = (page - 1) * limit;
      const data_count = await db_mtc.query(
        "select count(*) as count from workplace"
      );
      const totalPage = data_count && data_count[0].count / limit;
      const data = await db_mtc.query(
        `select * from workplace
         ORDER BY workplace_id desc `,
        [JSON.stringify(startId), limit]
      );
      const cv = await db_mtc.query(`select * from workplace_cv;`);
      return {
        totalPages: Math.ceil(totalPage),
        totalDatas: data_count[0].count,
        currentPage: JSON.parse(page),
        currentPageSize: JSON.parse(limit),
        data,
        cv,
      };
    }
    const data = await db_mtc.query(`SELECT * from workplace`);
    return {
      data,
    };
  } else {
    console.log("error");
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
  const data = await db_mtc.query(
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
  const data = await db_mtc.query(
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
  let data;
  data = await db_mtc.query(
    "DELETE FROM workplace_cv where cv_workplace_id = ?",
    [id]
  );
  data = await db_mtc.query("DELETE FROM workplace where workplace_id = ?", [
    id,
  ]);
  return {
    success: true,
    data,
  };
}

async function getWorkplaceCv(req) {
  const { id, firstname } = req.body;
  console.log(req.body);
  let data;
  const data_ = await db_mtc.query(
    `SELECT * FROM workplace_cv WHERE cv_workplace_id=?`,
    [id]
  );

  if (data_.length === 0) {
    let arr = [];
    arr.push({ firstName: firstname, cv: req.files[0].filename });
    data = await db_mtc.query(
      `INSERT INTO workplace_cv(cv_name, cv_workplace_id) VALUES(?,?)`,
      [arr, id]
    );
  } else {
    let temp = data_[0].cv_name;
    temp.push({ firstName: firstname, cv: req.files[0].filename });
    data = await db_mtc.query(
      `UPDATE workplace_cv
       SET cv_name=?
       WHERE cv_workplace_id=?`,
      [temp, id]
    );
  }

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
