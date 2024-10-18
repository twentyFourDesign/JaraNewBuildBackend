const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, templateName, replacements) => {
  const templatePath = path.join(
    __dirname,
    "../templates",
    `${templateName}.html`
  );
  const source = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(source);
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: `"Jara Beach Resort" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlToSend,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail };
