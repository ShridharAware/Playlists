require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const appRoutes = require("./routes");

const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", appRoutes);

app.listen(port, () => {
  console.log("Server is listening on ", port);
});
