const db = require("../routes/db.config");

const PostBrandAdvert = async (req, res) => {
  try {
    const { uid, title, description, thumbnail, imageFiles, videoURL, videoFile, category, country, subCategories, url, advert_type, advert_duration} = req.body;
    async function GenerateRandomCode(){
        return Math.floor(100000 + Math.random() * 900000);
    }

    const item_id = await GenerateRandomCode()
    let expiryDate = ""
    if(advert_type == '*3_months'){
        console.log("3 months")
    }else if(advert_type == '*6_months'){
        console.log("6 months")
    }else{
        console.log(advert_type)
    }
    db.query(
      `INSERT INTO brand_adverts SET ?`,
      [{ title, description, country, category, url, type:advert_type, item_id, expiry_date:advert_duration, user_id: uid}],


      async (err, inserted) => {
        if (err) {
          return res.json({ error: err });
        }
  
        if (inserted) {
          const newID = item_id;

          try {
            db.query(
              "INSERT INTO files SET ?",
              [{ item_id: newID, file_type: "image_file", file_status: "new_submission", file_url: thumbnail }],
              (err, imageInsert) => {
                if (err){
                  console.log(err)
                  return res.json({error:err})
                }
                
              }
            );
            // Insert SubCategories
       
            if (Array.isArray(subCategories) && subCategories.length > 1) {
              const subCategoryPromises = subCategories.map((subCat) =>
                new Promise((resolve, reject) => {
                  db.query(
                    "INSERT INTO sub_categories SET ?",
                    [{ item_id: newID, category_name: subCat }],
                    (err, subs) => {
                      if (err) return reject(err);
                      resolve(subs);
                    }
                  );
                })
              );
              await Promise.all(subCategoryPromises);
            } else {
              db.query(
                "INSERT INTO sub_categories SET ?",
                [{ item_id: newID, category_name: subCategories }],
                (err, subs) => {
                  if (err) return res.json({ error: err });
                  console.log("Category Created");
                }
              );
            }
            

            // Insert Other Images and files
            const imagePromises = imageFiles.map((file) =>
              new Promise((resolve, reject) => {
                db.query(
                  "INSERT INTO files SET ?",
                  [{ item_id: newID, file_type: "image_file", file_status: "new_submission", file_url: file }],
                  (err, imageInsert) => {
                    if (err) return reject(err);
                    resolve(imageInsert);
                  }
                );
              })
            );
            await Promise.all(imagePromises);

            // Insert Video URL
            if (videoURL) {
              await new Promise((resolve, reject) => {
                db.query(
                  "INSERT INTO files SET ?",
                  [{ item_id: newID, file_type: "video_url", file_status: "new_submission", file_url: videoURL }],
                  (err, videoURLInsert) => {
                    if (err) return reject(err);
                    resolve(videoURLInsert);
                  }
                );
              });
            }

            // Insert Video File
            if (videoFile) {
              await new Promise((resolve, reject) => {
                db.query(
                  "INSERT INTO files SET ?",
                  [{ item_id: newID, file_type: "video_file", file_status: "new_submission", file_url: videoFile }],
                  (err, videoInsert) => {
                    if (err) return reject(err);
                    resolve(videoInsert);
                  }
                );
              });
            }

            return res.json({ success: "Listing Uploaded Successfully" , item_id:inserted.insertId});
          } catch (err) {
            console.log("INTERNAL ERROR: ", err)
            return res.json({ error: err });
          }
        }else{
         return res.json({error:"Could Not Create Listing"})
        }
      }
    );
  } catch (error) {
    console.log(error)
    return res.json({ error: error });
  }
};

module.exports = PostBrandAdvert;
