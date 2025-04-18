const nodemailer = require('nodemailer');
const { mailAuthToken } = require('./tokenAuth');

const sender = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass : process.env.EMAILPASS
    }
});

const generateConfirmationEmail = (username , usermail , confirmationLink) => {
    return {
        from: `"SpendEase" <${process.env.MOCKMAIL}>`,
        to: usermail,
        subject: 'Confirm Your Email for SpendEase',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 30px;">
        <h2 style="color: #333;">Hey ${username},</h2>
        <p style="font-size: 16px; color: #555;">
        Thank you for signing up with <strong>SpendEase</strong>. Please confirm your email address by clicking the button below:
        </p>
        <a href="${confirmationLink}" style="display: inline-block; margin: 20px 0; padding: 12px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
        Confirm Email
        </a>
        <p style="font-size: 14px; color: #999;">
        This link will expire in 10 minutes from creation.
        <br>
        If you did not create this account, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #aaa;">
        &copy; ${new Date().getFullYear()} SpendEase. All rights reserved.
        </p>
        </div>
        </div>
        `
    };
};


const sendMailAuth = async (username , usermail) => {
    const token = await mailAuthToken(username , usermail);
    const confirmationLink = `${process.env.BASE_URL}/api/auth/confirm-mail?token=${token}`;
    const data = generateConfirmationEmail(username , usermail , confirmationLink);
    sender.sendMail(data , (error , info) => {
        if(error) {
            throw error;
        }
    });
}

module.exports = sendMailAuth;