import { db } from "../config/firebaseAdmin.js";
import { MqttService } from "./mqtt.service.js";

const path = {
  root: "devices"
};

export const saveSensorLog = async ({deviceId, triggerType, sensorsData}) => {
  const timestamp = new Date();
  const collectionRef = db.collection(`${path.root}/${deviceId}/sensorLogs`);
  const snapshot = await collectionRef.get();
  const length = snapshot.size;
  await db
    .collection(`${path.root}/${deviceId}/sensorLogs`)
    .doc(`${length + 1}`)
    .set({
      ...sensorsData,
      timestamp: timestamp.toISOString(),
      trigger: triggerType
    });
}

export const saveSensorData = async () => {
  try {
    const saveData = async (data) => {
      const { deviceId, triggerType, ...sensorsData } = data;
      await saveSensorLog({deviceId, triggerType, sensorsData});
    }

    MqttService.subscribeToTopic(saveData);
  } catch (err) {
    console.log("Save sensor Data error: ", err.message);
  }
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
    .collection(`${path.root}/${deviceId}/sensorLogs`)
    .orderBy("timestamp", "desc")
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
      timestamp: doc.data().timestamp.toDate().toISOString(),
      trigger: doc.data().trigger,
      sensorsData: {
        flame: doc.data().flame,
        temperature: doc.data().temperature,
        smoke: doc.data().smoke,
      },
    }));
    return {
      deviceId: deviceId,
      ...data
    };
  } catch (e) {
    console.log(`Error: ${e.message}.`);
    return {};
  }
}