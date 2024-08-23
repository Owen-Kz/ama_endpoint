const db = require("../routes/db.config")

const CreateComment = async (req,res) =>{
    const {topicId, comment, user_id, username} = req.body 
  

    if(user_id){
        try{
        // db.query('SELECT * FROM forum_comments WHERE topic_id =?', [forumID],  async (err, data)=>{
        //     if(err){
        //         return res.json({error:err})
        //     }else{
        //         return res.json({success:"comments", comments:data})
        //     }
        // })
        db.query(`INSERT INTO forum_comments SET ?`, {topic_id:topicId, comment:comment, commenter_id:user_id, commenter_name: username}, async (err, data)=>{
            if(err){
                return res.json({error:err})
            }else{
                return res.json({success:"CommentCretedSuccesfully"})
            }
        })
    }catch(error){
        return res.json({error:error.message})
    }
    
    }else{
        return res.json({error:"INvalidToken"})
    }

}
module.exports = CreateComment