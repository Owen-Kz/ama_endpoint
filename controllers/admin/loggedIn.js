
const jwt = require("jsonwebtoken");
const db = require("../../routes/db.config");

const AdminLoggedIn = (req, res, next) => {
    const {token} = req.body
  if (!token) {
    // Redirect to home if user is not logged in
    return res.json({error:"UserNotAdminLoggedIn"})
  }

  try {
    // Decrypt the cookie and retrieve user data with the id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    db.query("SELECT * FROM role_user WHERE user_id = ? ", [decoded.id], (err, admin) => {
      if (err) {
        console.log(err);
        return res.json({error:"Could Not Get data"}) // Redirect to home on error
      } else if(admin[0]){
      db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (err, result) =>{
      
          if (err) {
            console.log(err);
            return res.json({error:"Could Not Get data"}) // Redirect to home on error
          }
          else if(result[0]){
            return res.json({success:"IsAdminLoggedIn", user:result[0]});

          }else{
        return res.json({error:"Could Not get data"})
            
          }
        
      })

      }else{
        return res.json({error:"UserNotAdministrator"})
      }
    //   next();
    });
  } catch (error) {
    console.log(error);
    return res.json({error:"Internal Server Error"})
  }
};

module.exports = AdminLoggedIn;
