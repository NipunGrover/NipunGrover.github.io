import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import cors from 'cors';
import express from 'express';


config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware must come BEFORE routes
app.use(cors());
app.use(express.json());

app.get("/contact", (req, res) => {
  res.json({ message: "Hello from server!" })
});

const transporter = nodemailer.createTransport({
  service: 'outlook',
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000, // 10 seconds to connect
  greetingTimeout: 10000,   // 10 seconds for greeting
  socketTimeout: 30000,     // 30 seconds for socket
  logger: true,             // Enable logging
  debug: true,              // Enable debug output
});

app.post('/contact', async (req, res) => {
  console.log("api call made");
  const { name, email, phone, message } = req.body;
  const mailOptions = {
    from: {
      name: "Portolio Contact",
      address: process.env.EMAIL_USER,
    },
    to: "nipunshopping@outlook.com",
    subject: `New Contact email from portolio website from: ${name}`,
    text: "hello world",
    html: `<p>You have a new contact from:</p>
            <ul>
              <li>Name: ${name}</li>
              <li>Email: ${email}</li>
              <li>Phone: ${phone}</li>
              <li>Message: ${message}</li>
            </ul>`,

  };

  //const sendMail = async (transporter, mailOptions) =>
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to send email" });
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//sendMail(transporter, mailOptions);