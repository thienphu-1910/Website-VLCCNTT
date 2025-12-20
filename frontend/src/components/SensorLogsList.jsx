// import DeviceStatusCard from "./DeviceStatusCard";
// import { IoWarningOutline } from "react-icons/io5";
// import { CiWavePulse1, CiTempHigh } from "react-icons/ci";
// import { RiCelsiusFill } from "react-icons/ri";
// import { LuAlarmSmoke } from "react-icons/lu";
// import { FaRegBell } from "react-icons/fa6";
// import { GrDocumentSound } from "react-icons/gr";
// import { HiOutlineLightBulb } from "react-icons/hi";
// import { ImFire } from "react-icons/im";
// import { SensorLogsApi } from "../api/sensor-logs.api";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale, // Import TimeScale
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns"; // Import the adapter!
import { useMemo } from "react";

// Register the TimeScale
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const normalizedSensorData = (data) => {
  if (!data || data.length === 0) return [];

  const values = data.map((d) => Number(d.y));
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    return data.map((d) => ({ ...d, y: 0.5 }));
  }

  return data.map((d) => ({
    ...d,
    y: (d.y - min) / (max - min),
  }));
};

const SensorLogsList = () => {
  const [deviceLogs, setDeviceLogs] = useState([]);
  const [flameData, setFlameData] = useState([]);
  const [smokeData, setSmokeData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const limit = 7;
  useEffect(() => {
    let activeEventSource = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (activeEventSource) {
        activeEventSource.close();
      }

      if (user) {
        console.log("User authenticated, starting SSE stream...");

        activeEventSource = new EventSource(
          `${import.meta.env.VITE_API_URL}/sensorlogs/events/${1}`
        );

        activeEventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);

          // Update all states
          setDeviceLogs((prev) => [...prev, data].slice(-limit));

        
          /* x, y format where x stands for timestamp (ISO string) and y stands for specified sensor value */
          setFlameData((prev) => [
            ...prev,
            { x: data.timestamp, y: data.sensorsData.flame },
          ]);
          setSmokeData((prev) => [
            ...prev,
            { x: data.timestamp, y: data.sensorsData.smoke },
          ]);
          setTempData((prev) => [
            ...prev,
            { x: data.timestamp, y: data.sensorsData.temperature },
          ]);
        };

        activeEventSource.onerror = (err) => {
          console.error("SSE Error:", err);
          activeEventSource.close();
        };
      }
    });

    // Cleanup Function in
    return () => {
      unsubAuth();
      if (activeEventSource) {
        console.log("Closing SSE connection...");
        activeEventSource.close();
      }
    };
  }, []);

  const normalizedFlame = useMemo(() => {
    return normalizedSensorData(flameData);
  }, [flameData]);

  const normalizedSmoke = useMemo(() => {
    return normalizedSensorData(smokeData);
  }, [smokeData]);

  const normalizedTemperature = useMemo(() => {
    return normalizedSensorData(tempData);
  }, [tempData]);

  const data = {
    datasets: [
      {
        label: "Flame (Percentage)",
        data: normalizedFlame,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
      },
      {
        label: "Smoke",
        data: normalizedSmoke,
        borderColor: "rgb(46, 204, 113)",
        backgroundColor: "rgba(46, 204, 113, 0.5)",
        tension: 0.2,
      },
      {
        label: "Temperature (Celcius)",
        data: normalizedTemperature,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time", // CRITICAL: Use time scale, not category
        time: {
          unit: "day", // Force the major ticks to be Days
          displayFormats: {
            day: "EEEE", // Format code for "Monday", "Tuesday", etc.
          },
        },
        ticks: {
          source: "data",
        }
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "90vw",
        height: "60vh", // scale theo chiều cao màn hình
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
};

export default SensorLogsList;
