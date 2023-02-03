const paymentServices = require("./payment.service");

const getAllPayment = async (req, res) => {
  try {
    const data = await paymentServices.getAllPayment(req);
    res.json(data);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllPayment,
};
