const db = require("../../routes/db.config")

const isAdmin = async(uid) =>{
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM role_user WHERE user_id = ?",[uid], (err, data) => {
          if (err) {
            console.log(err);
            reject(false); // Reject the promise with the error
          } else {
            resolve(true); // Resolve the promise with the first row of the result
          }
        });
      });
    
}

module.exports  = isAdmin