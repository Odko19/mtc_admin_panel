const ebarimtServices = require("./ebarimt.service");

const getTokenEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getTokenEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getRegUserEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getRegUserEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getCusUserEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getCusUserEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getSubsEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getSubsEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
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
const getUpdateEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getUpdateEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getUpdateEditEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getUpdateEditEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getAddEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getAddEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getIdEbarimt = async (req, res) => {
  try {
    const ebarimt = await ebarimtServices.getIdEbarimt(req, res);
    res.json(ebarimt);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getTokenEbarimt,
  getRegUserEbarimt,
  getCusUserEbarimt,
  getSubsEbarimt,
  getAllEbarimt,
  getUpdateEbarimt,
  getUpdateEditEbarimt,
  getAddEbarimt,
  getIdEbarimt,
};
