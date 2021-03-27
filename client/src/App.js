import React, { useState, useEffect } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";
import moment from "moment";
import io from "socket.io-client";

function App() {
  const [datas, setDatas] = useState([]);
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on("chart-datas", (data) => {
      setDatas(data);
    });
  }, []);

  const dataByRequestType = (datas, type) => {
    const res = [];
    datas
      .filter((data) => data.type === type)
      .forEach((data) => {
        // console.log(moment(data.timestamp))

        res.push({ x: moment.unix(data.timestamp), y: data.responseTime });
      });
    return res;
    //  moment(data.timestamp,'h:mm')
  };

  return (
    <div className="app">
      <div className="chart">
        <Line
          width={400}
          height={300}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    labelString: "Response Time",
                  },
                  ticks: {
                    min: 0,
                    max: 3,
                    stepSize: 0.5,
                  },
                },
              ],

              xAxes: [
                {
                  type: "time",
                  distribution: "linear",
                  time: {
                    unit: "hour",
                    displayFormats: {
                      hour: "h:mm",
                    },
                    unitStepSize: 0.1,
                  },
                  // bounds: 'ticks'
                },
              ],
            },
          }}
          data={{
            datasets: [
              {
                label: "GET",
                data: dataByRequestType(datas, "GET"),
                backgroundColor: ["rgba(0,0,0,0)"],
                borderColor: ["#007BFF"],
                borderWidth: 1,
                // backgroundColor: ["rgba(0, 123, 255,0.1)"],
              },
              {
                label: "POST",
                data: dataByRequestType(datas, "POST"),
                backgroundColor: ["rgba(0,0,0,0)"],
                borderColor: ["#28A745"],
                borderWidth: 1,
              },
              {
                label: "PUT",
                data: dataByRequestType(datas, "PUT"),
                backgroundColor: ["rgba(0,0,0,0)"],
                borderColor: ["#FFC107"],
                borderWidth: 1,
              },
              {
                label: "DELETE",
                data: dataByRequestType(datas, "DELETE"),
                backgroundColor: ["rgba(0,0,0,0)"],
                borderColor: ["#DC3545"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default App;
