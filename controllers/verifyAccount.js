const db = require("../routes/db.config")

const verifyToken = async (req,res) =>{
    try{
        const {token }= req.body
   
        db.query("SELECT * FROM users WHERE remember_token =?",[token], async (err, data) =>{
            if(err){
                return res.json({error:err})
            }
            if(data[0]){
                db.query("UPDATE users SET ? WHERE remember_token = ?", [{status:"verified"}, token], async(err, updated) =>{
                    if(err){
                        return res.json({error:err})
                    }else{
                        return res.json({success:"Email verified Succesfully"})
                    }
                    
                })
                
            }else{
                return res.json({error:"User Not Found"})
            }
        })
    }catch(error){
        return res.json({error:error.message})
    }
}


module.exports = verifyToken