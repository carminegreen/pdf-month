import { Day } from "../models/MonthModel";
import PdfPrinter from "pdfmake";
import { join } from "path";
import { makeMonthTablePdfDocument } from "../models/month-table.pdf";
import { createWriteStream } from "fs";

const printer = new PdfPrinter({
    Courier: {
        normal: "Courier",
        bold: "Courier-Bold",
        italics: "Courier-Oblique",
        bolditalics: "Courier-BoldOblique"
    },
    Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique"
    },
    Times: {
        normal: "Times-Roman",
        bold: "Times-Bold",
        italics: "Times-Italic",
        bolditalics: "Times-BoldItalic"
    },
    Symbol: {
        normal: "Symbol"
    },
    ZapfDingbats: {
        normal: "ZapfDingbats"
    }
});

export function generateMonthTablePdf(month: { name: string, days: Day[] }): PDFKit.PDFDocument {
    return printer.createPdfKitDocument(makeMonthTablePdfDocument(month.name, month.days));
}
