const { config } = require("dotenv")
const db = require("../../routes/db.config")
const dbPromise = require("../../routes/dbPromise.config")
const jwt = require("jsonwebtoken")
config()

const createPaidAdvertEntry = async(req,res) =>{
    
    try{
        const {token, item_id, amount} = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user_id =  decoded.id
        
      if(user_id && item_id && amount){
                db.query("INSERT INTO paid_adverts (user_id, item_id, amount) VALUES (?, ?, ?)", [user_id, item_id, amount], async (err, result) =>{
                    if(err){
                        console.log(err)
                        return res.json({error:err})
                    }else{
                        // Check if was reffered 
                        const isReferred = await dbPromise.query("SELECT * FROM referrals WHERE referred_user = ? AND status = 'pending'",[user_id])
                        
                        
                        if(isReferred[0].length > 0){
                            const referralId = isReferred[0][0].referral_id
                            // Update the referral status and pay bonus to referrer 
                            const updateReferralStatus = await dbPromise.query("UPDATE referrals SET ? WHERE ?", [{status:"completed", bonus:0.03}, user_id])
                            const updateReferrerBalance = await dbPromise.query("UPDATE users SET referral_bonus = referral_bonus +? AND wallet_balance = wallet_balance +? WHERE referral_code =?",[0.03, referralId])
                        }
                        return res.json({success:"Paid advert entry created successfully"})
                    }
                })
            }else{
                return res.json({error:"Please provide all required fields"})
            }
    }catch(error){
        console.log(error)
        return res.json({error:error.message})
    }
}


module.exports = createPaidAdvertEntry