const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51LKNirLXlD5FhXLS5GEUG5kr4VjxkOmo1qVXop2lB5sZQv1KIs976ECOguIlP0HtblGgVx98IxL7t8dPvBjmy5vv00eOLfcB86");

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (req, res) => {
    return res.status(200).send({ 'Message': 'HELLO WORLD' })
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total
    console.log('Payment Request Received', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // in subunits of the currency (cents)
        currency: 'usd'
    })

    return res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

// Listen command
exports.api = functions.https.onRequest(app)

// Example Endpoint
// http://localhost:5001/clone-c04a7/us-central1/api
