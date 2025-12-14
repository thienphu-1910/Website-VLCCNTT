import DeviceStatusCard from "./DeviceStatusCard";
import { IoWarningOutline } from "react-icons/io5";
import { CiWavePulse1, CiTempHigh } from "react-icons/ci";
import { RiCelsiusFill } from "react-icons/ri";
import { LuAlarmSmoke } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { GrDocumentSound } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";

const HistoryList = () => {
  return (
    <ul className="w-fit flex flex-col justify-center items-center gap-5 my-5">
      <li>
        <DeviceStatusCard className="h-fit w-50 md:w-150">
          <header className="bg-blue-200 h-fit w-full rounded-xl mb-4 px-2 py-1 font-bold text-blue-600">
            Sunday, September 21st 2025, 21:09:00
          </header>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] h-fit gap-10 w-full">
            <div className="flex flex-col items-start gap-5 ">
              <section className="w-full flex flex-row gap-2 items-center">
                <CiWavePulse1
                  className="fill-blue-400 stroke-blue-400 stroke-1 size-9 
                                            bg-blue-200/50 rounded-lg p-1"
                />
                <h3 className="text-black font-bold text-lg">CO Level</h3>
              </section>
              <div className="px-3 py-1 rounded-full flex flex-col gap-2 justify-center items-start">
                <p className="text-2xl text-blue-500">
                  442 <span className="text-base text-gray-500">ppm</span>
                </p>
                <div className="w-full h-2 bg-gray-400/40 rounded-full">
                  <div
                    style={{
                      width: `60%`,
                      backgroundSize: `${100 * (100 / `60`)}% 100%`,
                    }}
                    className="h-2 bg-linear-to-r from-green-400 from-30% via-yellow-300 via-55% to-red-500 to-100% rounded-full"
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
                30
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
                <p>Clear</p>
              </div>
            </div>
          </div>
        </DeviceStatusCard>
      </li>
      <li>
        <DeviceStatusCard className="h-fit w-50 md:w-150">
          <header className="bg-blue-200 h-fit w-full rounded-xl mb-4 py-1 font-bold text-blue-600">
            Sunday, September 21st 2025, 21:09:00
          </header>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] h-fit gap-10 w-full">
            <div className="flex flex-col items-start gap-5 ">
              <section className="w-full flex flex-row gap-2 items-center">
                <CiWavePulse1
                  className="fill-blue-400 stroke-blue-400 stroke-1 size-9 
                                            bg-blue-200/50 rounded-lg p-1"
                />
                <h3 className="text-black font-bold text-lg">CO Level</h3>
              </section>
              <div className="px-3 py-1 rounded-full flex flex-col gap-2 justify-center items-start">
                <p className="text-2xl text-blue-500">
                  442 <span className="text-base text-gray-500">ppm</span>
                </p>
                <div className="w-full h-2 bg-gray-400/40 rounded-full">
                  <div
                    style={{
                      width: `60%`,
                      backgroundSize: `${100 * (100 / `60`)}% 100%`,
                    }}
                    className="h-2 bg-linear-to-r from-green-400 from-30% via-yellow-300 via-55% to-red-500 to-100% rounded-full"
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
                30
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
                <p>Clear</p>
              </div>
            </div>
          </div>
        </DeviceStatusCard>
      </li>
      <li>
        <DeviceStatusCard className="h-fit w-50 md:w-150">
          <header className="bg-blue-200 h-fit w-full rounded-xl mb-4 py-1 font-bold text-blue-600">
            Sunday, September 21st 2025, 21:09:00
          </header>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] h-fit gap-10 w-full">
            <div className="flex flex-col items-start gap-5 ">
              <section className="w-full flex flex-row gap-2 items-center">
                <CiWavePulse1
                  className="fill-blue-400 stroke-blue-400 stroke-1 size-9 
                                            bg-blue-200/50 rounded-lg p-1"
                />
                <h3 className="text-black font-bold text-lg">CO Level</h3>
              </section>
              <div className="px-3 py-1 rounded-full flex flex-col gap-2 justify-center items-start">
                <p className="text-2xl text-blue-500">
                  442 <span className="text-base text-gray-500">ppm</span>
                </p>
                <div className="w-full h-2 bg-gray-400/40 rounded-full">
                  <div
                    style={{
                      width: `60%`,
                      backgroundSize: `${100 * (100 / `60`)}% 100%`,
                    }}
                    className="h-2 bg-linear-to-r from-green-400 from-30% via-yellow-300 via-55% to-red-500 to-100% rounded-full"
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
                30
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
                <p>Clear</p>
              </div>
            </div>
          </div>
        </DeviceStatusCard>
      </li>
    </ul>
  )
}

export default HistoryList;