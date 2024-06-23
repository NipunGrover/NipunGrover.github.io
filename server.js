import nodemailer from 'nodemailer';
import {config} from 'dotenv';


config();

const transporter = nodemailer.createTransport({
  service: 'outlook',
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: {
    name: "Portolio Contact",
    address: process.env.EMAIL_USER,
  },
  to: "nipunshopping@outlook.com",
  subject: "New Contact email from portolio website",
  text: "hello world",
  html: "<b>Hello world?</b>",
  
}

const sendMail = async (transporter, mailOptions) => {
  try{
    await transporter.sendMail(mailOptions); 
  } catch(error)
  {
    console.log(error);
  }

}

sendMail(transporter, mailOptions);