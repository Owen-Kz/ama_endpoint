const { json } = require("body-parser")
const db = require("../routes/db.config")

const DeleteItem = async (req,res) =>{
    const {itemId, userId} = req.body 
    if(itemId && userId){
        try{
        db.query("SELECT * FROM listings WHERE user_id = ? AND id = ? ", [userId, itemId], async (err, data)=>{
            if(err) {
                res.json({error:err})
            }else if(data[0]){
                db.query("DELETE FROM listings WHERE id =? ", [itemId], async (err, update) =>{
                    if(err){
                        res.json({error:err})
                    }
                    else{
                        res.json({success:"DeleteItemSuccesfully"})
                    } 
            })
            }else{
                res.json({error:"Item Does Not Exist or is Already  sold out"})
            }
        })
    }catch(error){
        console.log(error)
        res.json({error:error})
    }
    }else{
        res.json({error:"InvalidParametersProvided"})
    }
}

module.exports = DeleteItem