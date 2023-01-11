const db = require("../../db/db");

async function getAllWorkplace(req) {
  // const { id, page, limit, type } = req.query;
  // if (id) {
  //   const data = await db.query("SELECT * FROM product where product_id = ?", [
  //     id,
  //   ]);
  //   return {
  //     ...data[0],
  //   };
  // }
  // if (page && limit) {
  //   const startId = (page - 1) * limit;
  //   const data_count = await db.query("select count(*) as count from product");
  //   const totalPage = data_count && data_count[0].count / limit;
  //   const data = await db.query(
  //     `select * from product ORDER BY created_at desc limit ?, ?`,
  //     [JSON.stringify(startId), limit]
  //   );
  //   return {
  //     totalPages: Math.ceil(totalPage),
  //     totalDatas: data_count[0].count,
  //     currentPage: JSON.parse(page),
  //     currentPageSize: JSON.parse(limit),
  //     data,
  //   };
  // }
  // if (page && type) {
  //   const { page, type } = req.query;
  //   const startId = (page - 1) * 6;
  //   const data_count = await db.query(
  //     "select count(*) as count  from product where product_type=?",
  //     [type]
  //   );
  //   const totalPage = data_count && data_count[0].count / 6;
  //   const data = await db.query(
  //     `select * from product where product_type=? ORDER BY created_at desc limit ?, 6 `,
  //     [type, JSON.stringify(startId)]
  //   );
  //   return {
  //     totalPages: Math.ceil(totalPage),
  //     totalDatas: data_count[0].count,
  //     currentPage: JSON.parse(page),
  //     currentPageSize: 6,
  //     data,
  //   };
  // }
}

async function getCreateWorkplace(req) {
  const {
    workplace_name,
    workplace_role,
    workplace_requirements,
    workplace_other,
    workplace_type,
    created_by,
  } = req.body;
  const data = await db.query(
    "INSERT INTO  workplace(workplace_name, workplace_role, workplace_requirements, workplace_other, workplace_type, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, now(),now())",
    [
      workplace_name,
      workplace_role,
      workplace_requirements,
      workplace_other,
      workplace_type,
      created_by,
    ]
  );
  console.log(data);
  return {
    data,
  };
}

async function getUpdateWorkplace(req) {
  // const {
  //   product_name,
  //   product_price,
  //   product_performance,
  //   created_by,
  //   product_id,
  //   product_type,
  // } = req.body;
  // const data = await db.query(
  //   `UPDATE product
  //    SET product_name=?, product_img=?, product_price=?, product_performance=?, product_type=?, created_by=?, updated_at=now()
  //    WHERE product_id=?`,
  //   [
  //     product_name,
  //     req.files[0].filename,
  //     product_price,
  //     product_performance,
  //     product_type,
  //     created_by,
  //     product_id,
  //   ]
  // );
  // return {
  //   success: true,
  //   data,
  // };
}

async function getDeleteWorkplace(req) {
  // const { id } = req.query;
  // let data;
  // if (id) {
  //   data = await db.query("DELETE FROM product where product_id = ?", [id]);
  // }
  // return {
  //   success: true,
  //   data,
  // };
}

module.exports = {
  getAllWorkplace,
  getCreateWorkplace,
  getUpdateWorkplace,
  getDeleteWorkplace,
};
