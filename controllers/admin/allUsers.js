const db = require("../../routes/db.config")
const isAdmin = require("./isAdmin")

const allUsers = async (req,res) =>{
    try{
        const {uid} = req.body 
        if(isAdmin(uid)){
            db.query("SELECT * FROM users WHERE 1", async (err, data) =>{
                if(err){
                    return res.json({error:err})
                }else if(data){
                    return res.json({success:"UsersList", users:data})
                }
            })
        }else{
            return res.json({error:"Unatuthorized Access"})
    }
    }catch(error){
        return res.json({error:error})
    }
}


module.exports = allUsers