require('dotenv').config()
const nodemailer = require('nodemailer')


const sendEmail = (data) => {


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: 'New painting order',
  text: data
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})

}

module.exports = {sendEmail}