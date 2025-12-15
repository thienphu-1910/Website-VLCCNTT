import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const push_notification = require("pushsafer-notifications");

const pn = new push_notification({
    k: process.env.PS_SECRET_KEY,
    debug: true
});

export const sendPushNotifications = (message, title, targetDevice) => {
    return new Promise((resolve, reject) => {
        const msg = {
            m: message, // Message
            t: title, // Title
            s: 20, // TODO: Sửa sau
            v: 2, // TODO: Sửa sau
            i: 82, // Warning Icon
            d: targetDevice
        };

        pn.send(msg, (err, result) => {
            if (err) {
                console.error("Error: ", err);
                resolve(false);
            } else {
                try {
                    const parsed = JSON.parse(result);
                    if (parsed.status === 1) {
                        console.log("Success");
                        resolve(true);
                    } else {
                        console.error("Error: ", err);
                        resolve(false);
                    }
                } catch (e) {
                    console.error("Error: ", e);
                    resolve(false);
                }
            }
        });
    });
};