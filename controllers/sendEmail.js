const { configDotenv } = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const db = require('../routes/db.config');
const isAdmin = require('./admin/isAdmin');
const client = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API;



const  sendEmail = async (req,res) => {
    const {to, subject, message, a_id} = req.body
    const currentYear = new Date().getFullYear();
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

if(isAdmin(a_id)){
try{
    async function SendMain(email, to){
        const response = await apiInstance.sendTransacEmail(email);
    }

    
if(to === "subscribers"){
    db.query("SELECT * FROM newsletters WHERE 1", async (err, subscribers) =>{
        if(err){
            throw err
        }
        if(subscribers[0]){
            subscribers.forEach(async (person) =>{
                email = {
                    // to: [{ email: to, name: 'Recipient Name' }],
                    to: [{ email: person.email, name: person.name}],
            
                    sender: { email: 'amaslink@amaslink.com', name: 'Amaslink' },
                    subject: subject,
                    htmlContent: `<html><body><p>${message}</p>
                    <p>${currentYear} (c) Amaslink.com
                    </body></html>`
            };
            await SendMain(email, to)
            })
        }else{
            return res.json({error:"There are no subscribers"})
        }
    })
}else if(to === "users"){
    db.query("SELECT * FROM users WHERE 1", async(err, users) =>{
        if(err) throw err
        users.forEach(async (person) =>{
            const recipient = person.email.toLowerCase()
                const email = {
                    to: [{ email: recipient, name: person.name}],
                    sender: { email: 'amaslink@amaslink.com', name: 'Amaslink' },
                    subject: subject,
                    htmlContent: `<html><body><p>${message}</p>
                    <p>Please Do Not repply to this email</p>
                    <p>${currentYear} (c) Amaslink.com
                    </body></html>`
            };
           await SendMain(email, to)
        })

   
    })
}else {
    email = {
        to: [{ email: to}],
        sender: { email: 'amaslink@amaslink.com', name: 'Amaslink' },
        subject: subject,
        htmlContent: `<html><body><p>${message}</p>
        <p>${currentYear} (c) Amaslink.com
        </body></html>`
};
}
db.query("INSERT INTO `sent_emails` SET ?", [{recipient:to, subject:subject, body:message}], async (err,data) =>{
    if(err) throw err
    return res.json({success:`Email sent successfully message`})
})
         
     

}catch(error){
    return res.json({error:error})
}
}else{
    return res.json({error:"User Not LoggedIn As Admin"})
}
}

module.exports = sendEmail

