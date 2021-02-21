const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../config");
const saveLog = require('./saveLog');
const { encrypt, decrypt } = require('../helpers/cipher');
const { Token } = require('../models/token.schema');
const { urlShortener } = require('../helpers/urlShortener');


exports.createNotificationObject = (
  residentEmail,
  subject,
  textBody,
  htmlBody,
  token
) => {
  const mailOptions = {
    from: "Homy Administrator<homy.evolveu@gmail.com>",
    to: residentEmail,
    subject: subject,
    text: textBody,
    html: ` <p>${htmlBody}</p>
            <br /> 
            <a href="${config.FRONTEND.URI}/notification/requests/${token}">Click here to see more</a>
            <h4> 'We got you, Homy!!'</h4>
            `,
  };

  return mailOptions;
};

exports.sendEmailNotification = async (mailOptions) => {

  // Creating oauth2 access object from googleapis module class
  const oAuth2Client = new google.auth.OAuth2(
    config.GOOGLE.CLIENT_ID,
    config.GOOGLE.CLIENT_SECRET,
    config.GOOGLE.REDIRECT_URI
  );

  // Setting the refresh token credentials for the oauth2 access object
  oAuth2Client.setCredentials({ refresh_token: config.GOOGLE.REFRESH_TOKEN });


  async function sendMail(mailOptions) {
    try {
      let accessToken = '';
      oAuth2Client.on('tokens', async (tokens) => {
        if (tokens.refresh_token) {
          // store the refresh_token in my database!
          const encrypted = encrypt(tokens.refresh_token)
          const token = new Token({
            iv: encrypted.iv,
            content: encrypted.content
          })

          await token.save();
          console.log('refresh_tokens', tokens.refresh_token);
        }
        if (tokens.access_token) {
          accessToken = tokens.access_token
          // console.log('access token', tokens.access_token)
        }
      });
      // getting access token from google with oauth2 object through getAccessToken method. FYI, the accessToken has expiry of 1 hour
      // That is why it is always needed to get new access token before sending the mail
      if (!accessToken) accessToken = await oAuth2Client.getAccessToken();
      // if (config.ENV.NODE_ENV === 'dev') {

      //   saveLog({ accessToken: accessToken }, 'email')
      // }

      // const lastToken = await Token.findOne().sort({ 'created_at': 1 })
      // console.log('lastToken', lastToken)
      // Creating transport object for sending email using the nodemailer class
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "homy.evolveu@gmail.com",
          clientId: config.GOOGLE.CLIENT_ID,
          clientSecret: config.GOOGLE.CLIENT_SECRET,
          refreshToken: config.GOOGLE.REFRESH_TOKEN,
          accessToken: accessToken,
        },
        // Based on information found on the web, the following line is required to prevent unauthorized error
        tls: { rejectUnauthorized: false },
      });

      // Creating the mail options object to be passed on when sending the mail
      // This is where we create the email itself for the header and body of the email.
      // console.log(config.GOOGLE.CLIENT_ID)
      // console.log(config.GOOGLE.CLIENT_SECRET)
      // console.log(config.GOOGLE.REFRESH_TOKEN)
      // console.log('access token', accessToken.token)
      console.log(mailOptions)
      console.log(transport)
      // Sending the email, transport class has sendMail method for sending the email. It is an async function and return a promise
      // therefore put the await when calling
      const result = await transport.sendMail(mailOptions);
      console.log(result)
      return result; // Getting return value from transport.sendMail which contains the confirmation and other information
    } catch (error) {
      console.log('error', error)
      return error;
    }
  }

  return await sendMail(mailOptions);
};

exports.sendSMSNotification = async (residentPhoneNumber, residentMessage, notificationId) => {
  try {
    const client = require("twilio")(
      config.TWILIO.ACCOUNT_SID,
      config.TWILIO.AUTH_TOKEN);

    // const longUrl = `${config.FRONTEND.URI}/notification/requests/${notificationId}`
    const uri = 'https://adoring-leakey-4abb67.netlify.app'
    const longUrl = `${uri}/notification/requests/${notificationId}`
    const shortUrl = await urlShortener(longUrl);
    console.log(longUrl)
    console.log(shortUrl)
    residentMessage = residentMessage + `
      Click on the link to see this more details
      ${shortUrl}
      'We got you, Homy!!'
  `
    // console.log('shortUrl.shortLink', shortUrl)
    return await client.messages.create({
      to: residentPhoneNumber,
      from: config.TWILIO.PRIMARY_PHONE_NUMBER,
      body: residentMessage,
    });
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }


};
