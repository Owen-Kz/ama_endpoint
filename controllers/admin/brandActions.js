const db = require("../../routes/db.config")
const isAdmin = require("./isAdmin")

const BrandActions = async (req,res) =>{
    const uid = req.params.uid
    try{
    if(uid){
        const {action, itemID} = req.body
    if(isAdmin(uid)){
        function DoAction(doAction){
            db.query("UPDATE brand_adverts SET ? WHERE item_id =  ?", [{status:doAction}, itemID], async (err, action)=>{
                if(err){
                    return res.json({error:err})
                }else if(action.changedRows > 0){
                    return res.json({success:`item ${doAction} Successful`})
                }
        })
        }
        
        db.query("SELECT * FROM brand_adverts WHERE item_id = ?", [itemID], async(err, data) =>{
            if(err){
                return res.json({error:err})
            }
            if(data[0]){
                if(action === "approve"){
                   DoAction("approved")
                }else if(action === "reject"){
                    DoAction("rejected")
                }else{
                    return res.json({error:"No Valid Action Provided"})
                }
            }
    })
    }else{
    return res.json({error:"Unauthorized for this Action"})
    }
 }else{
    return res.json({error:"Invalid Parameters Provided"})

 }
}catch(error){
    res.json({error:error.message})
}
}


module.exports = BrandActions