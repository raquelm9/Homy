const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../config");

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
            <a href="http://localhost:3000/notification/requests/${token}">Click here to see more</a>
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
      // getting access token from google with oauth2 object through getAccessToken method. FYI, the accessToken has expiry of 1 hour
      // That is why it is always needed to get new access token before sending the mail
      const accessToken = await oAuth2Client.getAccessToken();

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

      // Sending the email, transport class has sendMail method for sending the email. It is an async function and return a promise
      // therefore put the await when calling
      const result = await transport.sendMail(mailOptions);
      return result; // Getting return value from transport.sendMail which contains the confirmation and other information
    } catch (error) {
      return error;
    }
  }

  return await sendMail(mailOptions);
};

exports.sendSMSNotification = async (residentPhoneNumber, residentMessage) => {
  const client = require("twilio")(
    config.TWILIO.ACCOUNT_SID,
    config.TWILIO.AUTH_TOKEN
  );

  return await client.messages.create({
    to: residentPhoneNumber,
    from: config.TWILIO.TWILIO_PRIMARY_PHONE_NUMBER,
    body: residentMessage,
  });
};
