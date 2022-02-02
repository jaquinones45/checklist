import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Workbook } from "exceljs";

const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
    providedIn: "root",
})
export class ExcelService {
    constructor() {}

    // public exportAsExcelFile(json: any[], excelFileName: string): void {
    //     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {
    //         cellStyles: true,
    //     });

    //     worksheet["A1"].s = {
    //         // set the style for target cell
    //         font: {
    //             name: "宋体",
    //             sz: 24,
    //             bold: true,
    //             color: { rgb: "FFFFAA00" },
    //         },
    //     };
    //     console.log(worksheet);

    //     const workbook: XLSX.WorkBook = {
    //         Sheets: { data: worksheet },
    //         SheetNames: ["data"],
    //     };
    //     const excelBuffer: any = XLSX.write(workbook, {
    //         bookType: "xlsx",
    //         type: "array",
    //         cellStyles: true,
    //     });
    //     // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    //     this.saveAsExcelFile(excelBuffer, excelFileName);
    // }

    // private saveAsExcelFile(buffer: any, fileName: string): void {
    //     const data: Blob = new Blob([buffer], {
    //         type: EXCEL_TYPE,
    //     });
    //     FileSaver.saveAs(
    //         data,
    //         fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    //     );
    // }

    public exportAsExcelFile(
        json: any[],
        excelFileName: string,
        title: string,
        dateReport: string
    ): void {
        let headers = [];
        let data = json;
        json.forEach((element) => {
            Object.keys(element).map((c) => {
                if (!headers.includes(c)) headers.push(c.toString());
            });
        });

        const workbook = new Workbook();
        workbook.creator = "EPM";
        workbook.created = new Date();
        workbook.modified = new Date();
        workbook.lastModifiedBy = "EPM";
        const worksheet = workbook.addWorksheet(excelFileName);

        //add Hearders Row
        worksheet.addRow([]);
        worksheet.mergeCells("A1:" + this.numToAlpha(headers.length - 1) + "1");
        worksheet.getCell("A1").value = title;
        worksheet.getCell("A1").alignment = {
            horizontal: "center",
            vertical: "middle",
        };
        worksheet.getCell("A1").font = { size: 13, bold: true };
        //add Hearders Row
        worksheet.addRow([]);
        worksheet.mergeCells("A2:" + this.numToAlpha(headers.length - 1) + "2");
        worksheet.getCell("A2").value = `Fecha reporte: ${dateReport}`;
        worksheet.getCell("A2").alignment = {
            horizontal: "left",
            vertical: "middle",
        };
        worksheet.getCell("A2").font = { size: 12 };
        worksheet.addRow([]);
        //add Hearders Row
        const headerRow = worksheet.addRow(headers);

        //Cell Style : Fill and border
        headerRow.eachCell((cell, i) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "378A13" },
                bgColor: { argb: "378A13" },
            };
            cell.border = {
                top: { style: "thin", color: { argb: "BEBEBE" } },
                left: { style: "thin", color: { argb: "BEBEBE" } },
                right: { style: "thin", color: { argb: "BEBEBE" } },
                bottom: { style: "thin", color: { argb: "BEBEBE" } },
            };
            cell.font = { size: 12, bold: true, color: { argb: "FFFFFF" } };
            cell.alignment = { horizontal: "center", vertical: "middle" };
            worksheet.getColumn(i).width =
                headers[i - 1].length < 20 ? 24 : headers[i - 1].length + 5;
        });

        worksheet.eachRow(function (row, rowNumber) {
            row.height = 25;
        });

        data.forEach((element) => {
            const eachRow = [];
            headers.forEach((column) => {
                eachRow.push(element[column]);
            });
            if (element.Fecha == "Promedio" || element.Fecha == "Total") {
                if (element.Fecha == "Promedio") worksheet.addRow([]);
                const row = worksheet.addRow(eachRow);
                row.eachCell((cell) => {
                    cell.font = {
                        bold: true,
                        family: 4,
                    };
                });
            } else {
                const row = worksheet.addRow(eachRow);
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" },
                        bottom: { style: "thin" },
                    };
                });
            }
        });

        workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
            this.saveAsExcelFile(data, excelFileName);
        });
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
    }

    private numToAlpha(num: number) {
        let alpha = "";

        for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
            alpha = String.fromCharCode((num % 26) + 0x41) + alpha;
        }
        return alpha;
    }
}
