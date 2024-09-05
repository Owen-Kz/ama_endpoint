
const db = require("../../routes/db.config")
const isAdmin = require("./isAdmin")

const BrandAds = async (req,res) =>{
    const {page, uid} = req.body
    const items_per_page = 20
    const OFFSET  = (page - 1) * items_per_page
    // const offset = (page - 1) * ITEMS_PER_PAGE; 
    let totalPages = 0
    if(isAdmin(uid)){
    db.query("SELECT COUNT(*) AS sumbrand_adverts FROM brand_adverts WHERE 1", [uid], (err, CountResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }

        const Count = JSON.stringify(CountResult[0]["sumbrand_adverts"]);
        totalPages = Math.ceil(Count / items_per_page);
    })
  
    db.query('SELECT * FROM brand_adverts WHERE 1 ORDER BY id DESC LIMIT ? OFFSET ?',[items_per_page, OFFSET], async (err,result)=>{
        if(err){
            // throw err
           return res.json({error:err})
        }
        if(result.length > 0){
     
            return res.json({success:"brand_adverts", BrandAds:result,  pageCount:page,
                totalCount: totalPages})
        }else{
            return res.json({success:"brand_adverts", BrandAds:[],  pageCount:page,
                totalCount: totalPages})
        }
        
    })
}
    else{
        // console.log(uid)
return res.json({error:"Unauhtorized Access"})
    }
}

module.exports = BrandAds