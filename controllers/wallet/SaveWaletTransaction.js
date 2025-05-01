const dbPromise = require("../../routes/dbPromise.config");
const updateWalletBalance = require("./UpdateWalletBalance");
const jwt = require("jsonwebtoken")
const saveWalletTransaction = async (req,res) =>{
    try{
        const {token, sessionId, amount} = req.body 
        // / Decrypt the cookie and retrieve user data with the id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userID = decoded.id
        // Check if the payment exists 
        const checkPaymentExists = await dbPromise.query("SELECT * FROM wallet_payments WHERE user_id = ? AND session_id = ? AND amount = ?", [userID, sessionId, amount])
        if(checkPaymentExists[0].length > 0){
            if(checkPaymentExists[0][0].status === "completed"){
                // Validate payment with stripe 
                return res.json({success:"payment complete"})
            }else{
                // Validate payment with stripe and update the database 
                const updatePaymentStaatus = await dbPromise.query("UPDATE wallet_payments SET status ='completed' WHERE user_id = ? AND session_id = ? AND amount = ?", [userID, sessionId, amount])
                return res.json({success:"Payment Saved"})
            }
        }else{
             // Validate payment with stripe and save the item
             const updatePaymentStaatus = await dbPromise.query("INSERT INTO wallet_payments SET ?", [{user_id:userID, session_id:sessionId, amount, status:"completed"}])

            //  Update wallet balance 
             const ChangeWalletBalance  = await updateWalletBalance(token, sessionId, amount)

             console.log(ChangeWalletBalance)
             return res.json({success:"Payment Created"})
        }
    }catch(error){
        console.log(error)
        return res.json({error:error.message})
    }
}


module.exports = saveWalletTransaction