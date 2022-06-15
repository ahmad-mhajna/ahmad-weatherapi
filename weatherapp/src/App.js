import "./App.css";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

function App() {
  const [location, setlocation] = useState({ lat: 0, lon: 0 });
  const [data, setData] = useState();
  async function getdata() {
    const { data } = await axios.get(
      `http://localhost:5000/weather/${location.lat},${location.lon}`
    );
    setData(data.data);
  }
  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={location.lat}
          onChange={(e) => {
            setlocation({ ...location, lat: e.target.value });
          }}
        />
        <input
          type="text"
          value={location.lon}
          onChange={(e) => {
            setlocation({ ...location, lon: e.target.value });
          }}
        />
        <button
          onClick={getdata}
          disabled={location.lat === "" || location.lon === ""}
        >
          Submit
        </button>
      </div>
      <div className="container">
        {data?.timelines[0].intervals.map((interval) => {
          return (
            <div>
              <p>Hour:{moment(interval.startTime).format("HHA")}</p>
              <p>Temp:{interval.values.temperature}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
