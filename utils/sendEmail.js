// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// // Create a transporter for SMTP
// const transporter = nodemailer.createTransport({
//   service : "gmail",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

//  const sendEmail = (async (to, subject , text, html  ) => {
//   try {
//     const info = await transporter.sendMail({
//       from,
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("Message sent: %s", info.messageId);
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   } catch (err) {
//     console.error("Error while sending mail", err);
//   }
// })();


// export default sendEmail;

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter using Mailtrap
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "58c23388ffdac5", // Replace with your Mailtrap user
    pass: "f55c72ba7ae82c" // Replace with your Mailtrap password
  }
});

// sendEmail function - Export this for use in your controllers
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: '"My App" <no-reply@myapp.com>', // define a valid sender
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};

export default sendEmail;
