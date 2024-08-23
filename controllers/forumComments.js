const db = require("../routes/db.config")

const comments = async (req,res) =>{
    const{token, forumID} = req.body

    if(token){
        try{
        db.query('SELECT * FROM forum_comments WHERE topic_id =?', [forumID],  async (err, data)=>{
            if(err){
                return res.json({error:err})
            }else{
                return res.json({success:"comments", comments:data})
            }
        })
    }catch(error){
        return res.json({error:error.message})

    }
    
    }else{
        return res.json({error:"INvalidToken"})
    }

}
module.exports = comments