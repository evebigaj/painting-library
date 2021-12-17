require('dotenv').config()
const res = require('express/lib/response');
const nodemailer = require('nodemailer')


const sendEmail = (data, res) => {


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eve.bigaj@gmail.com',
    pass: 'pugunderwear8'
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
    res.status(405).send(`could not send email because ${e}`)
  } else {
    console.log('Email sent: ' + info.response);
  }
})

}

module.exports = {sendEmail}