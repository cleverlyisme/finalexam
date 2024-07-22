const nodemailer = require("nodemailer");

const environments = require("../utils/environments");

const { APP_EMAIL, APP_PASSWORD } = environments;

const sendEmail = async (to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: APP_EMAIL,
      pass: APP_PASSWORD,
    },
    from: {
      name: "ToEdu App",
      address: "admin@toedu.app",
    },
  });

  const mailOptions = {
    from: {
      name: "ToEdu School",
      address: "admin@toedu.app",
    },
    to,
    subject,
    html: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Coudn't send email: " + error);
    }
    return info.response;
  });
};

module.exports = { sendEmail };
