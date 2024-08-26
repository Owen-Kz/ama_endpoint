const jwt = require("jsonwebtoken");
const db = require("../../routes/db.config")


const createAnnoucements = async (req,res) =>{
    const {topic, description, token} = req.body 

    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        db.query("SELECT * FROM role_users WHERE user_id =?", [decoded.id], async(err, admin) =>{
            if(err){
                return res.json({error:err})
            }else if(admin[0]){
                db.query('INSERT INTO announcements SET ?', [{title:topic, content:description, user_id:decoded.id}], async(err, announce) =>{
                    if(err){
                        return res.json({error:err})
                    }else{
                        return res.json({success:"Announcement Posted Succesfully"})
                    }
                })
            }else{
                return res.json({error:"NotAdmin"})
            }
        })
    }else{
        return res.json({error:"Invalid Parameters provided"})
    }
    
}

module.exports = createAnnoucements