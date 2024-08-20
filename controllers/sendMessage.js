const db = require("../routes/db.config")

const sendMessage = async (req,res) =>{
    const {roomId, message, recipient, sender} = req.body
    const maxLength = 20
    let limitedMessage = ""
    if (message.length > maxLength) {
        limitedMessage = message.substring(0, maxLength) + "...";
    }else{
        limitedMessage = message
    }
  

    db.query("SELECT * FROM messages WHERE message_id =?",[roomId], async (err, messageResult) =>{
        if(err){
            console.log(err)
            return res.json({error:err})
        }else{
            if(messageResult.length > 0){
                db.query("INSERT INTO messages_replies SET ? ",[
                    {sender_id:sender,
                    message_id:roomId,
                    sender_name:sender,
                    reply:message}], async (err, result)=>{
                    if(err){
                        return res.json({error:err})
                    }else{
                        db.query("UPDATE messages SET ? WHERE message_id = ?", [{
                            slug:limitedMessage
                        }, roomId])
                        return res.json({success:"MessageCreated"})
                    }
                })
            }else{
                db.query("INSERT INTO messages SET ?",[{
                    sender_id:sender,
                    receiver_id:recipient,
                    message_id:roomId,
                    message:message,
                    slug:limitedMessage,
                    sender_email:sender}], async (err, result)=>{
                    if(err){
                        return res.json({error:err})
                    }else{
                        return res.json({success:"MessageCreated"})
                    }
                })
            }
        }
    })
}

module.exports = sendMessage