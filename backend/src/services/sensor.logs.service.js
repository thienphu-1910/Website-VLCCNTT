import { db } from "../config/firebaseAdmin.js";
import { Chart } from 'chart.js/auto'
import { MqttService } from "./mqtt.service.js";

// collection path: devices/device001/sensorLogs/timestamp
const path = {
  root: "users",
  subcollection: "devices"
};

export const saveSensorLog = async ({deviceId, trigger, sensorsData}) => {
  const timestamp = new Date();
  const collectionRef = db.collection(`${path.root}/${userId}/${path.subcollection}/${deviceId}/sensorLogs`);
  const snapshot = await collectionRef.get();
  const length = snapshot.size();
  console.log(length);
  await db
    .collection(`${path.root}/${userId}/${path.subcollection}/${deviceId}/sensorLogs`)
    .doc(`${length + 1}`)
    .set({
      ...sensorsData,
      timestamp: timestamp.toISOString(),
      trigger: trigger
    });
}

// export const saveSensorData = async (deviceId, trigger, sensorsData) => {
//   try {
//     await saveSensorLog({
//       deviceId: deviceId,
//       trigger: trigger,
//       sensorsData: sensorsData
//     });
//     console.log("Saved to Firestore.");
//     return true;
//   } catch (e) {
//     console.log(`Error: ${e.message}.`);
//     return false;
//   }
// }

export const loadSensorLog = async ({deviceId}) => {
  const snapshot = await db
    .collection(`${path.root}/device${deviceId}/${path.collection}`)
    .limit(10)
    .get();
  return snapshot;
}

export const loadSensorData = async (deviceId) => {
  try {
    const snapshot = await loadSensorLog({
      deviceId: deviceId
    });
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return data;
  } catch (e) {
    console.log(`Error: ${e.message}.`);
    return {};
  }
}

export const saveSensorData = () => {
  try {
    const saveData = async (data) => {
      const { deviceID, triggerType, ...sensorsData } = data;
      await saveSensorLog(deviceID, triggerType, sensorsData);
    }

    MqttService.subscribeToTopic(saveData);
  } catch (err) {
    console.log("Save sensor Data error: ", err.message);
  }
}