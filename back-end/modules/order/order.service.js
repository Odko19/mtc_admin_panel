const moment = require("moment");
const oracle_db = require("../../db/db_oracle");

async function getAllOrder(req) {
  const { page, limit, all, location, begin, end, mobile } = req.query;
  if (req.query) {
    if (page && limit && location) {
      const startId = (page - 1) * limit;
      const data_count = await oracle_db.query(
        "select count(*) as count from MTC_SC_ORDER_FORM  WHERE CITY LIKE '%" +
          location.toUpperCase() +
          "%'"
      );
      const totalPage = data_count[0].COUNT / limit;
      const data = await oracle_db.query(
        "select * from MTC_SC_ORDER_FORM WHERE CITY LIKE '%" +
          location.toUpperCase() +
          "%'  order by ID DESC OFFSET '" +
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
      const data = await oracle_db.query("select * from MTC_SC_ORDER_FORM");
      return {
        data,
      };
    }
    if (mobile) {
      if (begin && end && mobile) {
        const data = await oracle_db.query(
          `select * from MTC_SC_ORDER_FORM WHERE CREATED_AT BETWEEN TO_DATE ('${begin}', 'YYYY-MM-DD"T"HH24:MI:SS') AND TO_DATE('${end}', 'YYYY-MM-DD"T"HH24:MI:SS') AND MOBILE = '${mobile}'`
        );
        return {
          data,
        };
      }
      if (mobile) {
        const data = await oracle_db.query(
          "select * from MTC_SC_ORDER_FORM WHERE MOBILE ='" + mobile + "'"
        );
        return {
          data,
        };
      }
    } else {
      const data = await oracle_db.query(
        `select * from MTC_SC_ORDER_FORM WHERE CREATED_AT BETWEEN TO_DATE ('${begin}', 'YYYY-MM-DD"T"HH24:MI:SS') AND TO_DATE('${end}', 'YYYY-MM-DD"T"HH24:MI:SS') ORDER BY ID DESC  OFFSET 1 ROWS FETCH NEXT 5 ROWS ONLY`
      );
      return {
        data,
      };
    }
  }
}

async function getUpdateOrder(req) {
  const { ID, OPERATOR_ID, OPERATOR_STATUS } = req.body;
  let data = await oracle_db.query(
    "UPDATE MTC_SC_ORDER_FORM   SET OPERATOR_ID = '" +
      OPERATOR_ID +
      "', OPERATOR_STATUS='" +
      OPERATOR_STATUS +
      "' WHERE ID ='" +
      ID +
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
