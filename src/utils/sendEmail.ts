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

// import nodemailer from "nodemailer";
// import fs from "fs/promises";
// import path from "path";
// import Handlebars from "handlebars";

// interface EmailOptions {
//   to: string;
//   subject: string;
//   template?: string;
//   context?: Record<string, unknown>;
//   text?: string;
// }

// const sendEmail = async ({
//   to,
//   subject,
//   template,
//   context,
//   text,
// }: EmailOptions): Promise<void> => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//       },
//     });

//     let html = "";
//     if (template) {
//       // Load template from public/emailTemplates
//       const templatePath = path.join(process.cwd(), "public", "emailTemplates", template);
//       console.log("Template path:", templatePath); // Debug log
//       const templateSource = await fs.readFile(templatePath, "utf-8");
//       const compiledTemplate = Handlebars.compile(templateSource);
//       html = compiledTemplate(context || {});
//     }

//     const mailOptions = {
//       from: `"STUDYMATE" <${process.env.GMAIL_USER}>`,
//       to,
//       subject,
//       text: text || "Please view this email in an HTML-compatible client.",
//       html,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent successfully to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };

// export default sendEmail;

import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { emailTemplates } from "@/lib/emails/email-template";

interface EmailOptions {
  to: string;
  subject: string;
  template?: keyof typeof emailTemplates;
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
    if (template && emailTemplates[template]) {
      const compiledTemplate = Handlebars.compile(emailTemplates[template]);
      html = compiledTemplate(context || {});
    } else if (template) {
      console.warn(`Template "${template}" not found, using default`);
      html = getDefaultTemplate(subject, context);
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

const getDefaultTemplate = (
  subject: string,
  context: Record<string, unknown> = {}
) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h2>${context.header || subject}</h2>
          <p>${context.body || "Thank you for using StudyMate!"}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default sendEmail;
