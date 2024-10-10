const db = require("../routes/db.config")

const forums = async (req,res) =>{
    const{token} = req.body

    if(token){
        db.query('SELECT * FROM forums WHERE 1 ORDER BY id DESC', async (err, data)=>{
            if(err){
                return res.json({error:err})
            }else{
                return res.json({success:"forums", forums:data})
            }
        })
    }else{
        return res.json({error:"INvalidToken"})
    }
}

module.exports = forums