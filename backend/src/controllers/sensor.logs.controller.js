import { db } from "../config/firebaseAdmin.js";
import { MqttService } from "../services/mqtt.service.js";

const path = {
  root: "devices",
};

export const SensorLogsController = {
  /**
   * @brief Create sensorLogs document data
   *
   * @param req request forms: { deviceId }
   * @param res response
   */
  getRecords: async (req, res) => {
    try {
      const deviceId = req.params.id;
      const snapshot = await db
        .collection(`${path.root}/${deviceId}/sensorLogs`)
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
