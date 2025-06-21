// import nodemailer from "nodemailer";

// interface EmailOptions {
//   to: string;
//   subject: string;
//   text?: string;
//   html?: string;
// }

// const sendEmail = async ({
//   to,
//   subject,
//   text,
//   html,
// }: EmailOptions): Promise<void> => {
//   try {
//     // Create a transporter using Gmail SMTP
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//       },
//     });

//     // Define email options
//     const mailOptions = {
//       from: `"ASP" <${process.env.GMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent successfully to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };

// export default sendEmail;

import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";

interface EmailOptions {
  to: string;
  subject: string;
  template?: string;
  context?: Record<string, unknown>;
  text?: string;
}

const sendEmail = async ({
  to,
  subject,
  template,
  context,
  text,
}: EmailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    let html = "";
    if (template) {
      const templatePath = path.join(process.cwd(), "emailTemplates", template);
      console.log("Template path:", templatePath); // Debug log
      const templateSource = await fs.readFile(templatePath, "utf-8");
      const compiledTemplate = Handlebars.compile(templateSource);
      html = compiledTemplate(context || {});
    }

    const mailOptions = {
      from: `"STUDYMATE" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: text || "Please view this email in an HTML-compatible client.",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;