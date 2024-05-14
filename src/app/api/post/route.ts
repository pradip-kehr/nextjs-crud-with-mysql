import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const data = await prisma.post.findMany({
    orderBy: {
      created_at: 'desc'
    }
  });
  return NextResponse.json({
    message: "Data fetched successfully",
    data: data
  }, {
    status: 200
  });
}