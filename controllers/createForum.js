const db = require("../routes/db.config")

const createForum = async (req,res) =>{
    try{
    const{topic, userId, username} = req.body
    const maxLength = 20
    let limitedTopic = ""
    if (topic.length > maxLength) {
        limitedTopic = topic.substring(0, maxLength) + "...";
    }else{
        limitedTopic = topic
    }
    if(topic && userId){
        db.query('SELECT * FROM forums WHERE topic = ?',[topic], async (err, data)=>{
            if(err){
                return res.json({error:err})
            }else{
                if(data[0]){
                return res.json({error:"Forum Already Exists"})
                }else{
                    db.query("INSERT INTO forums SET ?", [{topic:topic, user_id: userId, user_name:username, forum_name:topic, slug:limitedTopic}], async(err, create)=>{
                        if(err){
                           return res.json({error:err})
                        }else{
                            return res.json({success:"Forum Created Succesfully"})
                        }
                    })
                }


            }
        }) 
    }else{
        return res.json({error:"InvalidToken"})
    }
}catch(error){
    return res.json({error:error.message})
}
}

module.exports = createForum