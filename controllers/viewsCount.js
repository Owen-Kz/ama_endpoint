const db = require("../routes/db.config")

const viewsCount = async (req,res) =>{
    const {itemId} = req.body
    if(itemId){
        db.query("SELECT COUNT(*) AS viewsCount FROM listing_views WHERE listings_id = ?", [itemId], async (err, data)=>{
            if(err){
                res.json({error:err})
            }else{
                res.json({success:"ListingCount", count:data[0]["viewsCount"]})
            }
        })
    }else{
        res.json({error:'invalidParameter'})
    }

}


module.exports = viewsCount