const express = require("express");
const axios = require("axios");
const moment = require("moment");
const router = express.Router();
const apiKey = process.env.API_KEY;
router.get("/weather/:lat,:lon", getWeather);

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
module.exports = router;
