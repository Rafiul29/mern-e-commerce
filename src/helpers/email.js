const nodemailer=require('nodemailer');
const { smtpUserName, smtpPassword } = require('../secret');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});


const emailWithNodeMail=async(emailData)=>{
   try{
    
    const mailOptions = {
      from: smtpUserName, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html:emailData.html, // html 
    }
    console.log("first")
    const info = await transporter.sendMail(mailOptions)

   }catch(error){
    console.log("Error occurred while sending email")
    throw error
   }
}


module.exports=emailWithNodeMail


