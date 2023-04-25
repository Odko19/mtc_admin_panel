const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/v1/index");
const PORT = process.env.PORT || 8083;

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/v1", routes);
app.use("/v1/uploads", express.static("v1/uploads"));

app.listen(PORT, () => {
  console.log("Running server" + " " + PORT);
});
