
import { Job, Queue, Worker } from "bullmq";
import { connection } from "../connection";
import excelJS from "exceljs"
import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import fs from "fs";
export const importPostQueue = new Queue('importPosts', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: 20 * 1000,
        removeOnComplete: true,
        removeOnFail: true,
    }
});

const worker = new Worker('importPosts', async (job: Job) => {
    const requestData = job.data;
    const workbook = new excelJS.Workbook();
    const result = await workbook.xlsx.readFile(`./src/assets/posts/${requestData.importFileName}`);
    let data: Omit<Post, 'id'>[] = [];
    let errorData: (Omit<Post, 'id' | 'user_id'> & { error: string })[] = [];
    result.eachSheet((sheet, id) => {
        sheet.eachRow((row, rowIndex) => {
            if (rowIndex == 1) return;
            let singleRow = {
                title: `${row.getCell('A').value || ''}`,
                body: `${row.getCell('B').value || ''}`,
            }
            const error = validatePostsData(singleRow);
            if (!error) {
                data = [...data, { ...singleRow, user_id: 1 }]
            } else {
                errorData = [...errorData, { ...singleRow, error: error }]
            }
        })
    });
    if (data.length > 0) {
        await prisma.post.createMany({
            data,
            skipDuplicates: true,
        });
    }
    if (errorData.length > 0) {
        await generateErrorExcel(errorData);
    }
}, {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
});

worker.on("completed", async (job) => {
    const requestData = job.data;
    await fs.rm(`./src/assets/posts/${requestData.importFileName}`, (error) => {
        console.log("remove file error", error);
    });
    // revalidateTag('/');
    console.log(`Job completed for ${job.id}`);
});
worker.on("failed", async (job, err) => {
    console.error(`${job?.id} has failed with ${err.message}`);
});
worker.on("stalled", (str) => {
    console.log(`Job stalled: ${str}`);
});

const validatePostsData = (data: Omit<Post, 'id' | 'user_id'>) => {
    let error = ""
    if (!(data?.title?.trim())) {
        error = error + '-Please add title\n'
    }
    if (!(data?.body?.trim())) {
        error = error + '-Please add description\n';
    }
    return error;
}

const generateErrorExcel = async (data: { title: string; body: string; error: string }[]) => {
    const workbook = new excelJS.Workbook();
    const workSheet = workbook.addWorksheet("post");
    workSheet.views = [
        { state: 'frozen', ySplit: 1, }
    ]
    workSheet.columns = [
        { header: 'Title', key: 'title', width: 20 },
        { header: 'Description', key: 'body', width: 20 },
        { header: 'Error', key: 'error', width: 30 },
    ]

    workSheet.addRows(data);
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
        // const data = await workbook.xlsx.writeBuffer();
        const data = await workbook.xlsx.writeFile(`./src/assets/posts/ExcelErrorFiles/${new Date().getTime()}.xlsx`).then(() => {

        });
        return data;
    } catch (error) {
        console.log(error);
    }
}