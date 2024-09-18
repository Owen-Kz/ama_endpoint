const db = require("../routes/db.config");

const updateItem = async (req, res) => {
  try {
    const { uid, itemID,  title, description, thumbnail, imageFiles, videoURL, videoFile, price, category, condition, country, purpose, subCategories } = req.body;

    db.query(
      `UPDATE listings SET ? WHERE id = ?`,
      [{ title, description, country, price, category, image1: thumbnail, user_id: uid, is_recent_item:"yes", condition:condition, purpose:purpose }, itemID],
      async (err, inserted) => {
        if (err) {
          return res.json({ error: err });
        }
  
        else if (inserted.affectedRows > 0) {
          const newID = itemID;

          try {
           db.query("SELECT * FROM files WHERE item_id = ?",[itemID], async(err, data) =>{
            if(err){
                console.log(err)
                // return res.json({error:err})
            }
            else if(data[0]){
                db.query(
                    "UPDATE files SET ? WHERE item_id = ? AND id = ?",
                    [{ file_type: "image_file", file_status: "new_submission", file_url: thumbnail }, newID, data[0].id],
                    (err, imageInsert) => {
                      if (err){
                        console.log(err)
                        // return res.json({error:err})
                      }
                      
                    }
                  );
            }
           })
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
                if(subCategories){
              db.query(
                "INSERT INTO sub_categories SET ?",
                [{ item_id: newID, category_name: subCategories }],
                (err, subs) => {
                  if (err);
                  console.log(err)
                  return res.json({error:err})
                }
              );
            }
            }
            

            // Insert Other Images and files
            // const imagePromises = imageFiles.map((file) =>
            //   new Promise((resolve, reject) => {
            //     db.query(
            //       "INSERT INTO files SET ?",
            //       [{ item_id: newID, file_type: "image_file", file_status: "new_submission", file_url: file }],
            //       (err, imageInsert) => {
            //         if (err) return reject(err);
            //         resolve(imageInsert);
            //       }
            //     );
            //   })
            // );
            // await Promise.all(imagePromises);

            // Insert Video URL
            if (videoURL[0]) {
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
            // if (videoFile) {
            //   await new Promise((resolve, reject) => {
            //     db.query(
            //       "INSERT INTO files SET ?",
            //       [{ item_id: newID, file_type: "video_file", file_status: "new_submission", file_url: videoFile }],
            //       (err, videoInsert) => {
            //         if (err) return reject(err);
            //         resolve(videoInsert);
            //       }
            //     );
            //   });
            // }

            return res.json({ success: "Listing Updated Successfully" , item_id:inserted.insertId});
          } catch (err) {
            console.log("INTERNAL ERROR: ", err)
            return res.json({ error: err });
          }
        }else{
         return res.json({error:"Could Not Update Listing"})
        }
      }
    );
  } catch (error) {
    console.log(error)
    return res.json({ error: error });
  }
};

module.exports = updateItem;
