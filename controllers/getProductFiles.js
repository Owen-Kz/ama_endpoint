const db = require("../routes/db.config")

const getProductFiles = async (req, res) =>{
    const {id} = req.body
    try{
        
    db.query('SELECT * FROM files WHERE item_id = ?', [id], async (err, files) =>{
        if(err){
         console.log(err)
          return res.json({error:err})
        }
         if(files.length > 0){
            return res.json({success:"productFiles", productFiles:files})

         }else{
            return res.json({success:"productFiles", productFiles:[]})

         }

    })
}catch(error){
    console.log(error.message)
}

}

module.exports = getProductFiles