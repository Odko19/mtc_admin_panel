const resnumServices = require("./resnum.service");

const getAllResNum = async (req, res) => {
  try {
    const data = await resnumServices.getAllResNum(req);
    res.json(data);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllResNum,
};
