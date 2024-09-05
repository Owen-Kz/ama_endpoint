const db = require("../../routes/db.config")


const getBrandInfo  = async (req,res) =>{
    const {id} = req.params

    if(id){
    db.query('SELECT * FROM brand_adverts WHERE item_id = ?', [id], async (err, result)=>{
        if(err) return res.json({error:err})
        if(result[0]){
         // Find the Sub Category of profucts 
         let SubCategories = ""
         let AllFiles = ""

        // db.query('SELECT * FROM sub_categories WHERE item_id =?',[id], async (err, categories) =>{
        //     if(err) return res.json({error:err})
        //     if(categories.length > 0){
        //        SubCategories = categories
        //     }else{
        //        SubCategories = []
        //     }
        //        // find All Product files 
      
         // let SubCategories = ""
         db.query('SELECT * FROM files WHERE item_id = ?', [id], async (err, files) =>{
        if(err){
         console.log(err)
          return res.json({error:err})
        }
         if(files.length > 0){
            AllFiles = files
         }else{
            AllFiles = []
         }

         return res.json({success:"productDetails", productDetails:result[0], productFiles:AllFiles})
         })

        //  })

      
         
          
        }else{
           return res.json({error:"CouldNotFetch", message:"Could Not Find Matching Product"})
        }
    })
    }else{
       return res.json({error:"Invalid Parameters Provided", message:"Invalid Parameters Provided"})
    }
}

module.exports = getBrandInfo