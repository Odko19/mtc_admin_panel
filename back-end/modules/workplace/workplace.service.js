const db = require("../../db/db");

async function getAllWorkplace(req) {
  const { id, page, limit, workplace_id } = req.query;
  if (req.query) {
    if (id) {
      const data = await db.query(
        "SELECT workplace_id,entity.entity_name as workplace_name,workplace_role,workplace_requirements, entity_name as workplace_type, firstName as created_by,expires_at, created_at , updated_at FROM workplace JOIN entity ON workplace_type = entity.entity_id JOIN users ON created_by = users.id where workplace_id = ?",
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
        `select workplace_id, workplace_name, workplace_role, workplace_requirements, cv,  entity_name as 
        workplace_type, firstName as created_by, expires_at,created_at,  updated_at FROM workplace JOIN entity 
        ON workplace_type = entity.entity_id JOIN users ON created_by = users.id 
         ORDER BY workplace_id desc limit ?, ?`,
        [JSON.stringify(startId), limit]
      );
      const cv = await db.query(`select * from workplace, workplace_cv;`);
      await cv.map((e) => {
        data.map((e1) => {
          if (e1.workplace_id === e.cv_workplace_id) {
            e1.cv = e.cv_name.length;
          }
        });
      });
      return {
        totalPages: Math.ceil(totalPage),
        totalDatas: data_count[0].count,
        currentPage: JSON.parse(page),
        currentPageSize: JSON.parse(limit),
        data,
      };
    }
    if (workplace_id) {
      console.log(workplace_id);
      const data = await db.query(
        "SELECT workplace_cv.cv_id as cv_id, cv_name, workplace_name from workplace_cv JOIN workplace ON workplace_cv.cv_workplace_id = workplace.workplace_id where cv_workplace_id = ?",
        [workplace_id]
      );
      return {
        ...data[0],
      };
    }
    const data = await db.query(
      `SELECT workplace_id, workplace_name,workplace_role,workplace_requirements, entity_name as workplace_type, firstName as created_by, expires_at,created_at , updated_at FROM workplace JOIN entity ON workplace_type = entity.entity_id JOIN users ON created_by = users.id `
    );
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
  let data;
  data = await db.query("DELETE FROM workplace_cv where cv_workplace_id = ?", [
    id,
  ]);
  data = await db.query("DELETE FROM workplace where workplace_id = ?", [id]);
  return {
    success: true,
    data,
  };
}

async function getWorkplaceCv(req) {
  const { id, firstname } = req.body;
  let data;
  const data_ = await db.query(
    `SELECT * FROM workplace_cv WHERE cv_workplace_id=?`,
    [id]
  );
  if (data_.length === 0) {
    let arr = [];
    arr.push({ firstName: firstname, cv: req.files[0].filename });
    data = await db.query(
      `INSERT INTO workplace_cv(cv_name, cv_workplace_id) VALUES(?,?)`,
      [arr, id]
    );
  } else {
    let temp = data_[0].cv_name;
    temp.push({ firstName: firstname, cv: req.files[0].filename });
    data = await db.query(
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
