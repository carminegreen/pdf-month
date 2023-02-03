import { DateTime, Interval } from "luxon";
import { Month, MonthName } from "../models/MonthModel";
import { days } from "./days";

export function getMonth(start: DateTime, end?: DateTime) {
    if (!end) {
        end = DateTime.fromJSDate(new Date()).endOf("month");
    }
    console.log(start.toJSDate())
    const interval = Interval.fromDateTimes(start, end);
    let arr: Month[] = [
        { month: MonthName.GENNAIO, days: [] },
        { month: MonthName.FEBBRAIO, days: [] },
        { month: MonthName.MARZO, days: [] },
        { month: MonthName.APRILE, days: [] },
        { month: MonthName.MAGGIO, days: [] },
        { month: MonthName.GIUGNO, days: [] },
        { month: MonthName.LUGLIO, days: [] },
        { month: MonthName.AGOSTO, days: [] },
        { month: MonthName.SETTEMBRE, days: [] },
        { month: MonthName.OTTOBRE, days: [] },
        { month: MonthName.NOVEMBRE, days: [] },
        { month: MonthName.DICEMBRE, days: [] },
    ];

    for(const d of days(interval)) {
        const day_in_word = d.toJSDate().toLocaleString('it-IT', {'weekday': 'long'});
        const month = d.toJSDate().toLocaleString('it-IT', { month: 'long' });
        const obj = arr.find(a => a.month.toLowerCase() === month.toLowerCase());
        if (!obj) {
            continue;
        }
        obj.days.push({ number: d.toJSDate().getDate(), word: capitalizeFirstLetter(day_in_word), hours: 0 });
        // console.log(obj)
        arr = [ ...arr.filter(a => a.month.toLowerCase() !== month.toLowerCase()), obj ];
    }
    return arr;
}

function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
