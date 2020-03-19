"use strict";

/*
 ** Import packages
 */
require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";

import cors from "./config/cors";
import config from "./config/variables";
import webhookRoutes from "./routes/webhook.route";
import profileRoutes from "./routes/profile.route";

config.checkEnv();

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors)
  .use(express.static(__dirname + "/static"));

webhookRoutes(app);
profileRoutes(app);

/*
 ** Middleware configuration
 */
app.listen(config.PORT, () => {
  console.log("⚡️ [BOT CONSILIO] Express server is listening.");

  if (
    Object.keys(config.PERSONAS).length == 0 &&
    config.APP_URL &&
    config.SITE_URL
  ) {
    console.log(
      "⚡️ [BOT CONSILIO] Make sure to set the both the Messenger profile, persona " +
        "and webhook by visiting:\n⚡️ [BOT CONSILIO] " +
        config.APP_URL +
        "/profile?mode=all&verify_token=" +
        config.VERIFY_TOKEN
    );
  }
  if (config.PAGE_ID) {
    console.log("⚡️ [BOT CONSILIO] Test app by messaging:");
    console.log("⚡️ [BOT CONSILIO] https://m.me/" + config.PAGE_ID);
  }
});

/*
 ** View index
 */
app.get("/", (req, res) => {
  res.send("⚡️[BOT CONSILIO] Hello world!");
});
