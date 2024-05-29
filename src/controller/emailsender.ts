"use server";

import nodemailer from 'nodemailer';
export const sendEmail = async () => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // you can use any email service
        auth: {
            user: process.env.EMAIL_USER, // your email address
            pass: process.env.EMAIL_PASS, // your email password or application-specific password
        },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: "pradeep@kanhasoft.com", // list of receivers
        subject: 'subject', // Subject line
        text: "message", // plain text body 
        // review code of Queue/worker and postgres with Prisma
        // create demo for job and worker in next js project using instrumentation.ts file
        // implement import excel functionality using Queue/worker
    });
}