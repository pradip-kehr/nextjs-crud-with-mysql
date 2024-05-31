"use server";

import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
export const sendEmail = async () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // you can use any email service
        auth: {
            user: process.env.EMAIL_USER, // your email address
            pass: process.env.EMAIL_PASS, // your email password or application-specific password
        },
    });

    const template = handlebars.compile(`htmlTemplate`);
    const htmlToSend = template({ fileName: 'a' });
    await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: "pradeep@kanhasoft.com", // list of receivers
        subject: 'subject', // Subject line
        html: htmlToSend
    });
}