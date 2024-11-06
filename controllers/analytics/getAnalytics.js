const db = require("../../routes/db.config")

const getAnalytics = async (req,res) =>{
    try{
        db.query("SELECT * FROm analytics WHERE 1", async(err, data) =>{
            if(err){
                return res.json({error:err})
            }else{
                return res.json({success:"Items", sources:data})
            }
        })
    }catch(error){
        return res.json({error:error})
    }
}

module.exports = getAnalytics