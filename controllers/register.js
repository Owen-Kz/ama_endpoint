// const WPHash = require('wordpress-hash-node');
const { CheckPassword, HashPassword } = require('wordpress-hash-node');
const db = require('../routes/db.config');
const bcrypt = require("bcryptjs");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const { configDotenv } = require('dotenv');
const saveReferral = require('./referrrals/saveReferral');

const client = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API;
async function getRandomString() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var passwordLength = 15;
    var bufferID = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        bufferID += chars.substring(randomNumber, randomNumber + 1);
    }
    return bufferID
}
const register = async (req,res) =>{

    const {to, subject, message, a_id} = req.body
    const currentYear = new Date().getFullYear();
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

try{
    async function SendMain(email, to){
        const response = await apiInstance.sendTransacEmail(email);
    }

    const { username, firstname, lastname, email, phonenumber, country, password, referralCode} = req.body;
    const hPassword = await bcrypt.hash(password, 8);

    const bufferToken = await getRandomString()

    if(username, firstname, email, password){
        db.query('SELECT * FROM users WHERE email = ? OR u_name = ?', [email, username], (err, result) =>{
            if(err){
                throw err
            }
            if(result[0]){
                res.json({error:"User Already Exists"})
            }else {
               function FinalCreateAccount() {
                    db.query('INSERT INTO users SET ?',{
                        u_name:username,
                        email:email,
                        name:firstname,
                        l_name:lastname,
                        phone:phonenumber,
                        country:country, 
                        password:hPassword, 
                        remember_token:bufferToken,
                        } , async (err, result) =>{
                        if(err){
                            console.log(err)
                        }
                        const emailBody = {
                            // to: [{ email: to, name: 'Recipient Name' }],
                            to: [{ email: email, name: username}],
                    
                            sender: { email: 'amaslink@amaslink.com', name: 'Amaslink' },
                            subject: "Amaslink Account Verification",
                            htmlContent: `<html><body>
                            <p>Hello, ${username}</p>
                            <p>
                            
                            Click <a href="${process.env.CurrentDOMAIN}/verify?q=${bufferToken}">Here</a> or paste the link below in you browser to verify your account</p>
                            <p><a href="${process.env.CurrentDOMAIN}/verify?q=${bufferToken}">${process.env.CurrentDOMAIN}/verify?q=${bufferToken}</a>
                            <p>${currentYear} (c) Amaslink.com
                            </body></html>`
                    };
                        if(result){
                            if(referralCode && referralCode !== ""){
                            saveReferral(result.insertId, referralCode)
                            }
                            SendMain(emailBody, email)
                            res.json({success:"Account Created Succesfully"})
                        }
                        
                    })
                }
                // Vaalidate Referal Code 
                if(referralCode && referralCode !== ""){
                    db.query("SELECT referral_code FROM users WHERE referral_code = ?", [referralCode], async (err,code) =>{
                        if(err){
                            console.log(err)
                            return res.json({error:err})
                        }else if(code[0]){
                            FinalCreateAccount()
                        }else{
                            return res.json({error:"Invalid Referral Code Provided"})
                        }
                    })
                }else{
                    FinalCreateAccount()
                }
               
            }
        })
    }

}catch(error){
    return res.json({error:error.message})
}

}

module.exports = register