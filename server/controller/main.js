import fs from "fs";
// import dotenv from "dotenv";
// dotenv.config({ silent: process.env.NODE_ENV === "dev" });
import { successMessage, errorMessage } from "../helpers/responseMessages.js";
import { getUrlData } from "../helpers/getUrlData.js";
import { calculateAge } from "../helpers/calculateAge.js";

export async function getData(name) {
  const namesObj = await getAllInfo();

  const age = namesObj[name]?.age ? namesObj[name]?.age : undefined;
  switch (true) {
    case !namesObj.hasOwnProperty(name):
      return errorMessage("User is not registered!");

    case age == undefined:
      return errorMessage("Invalid Birthdate");

    case age >= 10:
      return errorMessage("Age is more than 10");

    case namesObj.hasOwnProperty(name) && age < 10:
      let existingData = [];
      try {
        existingData = JSON.parse(fs.readFileSync("reqDone.json", "utf-8"));
      } catch (err) {
        existingData = [];
      }
      existingData.push(name);
      fs.writeFileSync(
        ".../../data/reqDone.json",
        JSON.stringify(existingData, null, 2),
        "utf-8"
      );
      return successMessage("The request has been received!");

    default:
      return errorMessage("Invalid Request");
  }
}

export async function getAllInfo() {
  const birthDateUrl =
    process.env.BIRTHDATEURL;
  const nameUrl =
    process.env.NAMEURL;

  const birthDates = await getUrlData(birthDateUrl);
  const names = await getUrlData(nameUrl);
  const namesObj = names.reduce((acc, o) => {
    acc[o.username] = {
      id: o.uid,
      name: o.username,
      address: birthDates.find((obj) => obj.userUid == o.uid).address,
      birthdate: birthDates.find((obj) => obj.userUid == o.uid).birthdate,
      age: calculateAge(
        birthDates.find((obj) => obj.userUid == o.uid).birthdate
      ),
    };
    return acc;
  }, {});
  return namesObj;
}
