const db = require("../../routes/db.config")

const SaveAnalytics = async (req,res) =>{
    const {source} = req.body 
    try{
        // Check if the Item exists 
        db.query("SELECT * FROM analytics WHERE source = ?", [source], async (err, data) =>{
            if(err){
                return res.json({error:err})
            }else {
                if(data[0]){
                    const currentImpressions = data[0].impressions 
                    const newImpressionsValue = new Number(currentImpressions) + 1

                    console.log("INMPRESSIONS", newImpressionsValue)
                    db.query("UPDATE analytics SET impressions = ? WHERE source = ?", [newImpressionsValue, source], async (err, update) =>{
                        if(err){
                            return res.json({error:err})
                        }else{
                            console.log(update)
                            return res.json({success:"Analytics Created"})
                        }
                    })
                }else{
                    // Create Impression if not exists 
                    db.query("INSERT INTO analytics SET ?", [{source:source}], async (err, inserted) =>{
                        if(err){
                            return res.json({error:err})
                        }else{
                            console.log(inserted)
                            return res.json({success:"Analytics Created"})
                        }
                    })
                }
            }
        })

    }catch(error){
        res.json({error:error})
    }
    
}


module.exports = SaveAnalytics