// server.js
// where your node app starts

// init project
// const express = require("express");
import express from "express";
import nunjucks from "nunjucks";
// const morgan = require("morgan");
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "dev" });
const app = express();
// const bodyParser = require("body-parser");
import bodyParser from "body-parser";
import {
  createNodemailerAccount,
  emailSchedular,
} from "./server/controller/nodemailer.js";

app.use(bodyParser());
app.use(morgan());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// Require the route file
import routes from "./server/routes/router.js";
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// Use the route file as middleware
app.use("/", routes);
nunjucks.configure('server', {
  autoescape: true,
  express: app
});

createNodemailerAccount();
emailSchedular();

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/views/index.html");
// });

// app.post("/checkUser", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   const getd = await getData(req.body.name);
//   console.log("getd-- ", getd);
//   res.send(getd);
// });

// export function getUrlData(url) {
//   return fetch(url)
//     .then((response) => {
//       // Check if the response status is OK (status code 200)
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       // Parse the JSON response
//       return response.json();
//     })
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       // Handle any errors that occurred during the fetch
//       console.error("Fetch error:", error);
//     });
// }

// async function getData(name) {
//   const namesObj = await getFinalObject();

//   const age = namesObj[name]?.age ? namesObj[name]?.age : undefined;
//   switch (true) {
//     case !namesObj.hasOwnProperty(name):
//       return errorMessage("User is not registered!");

//     case age == undefined:
//       return errorMessage("Invalid Birthdate");

//     case age >= 10:
//       return errorMessage("Age is more than 10");

//     case namesObj.hasOwnProperty(name) && age < 10:
//       let existingData = [];
//       try {
//         existingData = JSON.parse(fs.readFileSync("reqDone.json", "utf-8"));
//       } catch (err) {
//         existingData = [];
//       }
//       existingData.push(name);
//       fs.writeFileSync(
//         "reqDone.json",
//         JSON.stringify(existingData, null, 2),
//         "utf-8"
//       );
//       return successMessage("The request has been received!");

//     default:
//       return errorMessage("Invalid Request");
//   }
// }

// export async function getFinalObject() {
//   const birthDateUrl =
//     "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";
//   const nameUrl =
//     "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";

//   const birthDates = await getUrlData(birthDateUrl);
//   const names = await getUrlData(nameUrl);
//   const namesObj = names.reduce((acc, o) => {
//     acc[o.username] = {
//       id: o.uid,
//       name: o.username,
//       address: birthDates.find((obj) => obj.userUid == o.uid).address,
//       birthdate: birthDates.find((obj) => obj.userUid == o.uid).birthdate,
//       age: calculateAge(
//         birthDates.find((obj) => obj.userUid == o.uid).birthdate
//       ),
//     };
//     return acc;
//   }, {});
//   return namesObj;
// }
// export function calculateAge(birthdate) {
//   const birthDate = new Date(birthdate);
//   const currentDate = new Date();

//   // Calculate the difference in years
//   const age = currentDate.getFullYear() - birthDate.getFullYear();

//   // Check if the birthdate has occurred this year
//   if (
//     currentDate.getMonth() < birthDate.getMonth() ||
//     (currentDate.getMonth() === birthDate.getMonth() &&
//       currentDate.getDate() < birthDate.getDate())
//   ) {
//     return age - 1; // Subtract 1 year if the birthdate hasn't occurred yet this year
//   }
//   return age;
// }
// export function errorMessage(message) {
//   return { error: message };
// }
// export function successMessage(message) {
//   return { success: message };
// }
