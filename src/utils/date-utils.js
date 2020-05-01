
// TODO: Can we get these from the locale?
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const shortMonthNames = monthNames.map(n => n.substring(0, 3).toLowerCase())

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const shortDayNames = dayNames.map(n => n.substring(0, 3).toLowerCase())

export function areDatesEqual(date1, date2) {
    if ((date1 && !date2) || (date2 && !date1)) {
        return false
    }
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

export function parseDateTime(text, dateOrder) {
    const parts = text.toString().toLowerCase().split(/[.,/ :-]/)

    const today = new Date()
    let day = today.getDate()
    let month = today.getMonth()
    let year = today.getFullYear()
    let hour = 9
    let minute = 0
    let ampm = ''

    let dayPart = -1
    let monthPart = -1
    let yearPart = -1
    let hourPart = -1

    // Try to get the month if it's been supplied as a word
    for (let i = 0; i < parts.length; i++) {
        const index = shortMonthNames.indexOf(parts[i].substring(0, 3))
        if (index !== -1) {
            month = index
            monthPart = i
            break
        }
    }

    // Get each date part based on the dateOrder supplied
    const dateOrderLower = dateOrder.toLowerCase()
    for (let i = 0; i < dateOrder.length; i++) {
        if (dateOrderLower[i] === 'd') {
            const dayResult = getDayPart(parts, monthPart, yearPart)
            if (dayResult) {
                day = dayResult.day
                dayPart = dayResult.dayPart
            }
        }
        if (dateOrderLower[i] === 'm' && monthPart === -1) {
            const monthResult = getMonthPart(parts, dayPart, yearPart)
            if (monthResult) {
                month = monthResult.month
                monthPart = monthResult.monthPart
            }
        }
        if (dateOrderLower[i] === 'y') {
            const yearResult = getYearPart(parts, dayPart, monthPart)
            if (yearResult) {
                year = yearResult.year
                yearPart = yearResult.yearPart
            }
        }
    }

    // TODO: Time...
    //if (includeTime) {
    //    // Hour part is the first part that isn't a date part
    //    for (let i = 0; i < parts.length; i++) {
    //        if (i !== yearPart && i !== monthPart && i !== dayPart) {
    //            const maybehour = parseInt(parts[i])
    //            if (!isNaN(maybehour)) {
    //                hour = maybehour
    //                hourPart = i
    //                break
    //            }
    //        }
    //    }
    //
    //    // Minute part is the first part that isn't a date part or the hour part
    //    for (let i = 0; i < parts.length; i++) {
    //        if (i !== yearPart && i !== monthPart && i !== dayPart && i !== hourPart) {
    //            const maybeminute = parseInt(parts[i])
    //            if (!isNaN(maybeminute)) {
    //                minute = maybeminute
    //                break
    //            }
    //        }
    //    }
    //
    //    // Look for AM or PM
    //    for (let i = 0; i < parts.length; i++) {
    //        if (parts[i] === 'am' || parts[i] === 'pm') {
    //            ampm = parts[i].toString().toUpperCase()
    //            if (ampm === 'PM') {
    //                hour = hour + 12
    //            }
    //            break
    //        }
    //    }
    //}

    return new Date(year, month, day, hour, minute)
}

function getDayPart(parts, monthPart, yearPart) {
    for (let i = 0; i < parts.length; i++) {
        if (i !== monthPart && i !== yearPart) {
            const maybeday = parseInt(parts[i])
            if (!isNaN(maybeday)) {
                const day = maybeday
                const dayPart = i
                return { day, dayPart }
            }
        }
    }
}

function getMonthPart(parts, dayPart, yearPart) {
    for (let i = 0; i < parts.length; i++) {
        if (i !== dayPart && i !== yearPart) {
            const maybemonth = parseInt(parts[i])
            if (!isNaN(maybemonth)) {
                const month = maybemonth - 1
                const monthPart = i
                return { month, monthPart }
            }
        }
    }
}

function getYearPart(parts, dayPart, monthPart) {
    for (let i = 0; i < parts.length; i++) {
        if (i !== monthPart && i !== dayPart) {
            const maybeyear = parseInt(parts[i])
            if (!isNaN(maybeyear)) {
                const year = maybeyear < 100 ? maybeyear + 2000 : maybeyear
                const yearPart = i
                return { year, yearPart }
            }
        }
    }
}

export function formatDate(value, dateFormat) {
    if (!value) {
        return '';
    }

    const date = new Date(value)

    // Build the text that will be displayed
    return dateFormat
        .replace(/(d+)|(M+)|(y+)/g, m => {
            if (m.indexOf('d') >= 0) {
                return formatDay(date, m);
            } else if (m.indexOf('M') >= 0) {
                return formatMonth(date, m);
            } else if (m.indexOf('y') >= 0) {
                return formatYear(date, m);
            }
        });


    // TODO: Time
    //if (includeTime) {
    //    const ampm = hour >= 12 ? 'PM' : 'AM'
    //    hour = hour % 12
    //    hour = hour || 12 // the hour '0' should be '12'
    //
    //    minute = minute < 10 ? '0' + minute : minute
    //    text = text + ' ' + hour + ':' + minute + ' ' + ampm
    //}
}

function formatDay(date, d) {
    if (d.length >= 4) {
        return dayNames[date.getDay()];
    } else if (d.length === 3) {
        return dayNames[date.getDay()].substring(0, 3);
    } else if (d.length == 2) {
        let text = date.getDate().toString();
        return (text.length < 2) ? '0' + text : text;
    } else {
        return date.getDate();
    }
}

function formatMonth(date, m) {
    if (m.length >= 4) {
        return monthNames[date.getMonth()];
    } else if (m.length === 3) {
        return monthNames[date.getMonth()].substring(0, 3);
    } else if (m.length == 2) {
        let text = date.getMonth().toString();
        return (text.length < 2) ? '0' + text : text;
    } else {
        return date.getMonth();
    }
}

function formatYear(date, y) {
    return date.getFullYear().toString().substring(4 - y.length, y.length);
}
