import webPush from "web-push";
import fs from "fs";

const keyFilePath = new URL("./vapidkeys.json", import.meta.url);

export function getOrGenerateVapidKeys() {
  if (fs.existsSync(keyFilePath)) {
    return JSON.parse(fs.readFileSync(keyFilePath));
  } 

  console.log("generating vapid keys");
  const keys = webPush.generateVAPIDKeys();
  fs.writeFileSync(keyFilePath, JSON.stringify(keys));

  return keys;
}
