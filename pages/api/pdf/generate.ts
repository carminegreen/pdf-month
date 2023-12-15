import type { NextApiRequest, NextApiResponse } from 'next';
import { getMonth } from "../../../utils/getMonthArray";
import { DateTime } from "luxon";
import { generateMonthTablePdf } from "../../../utils/pdf";

export default async function generate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' });
    }
    const body = JSON.parse(req.body);
    if (!body.month) {
        return res.status(400).send({ message: 'Formato chiamata non conforme!' });
    }
    const chunks: any = [];
    const now = DateTime.now().plus({ years: 1 });
    const months = getMonth(now.startOf("year") ,now.endOf("year"));
    const selectedMonth = months.find(m => m.month === body.month);
    if (!selectedMonth) {
        return res.status(400).json({
            error: { message: `Mese non corretto` },
        })
    }
    try {
        const pdf = generateMonthTablePdf({ name: selectedMonth.month, days: selectedMonth.days });

        pdf.on('data', function(chunk) {
            chunks.push(chunk);
        });
        pdf.on("end", function () {
            const result = Buffer.concat(chunks);
            return res.status(200).send(result);
        });
        pdf.end();
    } catch (err) {
        return res.status(500).json({
            error: { message: `An error ocurred, ${err}` },
        })
    }
}


/*
return res.status(200).json({ ok: true })

return res.status(500).json({
      error: { message: `An error ocurred, ${err}` },
    })

 */
