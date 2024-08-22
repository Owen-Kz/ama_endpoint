const { json } = require("body-parser")
const db = require("../routes/db.config")

const soldOut = async (req,res) =>{
    const {itemId, userId} = req.body 
    if(itemId && userId){
        db.query("SELECT * FROM listings WHERE user_id = ? AND id = ? ", [userId, itemId], async (err, data)=>{
            if(err) {
                res.json({error:err})
            }else if(data[0]){
                db.query("UPDATE listings SET ? WHERE id =? ", [{status:"sold/expired"}, itemId], async (err, update) =>{
                    if(err){
                        res.json({error:err})
                    }
                    else{
                        res.json({success:"SoldOutSuccesfully"})
                    }
            })
            }else{
                res.json({error:"Item Does Not Exist or is Already  sold out"})
            }
        })
    }else{
        res.json({error:"InvalidParametersProvided"})
    }
}

module.exports = soldOut