const db = require("../routes/db.config")

const bookMarkItem = async (req,res) =>{
    const {item_id, user_id} = req.body
    if(item_id && user_id){
        try{
            db.query("SELECT * FROM listings WHERE id =? AND status = 'approved'", [item_id], async (err, data)=>{
                if(err){
                    res.json({error:err})
                }else if(data[0]){
                   db.query("SELECT * FROM favorites WHERE user_id = ? AND listing_id = ?", [user_id, item_id], async (err, isBooked)=>{
                    if(err){
                        res.json({error:err})
                    }else if(isBooked[0]){
                        res.json({error:"ItemPreviouslyBookMarked"})
                    }else{
                        db.query("INSERT INTO favorites SET ?", [{user_id:user_id, listing_id:item_id, listing_type:item_id}], async (err, booked) =>{
                            if(err){
                                res.json({error:err})
                            }else{
                                res.json({success:"BookedMarkedSuccesfully"})
                            }
                        })
                    }
                   })
                }else{
                    res.json({error:"ItemNotFoundOnServer"})
                }
            })
        }catch(error){
            res.json({error:error.message})
        }
    }else{
        res.json({error:"InvalidParametersProvided"})
    }
}


module.exports = bookMarkItem