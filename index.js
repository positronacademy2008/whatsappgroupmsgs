const axios = require('axios');

    // GitHub Secrets se data uthayega
    const TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_ID = process.env.PHONE_NUMBER_ID;

    async function sendMsg(group_id, message) {
      const url = `https://graph.facebook.com/v20.0/${PHONE_ID}/messages`;
      try {
        await axios.post(url, {
          messaging_product: "whatsapp",
          to: group_id, 
          type: "text",
          text: { body: message }
        }, {
          headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        console.log("Sent!");
      } catch (e) {
        console.error("Error:", e.response.data);
      }
    }

    sendMsg('GROUP_ID_HERE', 'Hello from GitHub!');
    ```

---

### Step 2: Developer Keys Save Karein (Secrets)
Kyuki aap `.env` file nahi bana rahe, isliye keys ko **GitHub Secrets** mein save karna hoga taaki wo safe rahein:

1.  Repository mein upar **Settings** par jayein.
2.  Left side mein **Secrets and variables** -> **Actions** par click karein.
3.  **New repository secret** par click karke ye do secrets add karein:
    *   Name: `WHATSAPP_TOKEN` | Value: (Aapki Developer Key)
    *   Name: `PHONE_NUMBER_ID` | Value: (Aapka Phone ID)

---

### Step 3: Run Kaise Karein? (GitHub Actions)
Bina local system ke code chalane ke liye aap **GitHub Actions** ka use kar sakte hain:

1.  **Actions** tab par jayein aur "set up a workflow yourself" par click karein.
2.  Ye code paste karein:
    
```yaml
    name: Send WhatsApp Msg
    on: [workflow_dispatch] # Button dabane par chalega

    jobs:
      send:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-node@v3
            with:
              node-version: 18
          - run: npm install
          - run: node index.js
            env:
              WHATSAPP_TOKEN: ${{ secrets.WHATSAPP_TOKEN }}
              PHONE_NUMBER_ID: ${{ secrets.PHONE_NUMBER_ID }}
    ```

### Step 4: Execute
Ab jab bhi aapko message bhejni ho, **Actions** tab mein jayein, "Send WhatsApp Msg" workflow select karein aur **"Run workflow"** button par click kar dein.

**Ek zaroori baat:** WhatsApp Business API (Cloud API) mein officially group messages bhejni thodi complex hoti hai kyunki usme direct group ID ki jagah templates ka use hota hai. Kya aapke paas Group ID ready hai?
