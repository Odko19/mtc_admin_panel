const oracle_db = require("../../db/oracle_db/oracle");

async function getAllPayment(req) {
  const { page, limit, id } = req.query;
  if ((page, limit)) {
    const startId = (page - 1) * limit;
    const count = await oracle_db.query(
      "select count(*) as count from MTC_SC_PAYMENT_TRANS "
    );
    const totalPage = count[0].COUNT / limit;
    const data = await oracle_db.query(
      "select * from MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID  order by  TRANS_ID OFFSET '" +
        startId +
        "' ROWS FETCH NEXT '" +
        limit +
        "' ROWS ONLY "
    );
    return {
      totalPages: Math.ceil(totalPage),
      totalDatas: count[0].count,
      currentPage: JSON.parse(page),
      currentPageSize: JSON.parse(limit),
      data,
    };
  }
  if (id) {
    const data = await oracle_db.query(
      "select * from MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID  WHERE TRANS_ID='" +
        id +
        "'"
    );
    return {
      ...data[0],
    };
  }
}

module.exports = {
  getAllPayment,
};
