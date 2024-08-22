const db = require("../routes/db.config")

const announcements = async (req,res) =>{
    const{token} = req.body

    if(token){
        db.query('SELECT * FROM announcements WHERE 1', async (err, data)=>{
            if(err){
                return res.json({error:err})
            }else{
                return res.json({success:"Announcements", announcements:data})
            }
        })
    }else{
        return res.json({error:"INvalidToken"})
    }
}

module.exports = announcements