async function subscribe() {
  const sw = await navigator.serviceWorker.ready;
  const vapidKey = await (await fetch("http://localhost:3992/vapidkey")).text();

  const push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidKey,
  });

  const response = await fetch("http://localhost:3992/register", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(push),
  });

  console.log("subscription response", await response.json());
}

if ("serviceWorker" in navigator) {
  addEventListener("load", async () => {
    const sw = await navigator.serviceWorker.register("./sw.js");
    console.log("service worker registration", sw);
  });
}
