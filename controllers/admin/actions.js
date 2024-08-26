const db = require("../../routes/db.config")
const isAdmin = require("./isAdmin")

const adminActions = async (req,res) =>{
    const uid = req.params.uid
    try{
    if(uid){
        const {action, itemID} = req.body
    if(isAdmin(uid)){
        function DoAction(doAction){
            db.query("UPDATE listings SET ? WHERE id = ?", [{status:doAction}, itemID], async (err, action)=>{
                if(err){
                    return res.json({error:err})
                }else if(action.changedRows > 0){
                    return res.json({success:`item ${doAction} Successful`})
                }
        })
        }
        
        db.query("SELECT * FROM listings WHERE id =?", [itemID], async(err, data) =>{
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


module.exports = adminActions