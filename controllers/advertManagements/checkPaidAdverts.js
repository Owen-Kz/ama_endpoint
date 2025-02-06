// const db = require("../../routes/db.config")

// const CheckPaidAdverts = async(req,res) =>{
//     const {user_id} = req.body
//     try{
//         db.query("SELECT * FROM paid_adverts WHERE user_id = ? AND", [user_id], (err, result) =>{
//             if(err){
//                 console.log(err)
//                 return false
//             }else if(result.length >= 3){
//                return {success:"You can create a Paid advert"}
//             }
//         })
//     }catch(error){
//         console.log(error)
//         return {error:error.message}
//     }
// }


// module.exports = CheckPaidAdverts