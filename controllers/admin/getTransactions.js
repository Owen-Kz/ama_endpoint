const db = require("../../routes/db.config")
const isAdmin = require("./isAdmin")

const getTransactions = async (req,res) =>{
    const {uid, token} = req.body 
    try{
        if(uid){
        if(isAdmin(uid)){
            db.query("SELECT * FROM payments WHERE 1 ORDER BY id DESC", (err, data) =>{
                if(err) throw err 
                if(data){
                    return res.json({success:"Transactions", transactions:data})
                }
            })
        }else{
            return res.json({error:"Unauthorized User"})
        }
    }else{
        return res.json({error:"Invalid Parameters"})
    }
    }catch(error){
        return res.json({error:error})
    }

}

module.exports = getTransactions