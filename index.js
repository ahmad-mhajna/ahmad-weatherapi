require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const moment = require("moment");
const server = express();
const apiKey = process.env.API_KEY;

const port = process.env.PORT || 5000;
server.use(express.json());
server.use(cors());
server.get("/weather/:lat,:lon", getWeather);

server.listen(port, () => {
  console.log(`Server is up and listening on Port ${port}`);
});

async function getWeather(req, res) {
  try {
    const { data } = await axios.get(
      `https://api.tomorrow.io/v4/timelines?location=${req.body.lat},${req.body.lon}&fields=temperature&timesteps=1h&units=metric&apikey=${apiKey}`
    );
    res.send(data);
  } catch (e) {
    console.error(e);
  }
}
