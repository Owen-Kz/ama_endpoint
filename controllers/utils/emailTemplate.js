const { configDotenv } = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const client = SibApiV3Sdk.ApiClient.instance;


async function SendEmailTemplate(email){
    try{

// Configure API key authorization
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API;


    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const response = await apiInstance.sendTransacEmail(email);
    console.log(response)
    }catch(error){
        res.json({error:error.message})
    }
}


module.exports = SendEmailTemplate