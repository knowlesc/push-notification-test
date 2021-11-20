import express, { urlencoded, json } from "express";
import cors from "cors";
import webPush from "web-push";
import { getOrGenerateVapidKeys } from "./keys.js";

const keys = await getOrGenerateVapidKeys();

webPush.setVapidDetails(
  'mailto: <some.test.email@imadeitup.com',
  keys.publicKey,
  keys.privateKey,
);

const app = express();
const port = 3992;

app.use(cors({ origin: "*" }));
app.use(urlencoded({ extended: true }));
app.use(json());

/**
 * pretend this is a datastore lol
 * right now it only fits one subscription but imagine there's a table full of subscriptions for different users
 */
let sub = null;

// convenient way for the front end to get the vapid public key to subscripe to notifications
app.get("/vapidkey", (req, res) => {
  res.send(keys.publicKey);
});

// this gets hit by the client
app.post("/register", (req, res) => {
  // in a real scenario we'd also pass in the user id so we know what user the subscription is for
  sub = req.body; // "store" the subscription
  res.json({ success: true });
});

// this gets hit by a service when we want to send notifications to users
app.post("/notify", (req, res) => {
  if (!sub) {
    return res.json({ success: false });
  }
  
  // normally we'd want a user(s) to send notifications to
  // but this will just send a notification to our one subscriber (yourself)
  const content = req.body;
  webPush.sendNotification(sub, JSON.stringify(content));
  res.json({ success: true, content });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
