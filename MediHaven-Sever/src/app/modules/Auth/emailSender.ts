import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"MediHaven" <c223434@ugrad.iiuc.ac.bd>',
    to: email,
    subject: "Reset Password Link",
    html: code,
  });
};

export default emailSender;
