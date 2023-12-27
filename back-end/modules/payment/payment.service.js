const oracle_db = require("../../db/db_oracle");

async function getAllPayment(req) {
  const { page, limit, id, invoice, begin, end } = req.query;
  let totalDatas;
  let query =
    "SELECT * FROM MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID WHERE 1 = 1";
  const params = {};
  if (invoice) {
    query += " AND MTC_SC_PAYMENT_TRANS.INVOICE_DESC LIKE :invoicePattern";
    params.invoicePattern = `%${invoice}%`;
  }
  if (begin && end) {
    query +=
      " AND MTC_SC_PAYMENT_TRANS.CREATED_DATE BETWEEN TO_DATE(:begin, 'YYYY-MM-DD\"T\"HH24:MI:SS') AND TO_DATE(:end, 'YYYY-MM-DD\"T\"HH24:MI:SS')";
    params.begin = begin;
    params.end = end;
  }
  if (page && limit) {
    const data = await oracle_db.queryOrder(query, params);
    totalDatas = data.length;
    const startId = (page - 1) * limit;
    query += " ORDER BY MTC_SC_PAYMENT_TRANS.CREATED_DATE DESC ";
  }
  const data = await oracle_db.queryOrder(query, params);
  const totalPages = Math.ceil(totalDatas / limit);

  return {
    totalPages,
    totalDatas,
    currentPage: parseInt(page),
    currentPageSize: parseInt(limit),
    data,
  };
}

module.exports = {
  getAllPayment,
};
