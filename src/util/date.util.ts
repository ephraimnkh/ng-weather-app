/**
 * 
 * @param day Date.getDay() value
 * @returns Full text for day of the week e.g. 'Monday'
 */
export function getDayText(day: number): string {
    switch (day) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        default:
            return 'Invalid Day Provided'
    }
}

/**
 * 
 * @param month Date.getMonth() value
 * @returns Full text for month of the Date.getMonth() value e.g. 'April'
 */
export function getMonthText(month: number): string {
    switch (month) {
        case 0:
            return 'January'
        case 1:
            return 'February'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December'
        default:
            return 'Invalid Date Provided'
    }
}

/**
 * 
 * @param unixTimestamp unix timestamp
 * @returns JS date object created from the unix timestamp
 */
export function createDateFromUnixTimestamp(unixTimestamp: number): Date {
    // Multiply Unix timestamp by 1000 to convert it into milliseconds for JS Date Objects
    const millisecondsForNewDate = unixTimestamp * 1000;
    return new Date(millisecondsForNewDate);
}

/**
 * 
 * @param date optional date object you want the time for.
 * @returns the time as HH:mm:ss or HH:mm for the provided date, or if no date object is provided it returns the current time.
 */
export function retrieveTimeForDate(date = new Date()): string {
    const hour = retriveHourForDate(date);
    const minutes = retriveMinutesForDate(date);
    return `${hour}:${minutes}`;
}

/**
 * 
 * @param date optional date object you want the time for.
 * @returns the time as HH:mm:ss for the provided date, or if no date object is provided it returns the current time.
 */
export function retrieveTimeForDateWithSeconds(date = new Date()): string {
    const hour = retriveHourForDate(date);
    const minutes = retriveMinutesForDate(date);
    const seconds = retriveSecondsForDate(date);
    return `${hour}:${minutes}:${seconds}`;
}

/**
 * 
 * @param date the date object you want the hours for. 
 * @returns the hour for the provided date object as a string with 0 appended for am times. If no date object is provided the current hour will be returned.
 */
export function retriveHourForDate(date = new Date()): string {
    return date.getHours().toString().padStart(2, '0');
}

/**
 * 
 * @param date the date object you want the minutes for. 
 * @returns the minutes for the provided date object as a string with 0 appended for values lower than 10. If no date object is provided the current minutes will be returned.
 */
export function retriveMinutesForDate(date = new Date()): string {
    return date.getMinutes().toString().padStart(2, '0');
}

/**
 * 
 * @param date the date object you want the seconds for. 
 * @returns the seconds for the provided date object as a string with 0 appended for values lower than 10. If no date object is provided the current seconds will be returned.
 */
export function retriveSecondsForDate(date = new Date()): string {
    return date.getSeconds().toString().padStart(2, '0');
}