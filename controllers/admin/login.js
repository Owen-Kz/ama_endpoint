const db = require("../../routes/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { CheckPassword, HashPassword } = require('wordpress-hash-node');

const login_admin = async (req, res) => {

    const { user, pass } = req.body;

    if(!user|| !pass) return res.json({ status: "error", error: "Please fill all fields"});

    else{ 
 
    try{
       db.query('SELECT * FROM users WHERE (u_name = ? OR email =?) ', [user, user], async (Err, result) => {
            if(Err) throw Err
            if(!result[0]) return res.json({ status: "error", error: "Incorrect username / password combination"})

            else{
                const isMatch = CheckPassword(pass, result[0].password);
                const isMatchBCrypt = await bcrypt.compare(pass, result[0].password )

                if(isMatch || isMatchBCrypt){  
                    const currentId = result[0].id             
                    db.query("SELECT * FROM role_users WHERE user_id = ? AND role_id = 1", [currentId], async(err, admin) =>{
                        if(err){
                            return res.json({status: "error", error:err})
                        }else if(admin[0]){

                   

                // create cookie token
                const token = jwt.sign({id: result[0].id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                    // httpOnly: true
                })
                // create cookie expiry date 
                const cookieOptions = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                // save cookie 
             
                res.cookie("_ama", token, cookieOptions)
                res.cookie("_superID",result[0].id, cookieOptions)
                return res.json({ status: "success", success: "User Logged in", userToken: token, userId:result[0].id});
            }else{
                return res.json({ status: "error", error: "Unauthorized Access"})
            }
        })
            }else{
                return res.json({ status: "error", error: "Incorrect username / password combination"})
            }
            }
        })
} catch (error) {
  throw new Error('Error executing query: ' + error.message);
}
    }

}

module.exports = login_admin;
