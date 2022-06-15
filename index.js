require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const server = express();
const router = require("./routes/weather.routes");
const port = process.env.PORT || 5000;
server.use(express.json());
server.use(cors());
server.use(express.static(path.resolve(__dirname, "./weatherapp/build")));
server.use("/api", router);
server.listen(port, () => {
  console.log(`Server is up and listening on Port ${port}`);
});
