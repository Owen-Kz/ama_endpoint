const db = require("../../routes/db.config")

const saveReferral = async (userId, referral_id) =>{
    try{
    db.query("SELECT *  FROM referrals WHERE referred_user = ? AND referral_id =?", [userId, referral_id], async (Err, data)=>{
        if(Err){
            console.log(Err)
        }else if(data[0]){
            console.log("User has Already been referred")
        }else{
            db.query("INSERT INTO referrals SET ?", [{referred_user:userId, referral_id:referral_id}], async (err, data) =>{
                if(err){
                    console.log(err)
                }else{
                    console.log(data)
                }
            })
        }
    })
}catch(error){
    console.log(error)
}
}

module.exports = saveReferral