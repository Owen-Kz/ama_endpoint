const db = require("../routes/db.config")

const getProductInfo  = async (req,res) =>{
    const {id} = req.params
    if(id){
    db.query('SELECT * FROM listings WHERE id = ?', [id], async (err, result)=>{
        if(err) return res.json({error:err})
        if(result[0]){
           return res.json({success:"productDetails", productDetails:result[0]})
        }else{
           return res.json({error:"CouldNotFetch", message:"Could Not Find Matching Product"})
        }
    })
    }else{
       return res.json({error:"Invalid Parameters Provided", message:"Invalid Parameters Provided"})
    }
}

module.exports = getProductInfo