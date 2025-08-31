// server.js

// 1. Load dependencies
import express from 'express';
import twilio from 'twilio';
import 'dotenv/config';

// 2. Get credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// 3. Initialize Express app and Twilio client
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
const client = twilio(accountSid, authToken);

// 4. Create the API endpoint for sending SMS
app.post('/send-sms', (req, res) => {
  const { to, body } = req.body; // Get recipient and message from the request

  // Basic validation
  if (!to || !body) {
    return res.status(400).json({ success: false, message: 'Recipient number and message body are required.' });
  }

  // 5. Use Twilio to send the message
  client.messages
    .create({
      body: body,
      from: twilioPhoneNumber,
      to: to // Must be a verified number if on a trial account
    })
    .then(message => {
      console.log('SMS sent successfully. SID:', message.sid);
      res.status(200).json({ success: true, message: 'SMS sent successfully!', sid: message.sid });
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
      res.status(500).json({ success: false, message: 'Failed to send SMS.', error: error.message });
    });
});

// 6. Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});