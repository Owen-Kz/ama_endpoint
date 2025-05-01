const dbPromise = require("../../routes/dbPromise.config");
const jwt = require("jsonwebtoken")

const chargeWalletBalance = async (req,res) =>{
    try{
        const {token, sessionId, amount} = req.body 
        if(!token && !sessionId){
            return res.json({error:"Invalid Fields Provided"})
        }

          // Decrypt the cookie and retrieve user data with the id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userID = decoded.id

            // Check if the payment exists 
            const checkPaymentExists = await dbPromise.query("SELECT * FROM wallet_payments WHERE user_id = ? AND session_id = ? AND amount = ?", [userID, sessionId, amount])
            if(checkPaymentExists[0].length > 0){
                // Check payment status 
                if(checkPaymentExists[0][0].status === "completed"){

                    return res.json({error:"This payment has already been processed"})
                }else{
                    
                    // update the user wallet with the new balance 
                    const chargeWallet = await dbPromise.query("UPDATE users SET wallet_balance = wallet_balance -? WHERE id = ?",[amount, userID])
                    if(chargeWallet[0].affectedRows > 0){
                        const CreateNewWalletENtry = await dbPromise.query("INSERT INTO wallet_payments SET ?", [{user_id:userID, session_id:sessionId, amount:amount, status:"completed"}])
                        return res.json({success:"Wallet Chargeed Successfully"})
                    }else{
                        console.log("could not process")
                        return res.json({error:"Could not Charge wallet, please contact support for assistance"})
                    }
                }
            }else{
                       // update the user wallet with the new balance 
                       const chargeWallet = await dbPromise.query("UPDATE users SET wallet_balance = wallet_balance -? WHERE id = ?",[amount, userID])
                       if(chargeWallet[0].affectedRows > 0){
                           const CreateNewWalletENtry = await dbPromise.query("INSERT INTO wallet_payments SET ?", [{user_id:userID, session_id:sessionId, amount:amount, status:"completed"}])
                           return res.json({success:"Wallet Chargeed Successfully"})
                       }else{
                           console.log("could not process")
                           return res.json({error:"Could not Charge wallet, please contact support for assistance"})
                       }
        
            }

    }catch(error){
        console.log(error)
        return res.json({error:error.message})
    }
}

module.exports = chargeWalletBalance