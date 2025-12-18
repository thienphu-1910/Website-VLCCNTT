import { db } from "../config/firebaseAdmin.js";

// collection path: devices/device001/sensorLogs/timestamp
const path = {
  root: "devices",
  collection: "sensorLogs"
};

export const SensorLogsController = {
  /**
   * @brief Create sensorLogs document data
   *
   * @param req request forms: { body: { deviceId, sensorsData } }
   * @param res response
   */
  createRecord: async (req, res) => {
    try {
      const timestamp = new Date();
      const { deviceId, sensorsData } = req.body;
      const docData = {
        ...sensorsData
      };
      const response = await db
        .collection(`${path.root}/device${deviceId}/${path.collection}`)
        .doc(`${timestamp}`)
        .set(docData);

      res.json({
        id: response.id,
        ...response.docData
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },

  /**
   * @brief Create sensorLogs document data
   *
   * @param req request forms: { deviceId }
   * @param res response
   */
  getRecords: async (req, res) => {
    try {
      const { deviceId } = req.body;

      const snapshot = await db
        .collection(`${path.root}/device${deviceId}/${path.collection}`)
        .limit(10)
        .get();

      const data = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data(),
      }));
      
      res.json(data);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}