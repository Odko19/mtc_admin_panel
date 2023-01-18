const workplaceServices = require("./workplace.service");

const getAllWorkplace = async (req, res) => {
  try {
    const workplace = await workplaceServices.getAllWorkplace(req);
    res.json(workplace);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getCreateWorkplace = async (req, res) => {
  try {
    const Workplace = await workplaceServices.getCreateWorkplace(req);
    res.json(Workplace);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getUpdateWorkplace = async (req, res) => {
  try {
    const workplace = await workplaceServices.getUpdateWorkplace(req);
    res.json(workplace);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getDeleteWorkplace = async (req, res) => {
  try {
    const workplace = await workplaceServices.getDeleteWorkplace(req);
    res.json(workplace);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getWorkplaceCv = async (req, res) => {
  try {
    const Workplace = await workplaceServices.getWorkplaceCv(req);
    res.json(Workplace);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllWorkplace,
  getCreateWorkplace,
  getUpdateWorkplace,
  getDeleteWorkplace,
  getWorkplaceCv,
};
