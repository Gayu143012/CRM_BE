import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailId,
    pass: config.emailPass,
  },
});

export const sendEmail = async (to, subject, html, text) => {
  try {
    await transporter.sendMail({
      from: `"StarWars CRM" <${config.emailId}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      text,
    });

    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};