const usersServices = require("./users.service");

const getAllUsers = async (req, res) => {
  try {
    const user = await usersServices.getAllUsers(req);
    res.json(user);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getCreateUser = async (req, res) => {
  try {
    const user = await usersServices.getCreateUser(req);
    res.json(user);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getUpdateUser = async (req, res) => {
  try {
    const user = await usersServices.getUpdateUser(req);
    res.json(user);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getDeleteUser = async (req, res) => {
  try {
    const user = await usersServices.getDeleteUser(req);
    res.json(user);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllUsers,
  getCreateUser,
  getUpdateUser,
  getDeleteUser,
};
