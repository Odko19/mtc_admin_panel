const accountServices = require("./account.service");

const getAllAccount = async (req, res) => {
  try {
    const account = await accountServices.getAllAccount(req);
    res.json(account);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getCreateAccount = async (req, res) => {
  try {
    const account = await accountServices.getCreateAccount(req);
    res.json(account);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getUpdateAccount = async (req, res) => {
  try {
    const account = await accountServices.getUpdateAccount(req);
    res.json(account);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getDeleteAccount = async (req, res) => {
  try {
    const account = await accountServices.getDeleteAccount(req);
    res.json(account);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllAccount,
  getCreateAccount,
  getUpdateAccount,
  getDeleteAccount,
};
