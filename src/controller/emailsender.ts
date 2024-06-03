"use server";

import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import prisma from '@/lib/prisma';
import fs from "fs";
export const sendEmail = async ({ fileName, totalRecords, processedRecords, errorRecords, errorFileName, toEmail }: { fileName: string, totalRecords: number, processedRecords: number, errorRecords: number, errorFileName?: string, toEmail?: string }) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // you can use any email service
        auth: {
            user: process.env.EMAIL_USER, // your email address
            pass: process.env.EMAIL_PASS, // your email password or application-specific password
        },
    });
    const templateData = await prisma.emailTemplates.findFirst({
        where: {
            name: 'importCompeted'
        }
    });
    const template = handlebars.compile(`${templateData?.content}`);
    const htmlToSend = template({ fileName, totalRecords, processedRecords, errorRecords });

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