const feedbackServices = require("./feedback.service");

const getAllFeedback = async (req, res) => {
  try {
    const feedback = await feedbackServices.getAllFeedback(req);
    res.json(feedback);
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

module.exports = {
  getAllFeedback,
};
