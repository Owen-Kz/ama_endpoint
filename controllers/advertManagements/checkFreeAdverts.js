const db = require("../../routes/db.config")

const CheckFreeAdverts = async(req,res) =>{
    const {user_id} = req.body
    try{
        console.log(req.body)
        db.query("SELECT * FROM free_adverts WHERE user_id = ?", [user_id], (err, result) =>{
            if(err){ 
                console.log(err)
                return res.json({error:err})
            }else if(result.length > 3){
                db.query("SELECT * FROM paid_adverts WHERE user_id = ?", [user_id], (err, paid) =>{
                    if(err){
                        console.log(err)
                        return res.json({error:err})
                    }else if(paid.length < result.length){
                        return res.json({error:"You have reached the maximum number of basic adverts you can create, create 3 paid advert to get one more basic advert"})
                    }else if(paid.length > result.length ){
                        return res.json({success:"You can create an advert"})
                    }
    
                })
                // return res.json({error:"You have reached the maximum number of basic adverts you can create"}
            }else if(result.length <= 3){
               return res.json({success:"You can create an advert"})
            }else{
                console.log(result.length)
            }
        })
    }catch(error){
        console.log(error)
        return res.json({error:error.message})
    }
}


module.exports = CheckFreeAdverts