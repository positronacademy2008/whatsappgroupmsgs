// index.js - WhatsApp Message Sending Script
const axios = require('axios');

// --- CONFIGURATION ---
// Inhe aap GitHub Secrets se connect karenge (Security ke liye)
const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const VERSION = 'v20.0'; // Latest API version

// --- MESSAGE SETTINGS ---
const RECIPIENT_NUMBER = '91XXXXXXXXXX'; // Yahan apna ya group ka number dalein (with country code)
const MESSAGE_BODY = 'Hello! Ye message GitHub Actions ke zariye bheja gaya hai. 🚀';

async function sendMessage() {
    const url = `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`;

    const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: RECIPIENT_NUMBER,
        type: "text",
        text: {
            preview_url: false,
            body: MESSAGE_BODY
        }
    };

    const headers = {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try {
        console.log("Sending message...");
        const response = await axios.post(url, data, { headers });
        console.log("✅ Success! Message ID:", response.data.messages[0].id);
    } catch (error) {
        console.error("❌ Error!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Details:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Message:", error.message);
        }
    }
}

// Function ko call karein
sendMessage();
