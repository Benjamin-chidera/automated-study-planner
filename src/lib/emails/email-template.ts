export const emailTemplates = {
  genericEmail: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>{{subject}}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
        }
        .logo { 
          max-width: 200px; 
          height: auto; 
        }
        .content { 
          background: #f9f9f9; 
          padding: 30px; 
          border-radius: 8px; 
          margin-bottom: 20px;
        }
        .cta-button { 
          display: inline-block; 
          background: #007bff; 
          color: white !important; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 4px; 
          margin: 20px 0; 
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #666; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          {{#if logoUrl}}
            <img src="{{logoUrl}}" alt="StudyM8" class="logo">
          {{else}}
            <h1>StudyM8</h1>
          {{/if}}
        </div>
        <div class="content">
          <h2>{{header}}</h2>
          <p>{{body}}</p>
          {{#if ctaText}}
            <a href="{{ctaLink}}" class="cta-button">{{ctaText}}</a>
          {{/if}}
        </div>
        <div class="footer">
          <p>&copy; {{date}} StudyM8. All rights reserved.</p>
          <p>Hello {{fullname}}, thank you for using our service!</p>
        </div>
      </div>
    </body>
    </html>
  `,

  welcomeEmail: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
       <title>{{subject}}</title>
           <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0; 
          padding: 0; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
        }
        .logo { 
          max-width: 200px; 
          height: auto; 
        }
        .content { 
          background: #f9f9f9; 
          padding: 30px; 
          border-radius: 8px; 
          margin-bottom: 20px;
        }
        .cta-button { 
          display: inline-block; 
          background: #007bff; 
          color: white !important; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 4px; 
          margin: 20px 0; 
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #666; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="container">
       <div class="header">
          {{#if logoUrl}}
            <img src="{{logoUrl}}" alt="StudyM8" class="logo">
          {{else}}
            <h1>StudyM8</h1>
          {{/if}}
        </div>
        <div class="content">
          <h2>Hello {{fullname}}, Welcome to StudyM8!</h2>
          <p>{{body}}</p>
         {{#if ctaText}}
            <a href="{{ctaLink}}" class="cta-button">{{ctaText}}</a>
          {{/if}}
        </div>
        <div class="footer">
          <p>&copy; {{date}} StudyM8. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  contactEmail: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>{{subject}}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo {
        max-width: 200px;
        height: auto;
      }
      .content {
        background: #f9f9f9;
        padding: 30px;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .cta-button {
        display: inline-block;
        background: #007bff;
        color: white !important;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 4px;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        color: #666;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        {{#if logoUrl}}
          <img src="{{logoUrl}}" alt="StudyM8" class="logo">
        {{else}}
          <h1>StudyM8</h1>
        {{/if}}
      </div>
      <div class="content">
        <h2>Hey {{fullname}},</h2>
        <p>Thank you for reaching out to StudyM8!</p>
        <p>We've received your message and our team will get back to you as soon as possible. If your message was about a bug, request, or general help, we appreciate your patience and will do our best to assist you.</p>
        {{#if ctaText}}
          <a href="{{ctaLink}}" class="cta-button">{{ctaText}}</a>
        {{/if}}
      </div>
      <div class="footer">
        <p>&copy; {{date}} StudyM8. All rights reserved.</p>
        <p>You're receiving this email because you contacted us via our support or contact form.</p>
      </div>
    </div>
  </body>
  </html>
`,
};
