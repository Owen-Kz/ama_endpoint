const db = require("../../routes/db.config")

const countAdminListings  =  async (req,res)=>{
    const {userId} = req.body
    let total = 0 
    let awatingApproval = 0
    let active = 0 
    let totalUsers = 0
    if(userId){
  

    // Count Active 
    db.query("SELECT COUNT(*) AS totalActive FROM listings WHERE status != 'sold/expired'", [userId], async (err, data) =>{
        if(err){
            console.log(err)
        }
        if(data[0]){
            total = data[0]["totalActive"];

        }else{
            total = 0
        }

        // Count awatingApproval 
        db.query("SELECT COUNT(*) AS totalPending FROM listings WHERE status = 'pending'", [userId], async (err, pendingData) =>{
            if(err){
                console.log(err)
            }
            if(pendingData[0]){
            awatingApproval= pendingData[0]["totalPending"];
            }else{
                awatingApproval = 0
            }
            // Count totalUsers 
        db.query("SELECT COUNT(*) AS totalUsers FROM users WHERE 1", [userId], async (err, totalUsersData) =>{
            if(err){
                console.log(err)
            }
            if(totalUsersData[0]){
                totalUsers = totalUsersData[0]["totalUsers"];

            }else{
                totalUsers = 0
            }
            // Count totalUsers 
        db.query("SELECT COUNT(*) AS totalItems FROM listings WHERE status = 'approved'", [userId], async (err, activeData) =>{
            if(err){
                console.log(err)
            }
            if(activeData[0]){
            active = activeData[0]["totalItems"];
            }else{
                active = 0
            }

            return res.json({success:"CountItems", totalawatingApproval:awatingApproval, totalActive:active, totalUsers:totalUsers, totalListings:total})
        })
        })

        })

        
    })
}else{
    return res.json({error:"CouldNOtCountITems", totalawatingApproval:awatingApproval, totalActive:active, totalUsers:totalUsers, totalListings:total})

}
}


module.exports = countAdminListings