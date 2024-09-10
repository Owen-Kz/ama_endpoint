
const Stripe = require('stripe');
const db = require('../../routes/db.config');


const stripe = Stripe(process.env.STRIPE_API_KEY); // Replace with your Stripe Secret Key


const endpointSecret = process.env.WEBHOOK_SECRET; // You get this from your Stripe dashboard

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
      const customerDetails  = session.customer_details
      const Status = session.status 
      const paymentStatus = session.payment_status 
      const Currency = session.currency

      const customerEmail = customerDetails.email 
      const customerName = customerDetails.name
      // console.log(customerName, customerEmail, paymentStatus, Status, Currency)

      // Access payment information
      const paymentIntentId = session.payment_intent;
      const customerId = session.customer;
      const amountTotal = session.amount_total;
  
      // console.log('PaymentIntent ID:', paymentIntentId);
      // console.log('Customer ID:', customerId);
      // console.log('Total Amount:', amountTotal);
  
      // TODO: You can store this information in your database or trigger other actions
      db.query("SELECT * FROM payments WHERE payment_id = ?", [paymentIntentId], async (err,data) =>{
        if(err) {
          console.log(err)
          return res.json({error:err})
        }
        if(data.affectedRows > 0){
          console.log("Payment Already Exists")
          return res.json({error:`Payment ${paymentIntentId} Already Exists`})
        }else{
          db.query("INSERT INTO payments SET ?", [{payment_id:paymentIntentId, payer_id:customerEmail, payer_email:customerEmail, amount:amountTotal, payment_status:paymentStatus, currency:Currency }], async (err,payment) =>{
            if(err){
              console.log(err)
              return res.json({error:err})
            }
            // return res.json({success:"Payment Confirmed"})
          })
        }
      })
    }
  
    res.sendStatus(200);  
}


module.exports = StripeWEbHooks