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
  TimeScale // Import TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Import the adapter!
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


const SensorLogsList = () => {
  const [deviceLogs, setDeviceLogs] = useState([]);
  const [flameData, setFlameData] = useState([]);
  const [smokeData, setSmokeData] = useState([]);
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    let activeEventSource = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (activeEventSource) {
        activeEventSource.close();
      }

      if (user) {
        console.log("User authenticated, starting SSE stream...");
        
        activeEventSource = new EventSource(`${import.meta.env.VITE_API_URL}/sensorlogs/events/${1}`);
        console.log(`${import.meta.env.VITE_API_URL}/sensorlogs/events/${1}`)

        activeEventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data);
          // Update all states
          setDeviceLogs((prev) => [...prev, data]);
          
          {/* x, y format where x stands for timestamp (ISO string) and y stands for specified sensor value */}
          setFlameData((prev) => [...prev, { x: data.timestamp, y: data.sensorData.flame_percentage }]);
          setSmokeData((prev) => [...prev, { x: data.timestamp, y: data.sensorData.smoke }]);
          setTempData((prev) => [...prev, { x: data.timestamp, y: data.sensorData.temperature }]);
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
    const min = flameData.reduce((min, current) => {
      return current.y < min.y ? current : min;
    }, flameData[0]);
    const max = flameData.reduce((max, current) => {
      return current.y > max.y ? current : max;
    }, flameData[0]);

    return flameData.map((d) => {
      return {
        ...d,
        y: (d.y - min.y) / (max.y - min.y),
      }
    });
  }, [flameData]);

  const normalizedSmoke = useMemo(() => {
    const min = smokeData.reduce((min, current) => {
      return current.y < min.y ? current : min;
    }, smokeData[0]);
    const max = smokeData.reduce((max, current) => {
      return current.y > max.y ? current : max;
    }, smokeData[0]);

    return smokeData.map((d) => {
      return {
        ...d,
        y: (d.y - min.y) / (max.y - min.y),
      }
    });
  }, [smokeData]);

  const normalizedTemperature = useMemo(() => {
    const min = tempData.reduce((min, current) => {
      return current.y < min.y ? current : min;
    }, tempData[0]);
    const max = tempData.reduce((max, current) => {
      return current.y > max.y ? current : max;
    }, tempData[0]);

    return tempData.map((d) => {
      return {
        ...d,
        y: (d.y - min.y) / (max.y - min.y),
      }
    });
  }, [tempData]);

  const data = {
    datasets: [
      {
        label: "Flame Percentage",
        data: normalizedFlame,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: "Smoke",
        data: normalizedSmoke,
        borderColor: 'rgb(46, 204, 113)',
        backgroundColor: 'rgba(46, 204, 113, 0.5)',
      },
      {
        label: "Temperature (Celcius)",
        data: normalizedTemperature,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  }


const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time', // CRITICAL: Use time scale, not category
        time: {
          unit: 'day', // Force the major ticks to be Days
          displayFormats: {
            day: 'EEEE' // Format code for "Monday", "Tuesday", etc.
          }
        },
        title: {
          display: true,
          text: 'Time of Week'
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <>
    <Line options={options} data={data} />
    </>
  )
 }

export default SensorLogsList;




// const data = {
//     datasets: [
//       {
//         label: "Flame Percentage",
//         data: flameData,
//         borderColor: 'rgb(255, 99, 132)',
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//       {
//         label: "Smoke",
//         data: smokeData,
//         borderColor: 'rgb(46, 204, 113)',
//         backgroundColor: 'rgba(46, 204, 113, 0.5)',
//       },
//       {
//         label: "Temperature (Celcius)",
//         data: tempData,
//         borderColor: 'rgb(53, 162, 235)',
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       }
//     ],
//   }


// const options = {
//     responsive: true,
//     scales: {
//       x: {
//         type: 'time', // CRITICAL: Use time scale, not category
//         time: {
//           unit: 'day', // Force the major ticks to be Days
//           displayFormats: {
//             day: 'EEEE' // Format code for "Monday", "Tuesday", etc.
//           }
//         },
//         title: {
//           display: true,
//           text: 'Time of Week'
//         }
//       },
//       y: {
//         beginAtZero: true
//       }
//     }
//   };