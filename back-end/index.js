const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const config = require("./db/config");
const db_connection = mysql.createConnection(config.db);
const routes = require("./routes/v1/index");
const PORT = process.env.PORT || 3001;

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/v1", routes);
app.use("/v1/uploads", express.static("v1/uploads"));

db_connection.connect((error) => {
  if (error) {
    console.log("mysql not connection");
  } else {
    console.log("mysql  connection");
    app.listen(PORT, () => {
      console.log("Running server" + " " + PORT);
    });
  }
});
