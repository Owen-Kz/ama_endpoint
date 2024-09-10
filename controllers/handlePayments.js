const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_KEY); // Use your secret API key from Stripe

const makePayment = async (req,res) =>{
    const { amount, currency } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // amount is in cents (e.g. $10.00 would be 1000)
        currency: currency,
        payment_method_types: ['card'], // You can add other types if needed
      });
  
     return res.json({success:"Payment IntentSUccesful",
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
     return res.status(500).json({ error: err.message });
    }
}


module.exports = makePayment