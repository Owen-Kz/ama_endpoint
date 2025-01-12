const db = require("../../routes/db.config")
const SendEmailTemplate = require("../utils/emailTemplate")
const isAdmin = require("./isAdmin")

const adminActions = async (req,res) =>{
    const uid = req.params.uid
    const currentYear = new Date().getFullYear();

    try{
    if(uid){
        const {action, itemID} = req.body
    if(isAdmin(uid)){
        function DoAction(doAction){
        
            db.query("UPDATE listings SET ? WHERE id = ?", [{status:doAction}, itemID], async (err, action)=>{
                if(err){
                    return res.json({error:err})
                }else if(action.changedRows > 0){
                    db.query("SELECT * FROM listings WHERE id = ?", [itemID], async (er, data) =>{
                        if(er){
                            return res.json({error:er})
                        }else{
                            const user = data[0].user_id 
                            console.log(user)
                            fetch(`https://yanis.amaslink.com/y/sellerInfo/`, {
                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json",
                                },
                                body:JSON.stringify({id:user})

                            }).then(res=> res.json())
                            .then(async dataUser =>{
                                if(dataUser.error){
                                    console.log(dataUser.error)
                                }else{
                                    const UserEmail = dataUser.user.email 
                                    const username = dataUser.user.u_name
                                    const email = {
                                        // to: [{ email: to, name: 'Recipient Name' }],
                                        to: [{ email: UserEmail, name: username}],
                                 
                                        sender: { email: 'amaslink@amaslink.com', name: 'Amaslink' },
                                        subject: "Amaslink Listings",
                                        htmlContent: `<html><body>
                                        <p>Hellow, ${username},</p>
                                        <p><h4>Your Advert with has been ${doAction}</h4></p>
                                        <p>Login to your <a href='https://amaslink.com/login'>dashboard</a></p>
                                        <p>${currentYear} (c) Amaslink.com
                                        </body></html>`
                                };
                                   await SendEmailTemplate(email)
                                }
                            })
                        }
                    })
                    return res.json({success:`item ${doAction} Successful`})
                }
        })
        }
        
        db.query("SELECT * FROM listings WHERE id =?", [itemID], async(err, data) =>{
            if(err){
                return res.json({error:err})
            }
            if(data[0]){
                if(action === "approve"){
                   DoAction("approved")
                }else if(action === "reject"){
                    DoAction("rejected")
                }else{
                    return res.json({error:"No Valid Action Provided"})
                }
            }
    })
    }else{
    return res.json({error:"Unauthorized for this Action"})
    }
 }else{
    return res.json({error:"Invalid Parameters Provided"})

 }
}catch(error){
    res.json({error:error.message})
}
}


module.exports = adminActions