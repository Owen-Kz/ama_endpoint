const StripeWEbHooks = async (req,res) =>{
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
  
      // Access payment information
      const paymentIntentId = session.payment_intent;
      const customerId = session.customer;
      const amountTotal = session.amount_total;
  
      console.log('PaymentIntent ID:', paymentIntentId);
      console.log('Customer ID:', customerId);
      console.log('Total Amount:', amountTotal);
  
      // TODO: You can store this information in your database or trigger other actions
    }
  
    res.sendStatus(200);  
}


module.exports = StripeWEbHooks