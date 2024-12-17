const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Define WhatsApp webhook verification
app.get('/webhook', (req, res) => {
    // Webhook verification challenge
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    const VERIFY_TOKEN = 'your_verify_token'; // Replace with your own verification token
    console.log('tested its coming');
    // Verify token and respond with challenge
    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge); // Respond to Facebook's verification request
    } else {
        res.status(403).send('Forbidden');
    }
});

// Handle incoming messages via POST
app.post('/webhook', (req, res) => {
    const incomingMessage = req.body;

    console.log("Received message: ", incomingMessage);

    // Check for the "messages" field, which contains the incoming messages
    if (incomingMessage.object) {
        incomingMessage.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                if (event.message) {
                    const senderId = event.sender.id;
                    const message = event.message.text; // Text of the incoming message
                    
                    console.log(`Message received from ${senderId}: ${message}`);

                    // You can add logic here to respond back or process the message
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.status(404).send('No event received');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
