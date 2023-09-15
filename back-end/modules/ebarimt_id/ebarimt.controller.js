const ebarimtServices = require("./ebarimt.service");

const getAllEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getAllEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getAllEbarimtReg = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getAllEbarimtReg(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllEbarimt,
  getAllEbarimtReg,
};
