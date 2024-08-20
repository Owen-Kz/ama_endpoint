const db = require("../routes/db.config")

const ChatHistory = async (req,res) =>{
    const {roomId} = req.body
    
    db.query("SELECT * FROM messages_replies WHERE message_id =? ", [roomId], async (err, messageResult) =>{
        if(err){
            console.log(err)
            return res.json({error:err})
        }else{
            if(messageResult.length > 0){
                return res.json({success:"chatHistory", messageHistory:messageResult})
            }else{
                return res.json({success:"chatHistory", messageHistory:[]})

            }
        }
    })
}

module.exports = ChatHistory