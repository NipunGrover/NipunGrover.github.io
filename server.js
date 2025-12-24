import { Resend } from 'resend';
import { config } from 'dotenv';
import cors from 'cors';
import express from 'express';

config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware must come BEFORE routes
app.use(cors());
app.use(express.json());

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/contact", (req, res) => {
  res.json({ message: "Hello from server!" })
});

app.post('/contact', async (req, res) => {
  console.log("api call made");
  const { name, email, phone, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain later
      to: ['nipunshopping@outlook.com'],
      subject: `New Contact from portfolio website: ${name}`,
      html: `<p>You have a new contact from:</p>
            <ul>
              <li>Name: ${name}</li>
              <li>Email: ${email}</li>
              <li>Phone: ${phone}</li>
              <li>Message: ${message}</li>
            </ul>`,
    });

    if (error) {
      console.log(error);
      return res.status(500).send({ message: "Failed to send email" });
    }

    console.log("Email sent:", data);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});