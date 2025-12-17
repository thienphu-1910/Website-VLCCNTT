import DeviceStatusCard from "./DeviceStatusCard";
import { IoWarningOutline } from "react-icons/io5";
import { CiWavePulse1, CiTempHigh } from "react-icons/ci";
import { RiCelsiusFill } from "react-icons/ri";
import { LuAlarmSmoke } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { GrDocumentSound } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";
import { ImFire } from "react-icons/im";
import { HistoryApi } from "../api/history.api";
import { useEffect, useState } from "react";
import { formatCustomDate } from "../libs/DateTimeFormat";

const HistoryList = () => {
  const [deviceHistories, setDeviceHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const smokeStatusMapping = {
    0: "Clear",
    1: "Smoke",
  };

  useEffect(() => {
    let isMounted = true;
    const loadHistories = async () => {
      try {
        setLoading(true);
        setError(null);

        const respone = await HistoryApi.getAll();
        //console.log(respone);
        if (isMounted) {
          setDeviceHistories(respone?.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadHistories();

    return () => {
      isMounted = false;
    }
  }, [])

  return (
    <>
      {loading && (<div>Loading...</div>)}
      {error && (<div>Error</div>)}
      {!loading && !error && (
        <ul className="w-fit flex flex-col justify-center items-center gap-5 my-5">
        {deviceHistories.length > 0 && 
        deviceHistories.map((h, i) => (
          <li key={i + 1}>
            <DeviceStatusCard className="h-fit w-50 md:w-150">
              <header className="bg-blue-200 h-fit w-full rounded-xl mb-4 px-2 py-1 font-bold text-blue-600">
                {formatCustomDate(h.timestamp)}
              </header>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] h-fit gap-10 w-full">
                <div className="flex flex-col items-start gap-5 ">
                  <section className="w-full flex flex-row gap-2 items-center">
                    <ImFire
                      className="fill-red-400 stroke-red-400 stroke-1 size-9 
                                                bg-red-200/50 rounded-lg p-1"
                    />
                    <h3 className="text-black font-bold text-lg">Flame Percentage</h3>
                  </section>
                  <div className="px-3 py-1 w-full rounded-full flex flex-col gap-2 justify-center items-start">
                    <p className="text-2xl text-blue-500">
                      {h.flame_percentage} <span className="text-base text-gray-500">%</span>
                    </p>
                    <div className="w-full h-2 bg-gray-400/40 rounded-full">
                      <div
                        style={{
                          width: `${h.flame_percentage}%`,
                          backgroundSize: `${100 * (100 / `${h.flame_percentage}`)}% 100%`,
                        }}
                        className="h-2 bg-linear-to-r w-full from-green-400 from-30% via-yellow-300 via-55% to-red-500 to-100% rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-5 ">
                  <section className="w-full flex flex-row gap-2 items-center">
                    <CiTempHigh
                      className="fill-orange-400 stroke-orange-400 size-9 
                                                bg-orange-200/50 rounded-lg p-1"
                    />
                    <h3 className="text-black font-bold text-lg">Temperature</h3>
                  </section>
                  <p className="text-2xl text-orange-500 flex flex-row items-start">
                    {h.temperature}
                    <RiCelsiusFill className="fill-gray-500 size-5" />
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <section className="w-full flex flex-row gap-2 items-center">
                    <LuAlarmSmoke
                      className="fill-gray-300 stroke-gray-500 size-9 
                                                bg-black/7 rounded-lg p-1"
                    />
                    <h3 className="text-black font-bold text-lg">Smoke</h3>
                  </section>
                  <div className="bg-green-200/50 font-bold text-green-400 w-fit px-3 py-1 rounded-full flex flex-row gap-2 justify-center items-center">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <p>{smokeStatusMapping[h.smoke_status]}</p>
                  </div>
                </div>
              </div>
            </DeviceStatusCard>
          </li>
        ))}
      </ul>
      )}
    </>
  )
}

export default HistoryList;