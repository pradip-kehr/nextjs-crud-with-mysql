"use server";

import nodemailer from 'nodemailer';
// import handlebars from 'handlebars';
// import prisma from '@/lib/prisma';
import fs from "fs";
import { renderAsync } from '@react-email/render';
import ImportComplete from "@/components/emailTemplate/ImportComplete";
import { Email } from "./email"
export const sendEmail = async ({ fileName, totalRecords, processedRecords, errorRecords, errorFileName, toEmail }: { fileName: string, totalRecords: number, processedRecords: number, errorRecords: number, errorFileName?: string, toEmail?: string }) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // you can use any email service
        auth: {
            user: process.env.EMAIL_USER, // your email address
            pass: process.env.EMAIL_PASS, // your email password or application-specific password
        },
    });
    // const templateData = await prisma.emailTemplates.findFirst({
    //     where: {
    //         name: 'importCompeted'
    //     }
    // });
    // const template = handlebars.compile(`${templateData?.content || ''}`);
    // const htmlToSend = template({ fileName, totalRecords, processedRecords, errorRecords });
    const htmlToSend = await renderAsync(ImportComplete({ totalRecords, errorRecords, newCreatedRecords: 0, processedRecords, fileName }), {

    });
    const errorFile = errorFileName ? fs.readFileSync(`./src/assets/posts/ExcelErrorFiles/${errorFileName}`) : false
    await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: toEmail || "pradeep@kanhasoft.com", // list of receivers
        subject: `Your import "${fileName}" is ready`, // Subject line
        html: htmlToSend,
        attachments: errorFile ? [
            {
                filename: "RecordsWithError.xlsx",
                content: errorFile
            }
        ] : []
    });
}

export const send = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // you can use any email service
        auth: {
            user: process.env.EMAIL_USER, // your email address
            pass: process.env.EMAIL_PASS, // your email password or application-specific password
        },
    });



    const emailHtml = await renderAsync(Email({ url: '' }), {

    });
    const options = {
        to: 'pradeep@kanhasoft.com',
        subject: 'hello world',
        html: emailHtml,
    };

    transporter.sendMail(options, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}