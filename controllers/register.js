// const WPHash = require('wordpress-hash-node');
const { CheckPassword, HashPassword } = require('wordpress-hash-node');
const db = require('../routes/db.config');
const bcrypt = require("bcryptjs");

const register = async (req,res) =>{
    const { username, firstname, lastname, email, phonenumber, country, password } = req.body;
    const hPassword = await bcrypt.hash(password, 8);

    

    if(username, firstname, email, password){
        db.query('SELECT * FROM users WHERE email = ? OR u_name = ?', [email, username], (err, result) =>{
            if(err){
                throw err
            }
            if(result[0]){
                res.json({error:"User Already Exists"})
            }else {
                db.query('INSERT INTO users SET ?',{
                    u_name:username,
                    email:email,
                    name:firstname,
                    l_name:lastname,
                    phone:phonenumber,
                    country:country, 
                    password:hPassword
                    } , async (err, result) =>{
                    if(err){
                        console.log(err)
                    }

                    if(result){
                        res.json({success:"Account Created Succesfully"})
                    }
                    
                })
            }
        })
    }



}

module.exports = register