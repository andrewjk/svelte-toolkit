
export function areDatesEqual(date1, date2) {
    if ((date1 && !date2) || (date2 && !date1)) {
        return false
    }
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

export function parseDateTime(text, includeDate = true, includeTime = false) {
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

    if (includeDate) {
        // Try to get the month if it's been supplied as a word
        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
        for (let i = 0; i < parts.length; i++) {
            const index = months.indexOf(parts[i].substring(0, 3))
            if (index !== -1) {
                month = index
                monthPart = i
                break
            }
        }

        // Day part is the first part that isn't the month part
        // TODO: Localize!
        for (let i = 0; i < parts.length; i++) {
            if (i !== monthPart) {
                const maybeday = parseInt(parts[i])
                if (!isNaN(maybeday)) {
                    day = maybeday
                    dayPart = i
                    break
                }
            }
        }

        // Month part is the first part that isn't the day part
        if (monthPart === -1) {
            for (let i = 0; i < parts.length; i++) {
                if (i !== dayPart) {
                    const maybemonth = parseInt(parts[i])
                    if (!isNaN(maybemonth)) {
                        month = maybemonth - 1
                        monthPart = i
                        break
                    }
                }
            }
        }

        // Year part is the first part that isn't the month or day part
        for (let i = 0; i < parts.length; i++) {
            if (i !== monthPart && i !== dayPart) {
                const maybeyear = parseInt(parts[i])
                if (!isNaN(maybeyear)) {
                    year = maybeyear
                    if (year < 100) year += 2000
                    yearPart = i
                    break
                }
            }
        }
    }

    if (includeTime) {
        // Hour part is the first part that isn't a date part
        for (let i = 0; i < parts.length; i++) {
            if (i !== yearPart && i !== monthPart && i !== dayPart) {
                const maybehour = parseInt(parts[i])
                if (!isNaN(maybehour)) {
                    hour = maybehour
                    hourPart = i
                    break
                }
            }
        }

        // Minute part is the first part that isn't a date part or the hour part
        for (let i = 0; i < parts.length; i++) {
            if (i !== yearPart && i !== monthPart && i !== dayPart && i !== hourPart) {
                const maybeminute = parseInt(parts[i])
                if (!isNaN(maybeminute)) {
                    minute = maybeminute
                    break
                }
            }
        }

        // Look for AM or PM
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === 'am' || parts[i] === 'pm') {
                ampm = parts[i].toString().toUpperCase()
                if (ampm === 'PM') {
                    hour = hour + 12
                }
                break
            }
        }
    }

    return new Date(year, month, day, hour, minute)
}

export function dateToString(value, includeDate = true, includeTime = false) {
    if (!value) {
        return '';
    }

    const date = new Date(value)

    // Build the text that will be displayed
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getMinutes()

    const niceMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let text = ''

    if (includeDate) {
        text = text + day + ' ' + niceMonths[month] + ' ' + year
    }

    if (includeTime) {
        const ampm = hour >= 12 ? 'PM' : 'AM'
        hour = hour % 12
        hour = hour || 12 // the hour '0' should be '12'

        minute = minute < 10 ? '0' + minute : minute
        text = text + ' ' + hour + ':' + minute + ' ' + ampm
    }

    return text.trim()
}
