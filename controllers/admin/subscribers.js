
const db = require("../../routes/db.config")
const isAdmin = require("./isAdmin")

const subscribers = async (req,res) =>{
    try{
    const {page, uid} = req.body
    const items_per_page = 20
    const OFFSET  = (page - 1) * items_per_page
    
    // const offset = (page - 1) * ITEMS_PER_PAGE; 
    let totalPages = 0
    if(isAdmin(uid)){
    db.query("SELECT COUNT(*) AS sumsubscribers FROM newsletters WHERE 1", (err, CountResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }

        const Count = JSON.stringify(CountResult[0]["sumsubscribers"]);
        totalPages = Math.ceil(Count / items_per_page);
    })
  
    db.query('SELECT * FROM newsletters WHERE 1 ORDER BY id DESC LIMIT ? OFFSET ?',[items_per_page, OFFSET], async (err,result)=>{
        if(err){
            // throw err
           return res.json({error:err})
        }
        if(result.length > 0){
     
            return res.json({success:"subscribers", subscribers:result,  pageCount:page,
                totalCount: totalPages})
        }else{
            return res.json({success:"subscribers", subscribers:[],  pageCount:page,
                totalCount: totalPages})
        }
        
    })
}
    else{
        // console.log(uid)
return res.json({error:"Unauhtorized Access"})
    }
}catch(error){
    return res.json({error:error.message})
}
}

module.exports = subscribers