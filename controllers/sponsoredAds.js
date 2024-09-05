const db = require("../routes/db.config")

const sponsoredAds = async (req,res) =>{
    try{
        db.query("SELECT * FROM brand_adverts WHERE type = 'sponsored' AND status = 'approved'", (err, data) =>{
            if(err){
                return res.json({error:err})
            }
            if(data){
                return res.json({success:"Sponsored Adverts", sponsored_ads:data})
            }else{
                return res.json({error:"No data Available"})
            }
        })
    }catch(error){
        return res.json({error:error.message})
    }
}


module.exports = sponsoredAds