import { db } from "../config/firebaseAdmin.js";
import { MqttService } from "../services/mqtt.service.js";

// collection path: devices/device001/sensorLogs/timestamp
const path = {
  root: "devices",
};

export const SensorLogsController = {
  /**
   * @brief Create sensorLogs document data
   *
   * @param req request forms: { body: { deviceId, sensorsData } }
   * @param res response
   */
  // createRecord: async (req, res) => {
  //   try {
  //     const timestamp = new Date();
  //     const { deviceId, sensorsData } = req.body;
  //     const docData = {
  //       ...sensorsData,
  //     };
  //     const response = await db
  //       .collection(`${path.root}/device${deviceId}/${path.collection}`)
  //       .doc(`${timestamp}`)
  //       .set(docData);

  //     res.json({
  //       id: response.id,
  //       ...response.docData,
  //     });
  //   } catch (e) {
  //     res.status(500).json({ message: e.message });
  //   }
  // },

  /**
   * @brief Create sensorLogs document data
   *
   * @param req request forms: { deviceId }
   * @param res response
   */
  getRecords: async (req, res) => {
    try {
      const deviceId = req.params.id;
      const userId = 1;
      const snapshot = await db
        .collection(`${path.root}/${userId}/${path.subcollection}/${deviceId}/sensorLogs`)
        //.limit(10)
        .orderBy('timestamp', 'desc')
        .get();

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.json(data);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  // api/sensorlogs/events
  getRealTimeRecord: (req, res) => {
    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      const handleData = (data) => {
        const { deviceId, triggerType, timestamp, sensorsData} = data;
        if (String(deviceId) === req.params.id) {
          const payload = {
            triggerType: triggerType,
            timestamp: timestamp,
            sensorsData: sensorsData,
          };
          res.write(`data: ${JSON.stringify(payload)}\n\n`);
        }
      };
      MqttService.subscribeToTopic(handleData);

      req.on('close', () => {
        console.log("Client close connection!");
      });
    } catch {
      res.status(500).json({ message: e.message });
    }
  },
};
