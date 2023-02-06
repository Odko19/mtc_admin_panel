const oracle_db = require("../../db/oracle_db/oracle");

async function getAllPayment(req) {
  const { page, limit, id } = req.query;
  if ((page, limit)) {
    const startId = (page - 1) * limit;
    const count = await oracle_db.query(
      "select count(*) as count from MTC_SC_PAYMENT_TRANS "
    );
    const totalPage = count[0].COUNT / limit;
    // const data2 = await oracle_db.query(
    //   "select MTC_SC_PAYMENT_TRANS.STATUS , MTC_SC_PAYMENT_TRANS.INVOICE_DESC, MTC_SC_PAYMENT_TRANS.AMOUNT, MTC_SC_PAYMENT_TRANS.STATUS, MTC_SC_PAYMENT_TRANS.CREATED_DATE, MTC_SC_PAYMENT_TRANS.UPDATE_DATE, MTC_SC_PAYMENT_TRANS.EMAIL,  MTC_SC_PAYMENT_TRANS.USER_ID, MTC_SC_PAYMENT_TRANS.CARD_TYPE, MTC_SC_PAYMENT_TRANS_DETAIL.PAYMENT_STATUS, MTC_SC_PAYMENT_TRANS_DETAIL.PAYMENT_AMOUNT, MTC_SC_PAYMENT_TRANS_DETAIL.PAYMENT_CURRENCY,MTC_SC_PAYMENT_TRANS_DETAIL.PAYMENT_WALLET,MTC_SC_PAYMENT_TRANS_DETAIL.ACCOUNT_BANK_NAME, MTC_SC_PAYMENT_TRANS_DETAIL.AMOUNT  from MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID  order by TRANS_ID OFFSET '" +
    //     startId +
    //     "' ROWS FETCH NEXT '" +
    //     limit +
    //     "' ROWS ONLY "
    // );
    const data = await oracle_db.query(
      "select * from MTC_SC_PAYMENT_TRANS INNER JOIN MTC_SC_PAYMENT_TRANS_DETAIL ON MTC_SC_PAYMENT_TRANS.INVOICE_ID = MTC_SC_PAYMENT_TRANS_DETAIL.INVOICE_ID  order by TRANS_ID OFFSET '" +
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
