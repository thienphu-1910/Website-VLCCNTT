import { db } from "../config/firebaseAdmin.js";
import { Chart } from 'chart.js/auto'

// collection path: devices/device001/sensorLogs/timestamp
const path = {
  root: "devices",
  collection: "sensorLogs"
};

export const saveSensorLog = async ({deviceId, trigger, sensorsData}) => {
  const timestamp = new Date();
  await db
    .collection(`${path.root}/device${deviceId}/${path.collection}`)
    .doc(`${timestamp}`)
    .set({
      ...sensorsData,
      trigger: trigger
    });
}

export const saveSensorData = async (deviceId, trigger, sensorsData) => {
  try {
    await saveSensorLog({
      deviceId: deviceId,
      trigger: trigger,
      sensorsData: sensorsData
    });
    console.log("Saved to Firestore.");
    return true;
  } catch (e) {
    console.log(`Error: ${e.message}.`);
    return false;
  }
}

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