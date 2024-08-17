const db = require("../routes/db.config")
const axios = require('axios');

const myBookmarks = async (req,res) =>{
    const {page, user_id} = req.body
    let items_per_page = 20
    const OFFSET  = (page - 1) * items_per_page
    // const offset = (page - 1) * ITEMS_PER_PAGE; 
    let totalPages = 0
    let LimitFile = 0
    db.query("SELECT * FROM favorites WHERE user_id = ?", [user_id], async (err, data) =>{
        if(err){
            console.log(err)
        }
        if(data.length > 0){
            for(let i=0;  i< data.length; i++){
                const listingId = data[i].listing_id
                totalPages = Math.ceil(data.length / items_per_page);
                LimitFile = Math.ceil(data.length / 1)
   
    // db.query("SELECT COUNT(*) AS sumListings FROM listings WHERE status = 'approved' AND id = ?",[listingId], (err, CountResult) => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).send("Internal Server Error");
    //     }
    //     const Count = JSON.stringify(CountResult[0]["sumListings"]);
    //     // totalPages = Math.ceil(Count / items_per_page);
    //     // LimitFile = Math.ceil(Count / 1)


    db.query("SELECT * FROM listings WHERE status = 'approved'AND id =? ORDER BY id DESC LIMIT ? OFFSET ?",[listingId, LimitFile, OFFSET], async (err,result)=>{
        if(err){
            // throw err
            console.log(err)
           return res.json({error:err})
        }

        if(result.length > 0){
      
          
            return res.json({success:"listings", listings:result,  pageCount:page,
                totalCount: totalPages})
        }else{
            return res.json({success:"listings", listings:[],  pageCount:page,
                totalCount: totalPages})
        }
    })
        
    // })
}
}else{
    return res.json({success:"listings", listings:[],  pageCount:page,
        totalCount: totalPages})
}
})
}

module.exports = myBookmarks