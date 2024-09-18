const db = require("../../routes/db.config")
const isAdmin = require("./isAdmin")

const FullPageActions = async (req,res) =>{
    const uid = req.params.uid
    try{
    if(uid){
        const {action, itemID} = req.body
    if(isAdmin(uid)){
        function DoAction(doAction){
            db.query("UPDATE full_page_advert  SET ? WHERE id =  ?", [{status:doAction}, itemID], async (err, action)=>{
                if(err){
                    return res.json({error:err})
                }else if(action.changedRows > 0){
                    return res.json({success:`item ${doAction} Successful`})
                }
        })
        }
        
        db.query("SELECT * FROM full_page_advert WHERE id = ?", [itemID], async(err, data) =>{
            if(err){
                return res.json({error:err})
            }
            if(data[0]){
                
                if(action === "approved"){
                   DoAction("active")
                }else if(action === "reject"){
                    DoAction("rejected")
                }else if(action === "delete"){
                    db.query("DELETE FROM full_page_advert WHERE id =?", [itemID], async (err, deleted) =>{
                        if(err){
                            return res.json({error:err})
                        }else if(deleted.affectedRows > 0){
                            res.json({success:"Advert Deleted Successfully"})
                        }

                    })
                }
                else{
                    return res.json({error:`No Valid Action Provided ${action}`})
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


module.exports = FullPageActions