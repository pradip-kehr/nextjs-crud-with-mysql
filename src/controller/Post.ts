"use server";

import prisma from "@/lib/prisma";
import { PostFormValidationSchema } from "@/validationShema";
import { revalidatePath } from "next/cache";//161
import * as yup from "yup"
export const updateOrCreatePost = async (data: Omit<Post, 'id'>, id: number) => {
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
        }
    }).then(() => {
        revalidatePath(`edit/${id}`);
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
            message: "Post deleted successfully"
        }
    });
}