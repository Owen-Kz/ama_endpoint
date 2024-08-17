const db = require("../routes/db.config")

const countMyListings  =  async (req,res)=>{
    const {userId} = req.body
    let total = 0 
    let pending = 0
    let active = 0 
    let soldout = 0
    if(userId){
  

    // Count Active 
    db.query("SELECT COUNT(*) AS totalActive FROM listings WHERE user_id = ? ", [userId], async (err, data) =>{
        if(err){
            console.log(err)
        }
        if(data[0]){
            total = data[0]["totalActive"];

        }else{
            total = 0
        }

        // Count pending 
        db.query("SELECT COUNT(*) AS totalPending FROM listings WHERE user_id = ? AND status = 'pending'", [userId], async (err, pendingData) =>{
            if(err){
                console.log(err)
            }
            if(pendingData[0]){
            pending= pendingData[0]["totalPending"];
            }else{
                pending = 0
            }
            // Count soldout 
        db.query("SELECT COUNT(*) AS totalSoldout FROM listings WHERE user_id = ? AND status = 'sold/expired'", [userId], async (err, soldoutData) =>{
            if(err){
                console.log(err)
            }
            if(soldoutData[0]){
                soldout = soldoutData[0]["totalSoldout"];

            }else{
                soldout = 0
            }
            // Count soldout 
        db.query("SELECT COUNT(*) AS totalItems FROM listings WHERE user_id = ? AND status = 'approved'", [userId], async (err, activeData) =>{
            if(err){
                console.log(err)
            }
            if(activeData[0]){
            active = activeData[0]["totalItems"];
            }else{
                active = 0
            }

            return res.json({success:"CountItems", totalPending:pending, totalActive:active, totalSoldout:soldout, totalListings:total})
        })
        })

        })

        
    })
}else{
    return res.json({error:"CouldNOtCountITems", totalPending:pending, totalActive:active, totalSoldout:soldout, totalListings:total})

}
}


module.exports = countMyListings