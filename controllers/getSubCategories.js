    const db = require("../routes/db.config")

    const AllSubCategories = async (req,res) =>{
        const {email} = req.body
        if(email === "amaslink@gmail.com"){
    
            db.query("SELECT DISTINCT(category_name) FROM sub_categories ORDER BY category_name", async (err,result) =>{
                if(err) return res.json({error:err})
                if(result){
                    
                    return res.json({success:"CatList", allSubCategories:result})
                }else{
        
                   return res.json({error:"CouldNotGetList"})
                }
            })
        }else{
            res.json({error:"InvalidPatameters"})
        }
    }
    
    module.exports  = AllSubCategories