import config from '../config';
import transporter from '../config/nodemailer';

type Email = {
  to: string;
  subject: string;
  text: string;
};

export const sendEmail = async ({ to, subject, text }: Email) => {
  try {
    const info = await transporter.sendMail({
      from: config.SMTP_USER,
      to,
      subject,
      text,
    });
    console.log('Email sent successfully', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
