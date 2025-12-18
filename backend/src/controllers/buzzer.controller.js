import { client } from '../config/mqtt.js';

const buzzerTopic = 'firealarm/nhom7/buzzer';
client.on('connect', () => {
  console.log('Buzzer Controller: Client connect successfully.');
});

export const BuzzerController = {
  createBuzzerStatus: async (req, res) => {
    const { state } = req.body;
    if (!state || (state !== 'ON' && state !== 'OFF')) {
      return res.status(400).json({ error: 'Invalid state. Use ON or OFF.' });
    }

    const authBuzzerTopic = `${buzzerTopic}/${req.user.uid}`

    client.publish(authBuzzerTopic, state, (e) => {
      if (e) {
        console.log('Buzzer Controller error: ', e);
        return res.status(500).json({ message: 'Failed to signal device.' });
      }

      res.json({
        success: true,
        message: `Signal ${state} sent to device.`
      })
    })
  },
}