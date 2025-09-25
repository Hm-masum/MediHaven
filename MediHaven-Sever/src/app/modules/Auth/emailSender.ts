import nodemailer from "nodemailer";

const emailSender = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "c223434@ugrad.iiuc.ac.bd",
      pass: "fjwd upem lbwz dalh",
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

  console.log("message sent");
};

export default emailSender;
