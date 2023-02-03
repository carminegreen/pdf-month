export enum MonthName {
    GENNAIO = "Gennaio",
    FEBBRAIO = "Febbraio",
    MARZO = "Marzo",
    APRILE = "Aprile",
    MAGGIO = "Maggio",
    GIUGNO = "Giugno",
    LUGLIO = "Luglio",
    AGOSTO = "Agosto",
    SETTEMBRE = "Settembre",
    OTTOBRE = "Ottobre",
    NOVEMBRE = "Novembre",
    DICEMBRE = "Dicembre",
}


export interface Month {
    month: MonthName,
    days: Day[]
}

export interface Day {
    number?: number,
    word?: string,
    hours?: number
}
