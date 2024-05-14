import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ContextType = {
    params: {
        id: string;
    }
}

export const GET = async (request: NextRequest, context: ContextType) => {
    const post = await prisma.post.findFirst({
        where: {
            id: parseInt(context?.params?.id)
        }
    });

    return NextResponse.json(post);
}

export const PUT = async (request: NextRequest, context: ContextType) => {
    const data = await request.json();
    const response = await prisma.post.update({
        where: {
            id: parseInt(context?.params?.id)
        },
        data: {
            ...data,
        }
    });

    return NextResponse.json({
        message: "Post updated successfully.",
    }, {
        status: 200
    });
}


