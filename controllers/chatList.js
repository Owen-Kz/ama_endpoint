const db = require("../routes/db.config")

const ChatList = async (req,res)=>{
    const {user} = req.body

    if(user){
        db.query("SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY id DESC",[user,user], async(err, data)=>{
            if(err){
                console.log(err)
               return res.json({errror:err})
            }
            if(data.length >0){
               return res.json({success:"Messages", allChats:data})
            }else{
                return res.json({success:"Messages", allChats:[]})
                
            }
        })
    }else{
        return res.json({errror:"InvalidParameters Provided"})

    }
}


module.exports = ChatList