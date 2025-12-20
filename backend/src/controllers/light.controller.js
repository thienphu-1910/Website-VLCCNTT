import { client } from "../config/mqtt.js";
const lightTopic = "fire_alarm/nhom7/light";

client.on('connect', () => {
  console.log("Light Controller: Client connect successfully");
});

export const LightController = {
  createLightStatus: async (req, res) => {
    const { state } = req.body;
    if (!state || (state !== 'ON' && state !== 'OFF')) {
      return res.status(400).json({ error: 'Invalid state. Use ON or OFF.' });
    }

    client.publish(lightTopic, state, (err) => {
      if (err) {
        console.log("Light Controller error: ", err);
        return res.status(500).json({ message: "Failed to signal device" });
      }

      res.json({
        success: true,
        message: `Signal ${state} sent to device`
      })
    })
  },
}