const db = require("../../routes/db.config")

const verifyCode = async (req,res) =>{
    try{
        const {email, token} = req.body
        db.query("SELECT * FROM users WHERE email = ? AND resetToken = ?", [email, token], async (err,data)=>{
            if(err){
               return res.json({error:error.message})
            }
            if(data[0]){

                return res.json({success:"Code Verified", sessionCode:token})
            }else{
                return res.json({error:"Invalid Token Provided"})
            }
        })
    }catch(error){
        return res.json({error:error.message})
    }
}

module.exports = verifyCode