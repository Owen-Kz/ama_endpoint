const { configDotenv } = require('dotenv');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const db = require('../routes/db.config');
const isAdmin = require('./admin/isAdmin');
const client = SibApiV3Sdk.ApiClient.instance;
const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

// Configure API key authorization
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API;

const sendEmail = async (req, res) => {
    const { to, subject, message, a_id } = req.body;
    const currentYear = new Date().getFullYear();
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    console.log("Admin Check:", await isAdmin(a_id));

    if (await isAdmin(a_id)) {
        try {
            async function SendMain(email) {
                const response = await apiInstance.sendTransacEmail(email);
                console.log("Brevo Response:", response);
            }

            // Ensure message is properly passed and handle Quill Delta
            let deltaOps = message ? (message.ops || JSON.parse(message)) : [];
            const converter = new QuillDeltaToHtmlConverter(deltaOps, {});
            const messageHtml = deltaOps.length > 0 ? converter.convert() : message || 'No message content.';

            // Log final converted HTML
            console.log("Converted HTML:", messageHtml);

            // Email sending logic
            if (to === "subscribers") {
                console.log("Sending to subscribers");
                db.query("SELECT * FROM newsletters", async (err, subscribers) => {
                    if (err) throw err;
                    if (subscribers.length) {
                        for (const person of subscribers) {
                            const email = {
                                to: [{ email: person.email, name: person.name }],
                                sender: { email: 'amaslink@amaslink.com', name: 'Amaslink' },
                                subject,
                                htmlContent: `<html><body>${messageHtml}
                                              <p>${currentYear} (c) Amaslink.com</p></body></html>`
                            };
                            await SendMain(email);
                        }
                    } else {
                        return res.json({ error: "There are no subscribers" });
                    }
                });
            } else if (to === "users") {
                db.query("SELECT * FROM users", async (err, users) => {
                    if (err) throw err;
                    for (const person of users) {
                        const email = {
                            to: [{ email: person.email.toLowerCase(), name: person.name }],
                            sender: { email: 'amaslink@amaslink.com', name: 'Amaslink' },
                            subject,
                            htmlContent: `<html>
                            <head>
                            <link rel="stylesheet" href="https://amaslink.com/css/general.css">
                            </head>
                            <body>
                            <style>
                            .logoContainer{
                            display:flex;
                            align-items:center;
                            height:100px;
                            background-color:white;
                            border-bottom-left-radius:25px;
                            border-bottom-right-radius:25px;
                            }

                            img{
                            object-fit:contain;
                            }
                            </style>
                            <div class='logoContainer' style='display:flex;
                            align-items:center;
                            height:100px;
                            background:white !important;
                            background-color:white !important;
                            border-bottom-left-radius:25px;
                            border-bottom-right-radius:25px;'>
                           <a href='https://amaslink.com'> <img src ='https://amaslink.com/plugins/images/logo.png' alt='_amaslink_classified'/></a>
                           </div>
                            ${messageHtml}
                                          <p>Please Do Not reply to this email</p>
                                          <p>${currentYear} (c) Amaslink.com</p></body></html>`
                        };
                        await SendMain(email);
                    }
                });
            } else {
                const email = {
                    to: [{ email: to }],
                    sender: { email: 'amaslink@amaslink.com', name: 'Amaslink' },
                    subject,
                    htmlContent: `<html><body>${messageHtml}
                                  <p>${currentYear} (c) Amaslink.com</p></body></html>`
                };
                await SendMain(email);
            }

            // Log sent email into the database
            db.query("INSERT INTO `sent_emails` SET ?", [{ recipient: to, subject, body: messageHtml }], (err, data) => {
                if (err) throw err;
                return res.json({ success: "Email sent successfully" });
            });

        } catch (error) {
            console.log("Error sending email:", error);
            return res.json({ error: error.message });
        }
    } else {
        return res.json({ error: "User Not LoggedIn As Admin" });
    }
};

module.exports = sendEmail;
