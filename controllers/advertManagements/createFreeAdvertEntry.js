const db = require("../../routes/db.config")

const CreateFreeAdvertEntry = async(req,res) =>{
    
    try{
        const {user_id, item_id} = req.body
      if(!user_id || !item_id){ return res.json({error:"Please provide all required fields"})}
      
                db.query("INSERT INTO free_adverts (user_id, item_id) VALUES (?, ?)", [user_id, item_id], (err, result) =>{
                    if(err){
                        console.log(err)
                        return res.json({error:err})
                    }else{
                        return res.json({success:"Free advert entry created successfully"})
                    }
                })
    
    }catch(error){
        console.log(error)
        return res.json({error:error.message})
    }
}


module.exports = CreateFreeAdvertEntry