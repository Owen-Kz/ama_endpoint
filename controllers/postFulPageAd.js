const db = require("../routes/db.config");

const PostFullPageADvert = async (req, res) => {
  try {
    const { uid, thumbnail, advert_type, advert_duration} = req.body;
    async function GenerateRandomCode(){
        return Math.floor(100000 + Math.random() * 900000);
    }
 
db.query("SELECT * FROM full_page_advert WHERE status = 'active'", async (err,data) =>{
if(err){
    return res.json({error:err})
}
if(data[0]){
    return res.json({error:"An Advert Already exists, try again later"});
}else{


    db.query(
      `INSERT INTO full_page_advert SET ?`,
      [{expiry_date:advert_duration, user_id: uid, file_url:thumbnail}],

      async (err, inserted) => {
        if (err) {
            console.log(err)
          return res.json({ error: err });
        }
  
        if (inserted) {

          try {
     
            return res.json({ success: "Listing Uploaded Successfully", item_id:inserted.insertId});
          } catch (err) {
            console.log("INTERNAL ERROR: ", err)
            return res.json({ error: err });
          }
        }else{
         return res.json({error:"Could Not Create Listing"})
        }
      }
    );
}
})
  } catch (error) {
    console.log(error)
    return res.json({ error: error });
  }
};

module.exports = PostFullPageADvert;
