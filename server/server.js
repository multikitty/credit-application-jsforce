const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config.json");
const router = require("./router");

app.use(bodyParser.json());
app.use(cors("*"));

app.use(router);

app.listen(config.PORT, function () {
  console.log("Server listening at port:", config.PORT);
});
