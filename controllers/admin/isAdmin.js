const db = require("../../routes/db.config")

const isAdmin = async(uid) =>{
    db.query("SELECT * FROM role_user WHERE user_id = ?",[uid], async(err, data) =>{
        if(err){
            console.log(err)
            return false
        }else if(data[0]){
            return true
        }
    })

    
}

module.exports  = isAdmin