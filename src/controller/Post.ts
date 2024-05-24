"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";//161
// import { PostFormValidationSchema } from "@/validationShema";
// import * as yup from "yup"
import excelJS from "exceljs"
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
        revalidateTag("fetchPostData");
        // revalidatePath('/');
        return {
            success: true,
            message: "Post deleted successfully"
        }
    }).catch(() => {
        return {
            success: false,
            message: "Post deleted successfully"
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