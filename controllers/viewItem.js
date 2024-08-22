const db = require("../routes/db.config")

const viewItem = async (req,res) =>{
    const {       item_id,
        userIp,
        browserAgent,
        sessionId,
        productTitle,
        userId} = req.body
        const maxLength = 20
        let limitedMessage = ""
        if (productTitle.length > maxLength) {
            limitedMessage = productTitle.substring(0, maxLength) + "...";
        }else{
            limitedMessage = productTitle
        }
        db.query("SELECT * FROM listing_views WHERE listings_id =? AND ip = ?", [item_id, userIp], async (err,data)=>{
            if(err){
                res.json({error:err})
            }else if(data[0]){
                res.json({error:"ItemAlreadyViewed"})
            }else{
                db.query("INSERT INTO listing_views SET ?", [{ip:userIp, listings_id:item_id, user_id:userId, agent:browserAgent, titleslug:limitedMessage, session_id:sessionId, url:limitedMessage}], async (err, view) =>{
                    if(err){
                        res.json({error:err})
                    }else{
                        res.json({success:"ItemViewdSuccesfully"})
                    }
                })
            }
        })
}


module.exports = viewItem