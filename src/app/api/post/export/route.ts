import { NextRequest, NextResponse } from "next/server";
import excelJS from "exceljs"

export async function GET(request: NextRequest) {
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
        const data = await workbook.xlsx.writeBuffer({
            filename: "posts.xlsx"
        });
        const headers = new Headers();
        headers.append('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        headers.append('Content-Disposition', 'attachment; filename="posts.xlsx"');

        // Return the response with the workbook buffer
        return new NextResponse(data, { headers });
    } catch (error) {
        return NextResponse.json({
            message: "unable to export post data. please try again",
            success: false
        }, {
            status: 500
        });
    }
}