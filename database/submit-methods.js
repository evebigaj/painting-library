const nodemailer = require('nodemailer')

const sendEmail = (data) => {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'evebigaj@gmail.com',
    pass: 'pugunderwear8'
  }
});

var mailOptions = {
  from: 'evebigaj@gmail.com',
  to: 'evebigaj@gmail.com',
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