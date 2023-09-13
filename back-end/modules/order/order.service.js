const moment = require("moment");
const oracle_db = require("../../db/db_oracle");

async function getAllOrder(req) {
  const { page, limit, all, location, begin, end, mobile, register, city } =
    req.query;
  let totalDatas;
  let query = "SELECT * FROM MTC_SC_ORDER_FORM WHERE 1 = 1";
  const params = [];

  if (location) {
    query += " AND CITY LIKE :location";
    params.push("%" + location.toUpperCase() + "%");
  }
  if (mobile) {
    query += " AND MOBILE LIKE :mobilePattern";
    const mobilePattern = `%${mobile}%`;
    params.push(mobilePattern);
  }
  if (register) {
    query += " AND REGISTER LIKE :registerPattern";
    const registerPattern = `%${register}%`;
    params.push(registerPattern);
  }

  if (city) {
    query += " AND CITY LIKE :cityPattern";
    const cityPattern = `%${city}%`;
    params.push(cityPattern);
  }

  if (begin && end) {
    query +=
      " AND CREATED_AT BETWEEN TO_DATE(:begin, 'YYYY-MM-DD\"T\"HH24:MI:SS') AND TO_DATE(:end, 'YYYY-MM-DD\"T\"HH24:MI:SS')";
    params.push(begin, end);
  }

  if (all) {
    query = "SELECT * FROM MTC_SC_ORDER_FORM";
  }

  if (page && limit) {
    const data = await oracle_db.query(query, params);
    totalDatas = data.length;
    const startId = (page - 1) * limit;
    query += ` ORDER BY ID DESC OFFSET :startId ROWS FETCH NEXT :limit ROWS ONLY`;
    params.push(startId, parseInt(limit));
  }

  const data = await oracle_db.query(query, params);
  const totalPages = Math.ceil(totalDatas / limit);
  return {
    totalPages,
    totalDatas,
    currentPage: parseInt(page),
    currentPageSize: parseInt(limit),
    data,
  };
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
