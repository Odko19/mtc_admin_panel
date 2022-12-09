const shareServices = require("./share.service");

const getAllShare = async (req, res) => {
  try {
    const share = await shareServices.getAllShare(req);
    res.json(share);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getShareById = async (req, res) => {
  try {
    const share = await shareServices.getShareById(req);
    res.json(share);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getCreateShare = async (req, res) => {
  try {
    const share = await shareServices.getCreateShare(req);
    res.json(share);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getUpdateShare = async (req, res) => {
  try {
    const share = await shareServices.getUpdateShare(req);
    res.json(share);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getDeleteShare = async (req, res) => {
  try {
    const share = await shareServices.getDeleteShare(req);
    res.json(share);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllShare,
  getShareById,
  getCreateShare,
  getUpdateShare,
  getDeleteShare,
};
