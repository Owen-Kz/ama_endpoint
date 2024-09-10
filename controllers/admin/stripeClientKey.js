const stripeClientKey  = async (req,res) =>{
    return res.json({k:process.env.STRIPE_PUBLIC_KEY})
}

module.exports = stripeClientKey