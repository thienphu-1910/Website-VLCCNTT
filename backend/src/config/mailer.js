import { createRequire } from "module";
import { db, auth } from "./firebaseAdmin.js";
const require = createRequire(import.meta.url);

const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

function alertEmailTemplate(sensorData, level) {
  const color =
    level === "CRITICAL"
      ? "#d32f2f"
      : level === "WARNING"
      ? "#f57c00"
      : "#388e3c";

  return `
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      align="center"
      style="background:#f4f6f8;padding:20px;"
    >
      <tr>
        <td align="center">

          <!-- CENTER BOX -->
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#ffffff;
              border:2px solid #d32f2f;
              border-radius:8px;
              font-family:Arial, Helvetica, sans-serif;
            "
          >
            <tr>
              <td style="padding:20px;">

                <h1 style="margin-top:0;color:#d32f2f;text-align:center;">
                  🚨 FireGuard Alert ${level}
                </h1>

                <p style="text-align:center;">
                  We have detected unusual sensor readings.
                </p>

                <table width="100%" cellpadding="6">
                  <tr>
                    <td><b>Flame Percentage:</b></td>
                    <td>${sensorData.flame}&nbsp;%</td>
                  </tr>
                  <tr>
                    <td><b>Temperature:</b></td>
                    <td>${sensorData.temperature}&nbsp;°C</td>
                  </tr>
                  <tr>
                    <td><b>Smoke:</b></td>
                    <td>Detected</td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
  
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
          <p style="font-size:12px;color:#777;margin-bottom:0;">
            This is an automated message from FireGuard Alerting System.
            Please do not reply to this email.
          </p>
        </td>
      </tr>
    </table>
  `;
}

export const sendEmailAlert = async (deviceId, sensorData) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: "api",
      pass: process.env.MAILTRAP_API_TOKEN,
    },
  });

  const sender = {
    address: process.env.MAILTRAP_SENDER,
    name: "FireGuard Alerts",
  };

  const snapshot = await db.doc(`devices/${deviceId}`).get()
  const userId = snapshot.data().userId;
  const recipents = (await db.doc(`users/${userId}`).get()).data().email;
  
  try {
    const info = transport.sendMail({
        from: sender,
        to: recipents,
        subject: "Fire Alert",
        html: alertEmailTemplate(sensorData, "CRITICAL"),
    }); 
    
    console.log("Email sent:", info.messageId);
    return true;
  } catch (e) {
    console.error("Send email failed:", e);
    return false;
  }
};
