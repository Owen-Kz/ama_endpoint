const db = require("../routes/db.config")
const isAdmin = require("./admin/isAdmin")

const sentEmails = async (req,res) =>{
    const {uid} = req.body
    try{
        if(isAdmin(uid)){
    db.query("SELECT * FROM sent_emails WHERE 1 ORDER BY id DESC", async (err, emails) =>{
        if(err) throw err
        return res.json({success:"SentEmails", emailList:emails})
    })
}else{
    return res.json({error:"Invalid Account Patameters"})
}
}catch(error){
    return res.json({error:error})
}
}


module.exports = sentEmails