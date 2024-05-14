const nodemailer = require("nodemailer");

const environments = require("../utils/environments");

const { APP_EMAIL, APP_PASSWORD, PUBLIC_URL } = environments;

const sendVerifyToken = async (email, token) => {
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

  const link = `${PUBLIC_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: {
      name: "Tomovie App",
      address: "admin@tomovie.app",
    },
    to: email,
    subject: "Verify your email address",
    html: `Click this link to verify your email address:</br><a href="${link}">${link}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Coudn't send email: " + error);
    }
    return info.response;
  });
};

module.exports = { sendVerifyToken };
