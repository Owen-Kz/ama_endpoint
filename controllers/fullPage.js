const db = require("../routes/db.config")

const fullPageAd = async (req,res) =>{
    try{
    db.query(`SELECT * FROM full_page_advert WHERE 1`, async (err, data)=>{
        if(err) throw err 
        if(data[0]){
            return res.json({success:"FullPageAd", full_page:data})
        }else{
            return res.json({error:"No Full Page Advert Available"})
        }
    })
    }catch(error){
        return res.json({error:error})
    }
}

module.exports = fullPageAd