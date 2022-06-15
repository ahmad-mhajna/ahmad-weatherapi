require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const moment = require("moment");
const path = require("path");
const server = express();
const apiKey = process.env.API_KEY;

const port = process.env.PORT || 5000;
server.use(express.json());
server.use(cors());
server.get("api/weather/:lat,:lon", getWeather);
server.use(express.static(path.resolve([__dirname, "./weatherapp/build"])));
server.listen(port, () => {
  console.log(`Server is up and listening on Port ${port}`);
});

async function getWeather(req, res) {
  try {
    const { data } = await axios.get(
      `https://api.tomorrow.io/v4/timelines?location=${req.params.lat},${
        req.params.lon
      }&startTime=${moment()
        .hour(15)
        .minute(0)
        .toISOString()}&endTime=${moment()
        .hour(27)
        .minute(0)
        .toISOString()}&fields=temperature&timesteps=1h&units=metric&apikey=${apiKey}`
    );
    res.send(data);
  } catch (e) {
    console.error(e);
  }
}
