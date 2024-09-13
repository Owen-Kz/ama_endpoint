const db = require("../routes/db.config")

const getSlideShowAdvert = async (req,res) =>{
    try{
    db.query(`SELECT * FROM brand_adverts WHERE type = 'slideshow_advert' AND status != 'expired'`, async (err, data)=>{
        if(err) throw err 
        if(data[0]){
            return res.json({success:"slideshowAd", slideshow_advert:data})
        }else{
            return res.json({error:"No Full Page Advert Available"})
        }
    })
    }catch(error){
        return res.json({error:error})
    }
}

module.exports = getSlideShowAdvert