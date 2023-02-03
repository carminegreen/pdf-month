import { TDocumentDefinitions } from "pdfmake/interfaces";
import { Day } from "./MonthModel";

enum MonthTableHeader {
    NUMERO = "NUMERO",
    GIORNO = "GIORNO",
    ORE = "ORE"
}

export const makeMonthTablePdfDocument = (month: string, days: Day[]): TDocumentDefinitions => ({
    content: [
        {
            text: month,
            style: "header",
            alignment: "center"
        },
        {
            style: "tableExample",
            alignment: "center",
            table: {
                widths: [100, 150, 100],
                body: [
                    [
                        {
                            text: MonthTableHeader.NUMERO,
                            bold: true,
                            alignment: "center"
                        },
                        {
                            text: MonthTableHeader.GIORNO,
                            bold: true,
                            alignment: "center"
                        },
                        {
                            text: MonthTableHeader.ORE,
                            bold: true,
                            alignment: "center"
                        }
                    ],
                    ...days.map(day => ([
                        {
                            text: day.number,
                            alignment: "center"
                        },
                        {
                            text: day.word,
                            alignment: "center"
                        },
                        {
                            text: "",
                            alignment: "center"
                        }
                    ]))
                ]
            }
        },
    ],
    styles: {
        header: {
            fontSize: 25,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        tableExample: {
            fontSize: 18,
            margin: [70, 0, 0, 60]
        }
    },
    defaultStyle: {
        lineHeight: 1,
        font: "Helvetica"
    }
});
