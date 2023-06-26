const oracle_db = require("../../db/db_oracle");

async function getAllPayment(req) {
  const { page, limit, id, invoice, begin, end } = req.query;
  if (page && limit) {
    const startId = (page - 1) * limit;
    const count = await oracle_db.query(
      "select count(*) as count from MTC_SC_PAYMENT_TRANS "
    );
    const totalPage = count[0].COUNT / limit;
    const data = await oracle_db.query(
      "select * from MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID  order by ID DESC OFFSET '" +
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
  if (invoice) {
    if (begin && end && invoice) {
      const data = await oracle_db.query(
        `select * from MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID 
        WHERE MTC_SC_PAYMENT_TRANS.CREATED_DATE BETWEEN TO_DATE ('${begin}', 'YYYY-MM-DD"T"HH24:MI:SS') AND TO_DATE('${end}', 'YYYY-MM-DD"T"HH24:MI:SS') AND INVOICE_DESC = '${invoice}'`
      );
      return {
        data,
      };
    }
    if (invoice) {
      const data = await oracle_db.query(
        `select * from MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID 
        WHERE MTC_SC_PAYMENT_TRANS.INVOICE_DESC LIKE '%${invoice}%'`
      );
      return {
        data,
      };
    }
  } else {
    const data = await oracle_db.query(
      `select * from MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID 
      WHERE MTC_SC_PAYMENT_TRANS.CREATED_DATE BETWEEN TO_DATE ('${begin}', 'YYYY-MM-DD"T"HH24:MI:SS') AND TO_DATE('${end}', 'YYYY-MM-DD"T"HH24:MI:SS')`
    );
    return {
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
