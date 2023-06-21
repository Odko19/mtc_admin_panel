const db_sc = require("../../db/db_sc");

async function getAllFeedback(req) {
  const { limit, page } = req.query;
  const startId = (page - 1) * limit;
  const data_count = await db_sc.query(
    "select count(*) as count from feedback"
  );
  const data_one = await db_sc.query(
    `select count(*) as count from feedback where star=?`,
    [1]
  );
  const data_two = await db_sc.query(
    `select count(*) as count from feedback where star=?`,
    [2]
  );
  const data_three = await db_sc.query(
    `select count(*) as count from feedback where star=?`,
    [3]
  );
  const data_four = await db_sc.query(
    `select count(*) as count from feedback where star=?`,
    [4]
  );
  const data_five = await db_sc.query(
    `select count(*) as count from feedback where star=?`,
    [5]
  );
  const totalPage = data_count && data_count[0].count / limit;
  const data = await db_sc.query(
    ` select * from feedback ORDER BY id asc limit ?, ?`,
    [JSON.stringify(startId), limit]
  );
  return {
    totalPages: Math.ceil(totalPage),
    totalDatas: data_count[0].count,
    currentPage: JSON.parse(page),
    currentPageSize: JSON.parse(limit),
    count: {
      one: data_one[0].count,
      two: data_two[0].count,
      three: data_three[0].count,
      four: data_four[0].count,
      five: data_five[0].count,
    },
    data,
  };
}

module.exports = {
  getAllFeedback,
};
