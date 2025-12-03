import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,   // your gmail
        pass: process.env.EMAIL_PASS,   // app password
      },
    });

    const mailOptions = {
      from: `"Demo System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent:", info.messageId);

    return { success: true };
  } catch (error) {
    console.error("Email Send Error:", error);
    return { success: false, error };
  }
}
