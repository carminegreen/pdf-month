import { DateTime, Interval } from "luxon";

export function* days(interval: Interval): Generator<DateTime> {
    let cursor = interval.start.startOf("day");
    while (cursor < interval.end) {
        // Questo operatore ritorna il valore al chiamante, e poi ritorna qui
        // console.log("prima")
        yield cursor;
        // console.log("dopo")
        cursor = cursor.plus({ days: 1 });
    }
}
