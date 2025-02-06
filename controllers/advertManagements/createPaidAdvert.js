const db = require("../../routes/db.config")

const createPaidAdvertEntry = async(req,res) =>{
    
    try{
        const {user_id, item_id, amount} = req.body
      if(user_id && item_id && amount){
                db.query("INSERT INTO paid_adverts (user_id, item_id, amount) VALUES (?, ?, ?)", [user_id, item_id, amount], (err, result) =>{
                    if(err){
                        console.log(err)
                        return res.json({error:err})
                    }else{
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