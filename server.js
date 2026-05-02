require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// API endpoint for submitting leads
app.post('/api/submit-lead', async (req, res) => {
    try {
        const { phone } = req.body;
        
        if (!phone) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        
        if (!token || !chatId) {
            console.error('Telegram credentials are not configured in .env');
            return res.status(500).json({ success: false, message: 'Server configuration error' });
        }

        const message = `🔥 Новая заявка с сайта АОК!\n📞 Телефон: ${phone}`;
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        try {
            const response = await axios.post(url, {
                chat_id: chatId,
                text: message,
            });

            if (response.status === 200) {
                res.json({ success: true, message: 'Lead sent successfully' });
            } else {
                console.error('Telegram API returned non-200 status:', response.status);
                res.status(500).json({ success: false, message: 'Error sending to Telegram' });
            }
        } catch (axiosError) {
            console.error('Telegram API error:', axiosError.response ? axiosError.response.data : axiosError.message);
            res.status(500).json({ success: false, message: 'Error sending to Telegram' });
        }
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
