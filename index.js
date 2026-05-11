const axios = require('axios');

// GitHub Actions se data uthayega
const ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const RECIPIENT_NUMBER = process.env.RECIPIENT_NUMBER; // Jo aapne button dabate waqt dala
const MESSAGE_BODY = process.env.MESSAGE_BODY;       // Jo aapne button dabate waqt dala

async function sendMessage() {
    const url = `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`;

    const data = {
        messaging_product: "whatsapp",
        to: RECIPIENT_NUMBER,
        type: "text",
        text: { body: MESSAGE_BODY }
    };

    try {
        const response = await axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
        });
        console.log("✅ Message Sent to:", RECIPIENT_NUMBER);
    } catch (error) {
        console.error("❌ Failed!", error.response ? error.response.data : error.message);
    }
}

sendMessage();
