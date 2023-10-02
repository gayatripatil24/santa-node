// routes.js
import express from "express";
const router = express.Router();
import { getData } from "../controller/main.js";

router.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hello from the route file!");
});

router.post("/checkUser", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const getd = await getData(req.body.name);
  console.log("getd-- ", getd);
  res.send(getd);
});

// module.exports = router;
export default router;
