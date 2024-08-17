const db = require("../routes/db.config")

const AllCategories = async (req,res) =>{
    const {email} = req.body
    if(email === "amaslink@gmail.com"){

        db.query("SELECT * FROM categories WHERE 1", async (err,result) =>{
            if(err) return res.json({error:err})
            if(result){
                
                return res.json({success:"CatList", allCategories:result})
            }else{
    
               return res.json({error:"CouldNotGetList"})
            }
        })
    }else{
        res.json({error:"InvalidPatameters"})
    }
}

module.exports  = AllCategories