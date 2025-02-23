//  Import necessary modules
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//  Define sendEmail function
export const sendEmail = (emailsIds, subject, html, text) => {
  let output = "";

  emailsIds.forEach((email, i) => {
    if (i == 0) {
      output += email;
    } else {
      output += ", ";
      output += email;
    }
  });

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailDetails = {
    from: process.env.EMAIL_ID,
    to: emailsIds,
    subject: subject,
  };

  if (html) {
    mailDetails.html = html;
  }

  if (text) {
    mailDetails.text = text;
  }

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Unable to send email ", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

export const sendFollowUpEmail = async (customerEmail, subject, content) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailDetails = {
      from: process.env.EMAIL_ID,
      to: customerEmail,
      subject: subject,
      html: content,
    };

    await mailTransporter.sendMail(mailDetails);
    console.log("Follow-up email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending follow-up email:", error);
    return false;
  }
};
