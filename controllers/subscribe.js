const db = require("../routes/db.config")

const subscrbe = async (req,res) =>{
    const {name, email} = req.body 
    try{
        db.query("SELECT * FROM newsletters WHERE email = ?", [email], (err, data)=>{
            if(err){
                return res.json({error:err})
            }
            if(data[0]){
                return res.json({error:"You are already subscribed to our news letter"})
            }else{
                db.query("INSERT INTO newsletters SET ?", [{name:name, email:email}], (err, inserted) =>{
                    if(err){
                        return res.json({error:err})
                    }else{
                        return res.json({success:"Newsletter subscription successful"})
                    }
                })
            }
        })
    }catch(error){
        return res.json({error:error.message})
    }
}

module.exports = subscrbe