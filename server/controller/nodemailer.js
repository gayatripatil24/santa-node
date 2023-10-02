import nodemailer from "nodemailer";
import fs from "fs";
import cron from "node-cron";
import { getAllInfo } from "./main.js";
import dotenv from "dotenv";
// import dotenv from "dotenv";
// dotenv.config({ silent: process.env.NODE_ENV === "dev" });
var accountDetails = {};

export function createNodemailerAccount() {
  // Generate SMTP service account from ethereal.email
  nodemailer.createTestAccount((err, account) => {
    console.log("account-- ", account);
    accountDetails = account;
    if (err) {
      console.error("Failed to create a testing account. " + err.message);
      return process.exit(1);
    }
    console.log("Account is Created...");
  });
}

function emailNotification(pendingData) {
  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    host: accountDetails.smtp.host,
    port: accountDetails.smtp.port,
    secure: accountDetails.smtp.secure,
    auth: {
      user: accountDetails.user,
      pass: accountDetails.pass,
    },
  });

  // Message object
  let message = {
    from: process.env.FROM,
    to: process.env.TO,
    subject: process.env.SUBJECT,
    text: JSON.stringify(pendingData),
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
}

//email Schedular
export function emailSchedular() {
  try {
    const task = cron.schedule("*/1 * * * *", async () => {
      console.log("Task executed every 15 Minutes");
      const namesObj = await getAllInfo();
      var existingData = JSON.parse(
        fs.readFileSync(".../../data/reqDone.json", "utf-8"))
        console.log("existingData--", existingData);
        existingData = [...new Set(existingData)];
     
      let pendingData = [];
      for (let name in namesObj) {
        if (!existingData.includes(name)) pendingData.push(namesObj[name]);
      }
      emailNotification(pendingData);
    });
    // Start the cron job
    task.start();
  } catch (error) {
    console.log(error);
  }
}
