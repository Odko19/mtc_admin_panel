const oracle_db = require("../../db/oracle_db/oracle");

async function getAllOrder(req) {
  const { page, limit, all } = req.query;
  if (page && limit) {
    const startId = (page - 1) * limit;
    const data_count = await oracle_db.query(
      "select count(*) as count from MTC_SELF_ORDER_FORM "
    );
    const totalPage = data_count[0].COUNT / limit;
    const data = await oracle_db.query(
      "select * from MTC_SELF_ORDER_FORM  order by ID OFFSET '" +
        startId +
        "' ROWS FETCH NEXT '" +
        limit +
        "' ROWS ONLY "
    );
    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: data_count[0].count,
      currentPage: JSON.parse(page),
      currentPageSize: JSON.parse(limit),
      data,
    };
  }
  if (all) {
    const data = await oracle_db.query("select * from MTC_SELF_ORDER_FORM ");
    return {
      data,
    };
  }
}

async function getUpdateOrder(req) {
  const { ID, OPERATOR_ID, OPERATOR_STATUS } = req.body;
  console.log(ID);
  console.log(OPERATOR_ID);
  console.log(OPERATOR_STATUS);
  const id = 4;
  const name = "update";
  let data = await oracle_db.query(
    "UPDATE MTC_SELF_ORDER_FORM SET FIRST_NAME ='" +
      name +
      "' WHERE ID ='" +
      id +
      "'"
  );
  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllOrder,
  getUpdateOrder,
};
