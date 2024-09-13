const db = require("../routes/db.config")

const staticAd = async (req,res) =>{
    try{
    db.query(`SELECT * FROM brand_adverts WHERE type = 'static_advert' AND status != 'expired'`, async (err, data)=>{
        if(err) throw err 
        if(data[0]){
            return res.json({success:"staticAd", static_advert:data[0]})
        }else{
            return res.json({error:"No Full Page Advert Available"})
        }
    })
    }catch(error){
        return res.json({error:error})
    }
}

module.exports = staticAd