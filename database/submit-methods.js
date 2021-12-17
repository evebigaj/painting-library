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
  from: 'eve.bigaj@gmail.com',
  to: 'eve.bigaj@gmail.com',
  subject: 'New painting order',
  text: data
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.status(405).send(`could not send email because ${error}`)
  } else {
    console.log('Email sent: ' + info.response);
  }
})

}

module.exports = {sendEmail}