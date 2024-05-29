"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";//161
// import { PostFormValidationSchema } from "@/validationShema";
// import * as yup from "yup"
import excelJS from "exceljs"
import { sampleQueue } from "@/redis/workers/sample";
import { importPostQueue } from "@/redis/workers/importPosts";
import fs from "fs";
export const updateOrCreatePost = async (data: Omit<Post, 'id' | 'user_id'>, id: number) => {
    // const schema = yup.object({
    //     name: yup.string().required(),
    //     age: yup.number().required().positive().integer(),
    //     email: yup.string().required().email(),
    //     website: yup.string().required().url().nullable(),
    //     createdOn: yup.date().required().default(() => new Date()),
    // });

    // schema.validate({}, { abortEarly: false }).then(function () {
    //     // Success
    // }).catch(function (err) {
    //     // console.log(err.errors, 'pkkk');

    //     err.inner.forEach((e: any) => {
    //         // console.log(e.message, e.path, 'hello');
    //     });
    // });
    return prisma.post.upsert({
        where: {
            id: id
        },
        update: {
            ...data,
        },
        create: {
            ...data,
            user_id: 1
        }
    }).then(() => {
        revalidateTag("fetchPostData");
        revalidateTag("editPost");
        // revalidatePath(`edit/${id}`);
        return {
            success: true,
            message: `Post ${id ? 'updated' : 'created'} successfully.`
        };
    }).catch(() => {
        return {
            success: false,
            message: `Post is not ${id ? 'updated' : 'created'} please try again.`
        };
    });
}

export const deletePost = async (id: number) => {
    return prisma.post.delete({
        where: {
            id: id
        }
    }).then(() => {
        revalidatePath('/');
        return {
            success: true,
            message: "Post deleted successfully"
        }
    }).catch(() => {
        return {
            success: false,
            message: "Post fail to delete."
        }
    });
}

export const exportPosts = async () => {
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet("post");
    workSheet.views = [
        { state: 'frozen', ySplit: 1, }
    ]
    workSheet.columns = [
        { header: 'Id', key: 'id', width: 20 },
        { header: 'Title', key: 'title', width: 20 },
        { header: 'Description', key: 'body', width: 20 }
    ]

    workSheet.addRows([
        { title: 'JI', body: 'by' }
    ]);
    workSheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'ffffff' }, size: 15, };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '0000' }, // Yellow background
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
    });
    try {
        const data = await workbook.xlsx.writeBuffer();
        // const data = await workbook.xlsx.writeFile("post.xlsx").then(() => {

        // });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const importPosts = async (formData: FormData) => {
    try {
        const file = formData.get("file") as File;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const fileName = `${new Date().getTime()}.xlsx`
        await fs.mkdir('./public/upload', (data) => {
            console.log(data, 'mkdir');

        });
        await fs.writeFile(`./public/upload/${fileName}`, buffer, (data) => {
            console.log(data, 'writefile');
        });

        const workbook = new excelJS.Workbook();
        const result = await workbook.xlsx.load(buffer);
        let data: Omit<Post, 'id'>[] = [];
        result.eachSheet((sheet, id) => {
            sheet.eachRow((row, rowIndex) => {
                if (rowIndex == 1) return;
                data = [...data, {
                    title: `${row.getCell('A').value}`,
                    body: `${row.getCell('B').value}`,
                    user_id: 1
                }]
            })
        });
        await prisma.post.createMany({
            data,
            skipDuplicates: true,
        });
        revalidatePath('/');
        return {
            success: true,
            message: "Posts imported successfully."
        }
    } catch (error) {
        return {
            success: false,
            message: "Posts failed import please try again later."
        }
    }
}

export const importPostUsingQueue = async (formData: FormData) => {
    try {
        const file = formData.get("file") as File;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const fileName = `${new Date().getTime()}.xlsx`
        await fs.mkdir('./public/upload', (data) => {
            console.log(data, 'mkdir');

        });
        await fs.writeFile(`./src/assets/posts/${fileName}`, buffer, (data) => {
            console.log(data, 'writefile');
        });
        const response = await importPostQueue.add(`${new Date().getTime()}`, { importFileName: fileName });
        return {
            success: true,
            message: "File uploaded successfully. will send you mail after the upload completes."
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed upload File. please try again later."
        }
    }


}


export const addQueue = async () => {
    const data = {
        // any serializable data you want to provide for the job
        // for this example, we'll provide a message
        message: 'This is a sample job'
    }
    const response = await sampleQueue.add('someJob', data);
    console.log(response, 'data')

}