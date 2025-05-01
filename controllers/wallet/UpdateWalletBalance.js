const dbPromise = require("../../routes/dbPromise.config");
const jwt = require("jsonwebtoken")

const updateWalletBalance = async (token, sessionId,amount) =>{
    try{
        // const {token, sessionId, amount} = req.body 
        if(!token && !sessionId){
            return ({error:"Invalid Fields Provided"})
        }
          // Decrypt the cookie and retrieve user data with the id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userID = decoded.id

            // Check if the payment exists 
            const checkPaymentExists = await dbPromise.query("SELECT * FROM wallet_payments WHERE user_id = ? AND session_id = ? AND amount = ?", [userID, sessionId, amount])
            if(checkPaymentExists[0].length > 0){
                // Check payment status 
                // if(checkPaymentExists[0][0].status === "completed"){
                //     return ({error:"This payment has already been processed"})
                // }else{
                    // update the user wallet with the new balance 
                    const updateWallet = await dbPromise.query("UPDATE users SET wallet_balance = wallet_balance +? WHERE id = ?",[amount, userID])
                    if(updateWallet[0].affectedRows > 0){
                        return ({success:"Wallet Funded Successfully"})
                    }else{
                        return ({error:"Could not fund wallet, please contact support for assistance"})
                    }
                // }
            }else{
                return ({error:"This Payment was not successful, contact support for assitance"})
            }

    }catch(error){
        console.log(error)
        return ({error:error.message})
    }
}

module.exports = updateWalletBalance