const orderServices = require("./order.service");

const getAllOrder = async (req, res) => {
  try {
    const data = await orderServices.getAllOrder(req);
    res.json(data);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
const getUpdateOrder = async (req, res) => {
  try {
    const data = await orderServices.getUpdateOrder(req);
    res.json(data);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllOrder,
  getUpdateOrder,
};
