const db = require("../../routes/db.config")

const getReferrals = async (req,res) =>{
    const {referralID} = req.body
    try{
    db.query("SELECT * FROM referrals WHERE referral_id = ?", [referralID], async (Err, data)=>{
        if(Err){
            return res.json({error:Err})
        }else{
            return res.json({referrals:data, success:"Referrals List"})
        }
    })
    }catch(error){
        console.log(error)
        return res.json({error:error})
    }
}

module.exports = getReferrals