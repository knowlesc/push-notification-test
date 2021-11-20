Send push notifications to yourself (if you want)

Instructions
1. run `npm ci`
2. start the api `npm run start:api`
3. start the frontend `npm run start:fe`
4. start the notifier `npm run start:notify`
5. open the frontend (http://localhost:3991)
6. hit the `Subscribe` button
7. open the notifier ui (http://localhost:3990)
8. enter some text in the text box and click `Send Push Notification`
9. watch for the notification to show up 

Troubleshooting
- use node 16.13.0
- I've only tested this in chrome so far
- If you see `Registration failed - A subscription with a different applicationServerKey (or gcm_sender_id) already exists; to change the applicationServerKey, unsubscribe then resubscribe.` in your browser console, do this: 
  ```
    const sw = await navigator.serviceWorker.ready
    const sub = await sw.pushManager.getSubscription()
    await sub.unsubscribe()
    ```