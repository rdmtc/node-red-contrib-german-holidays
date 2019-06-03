/********************************************
 * german-holidays:
 *********************************************/

/*!
 * This is based on the feiertage.js
 * @repository https://github.com/sfakir/feiertagejs
 * @docs https://github.com/sfakir/feiertagejs/blob/master/docs.md
 * @docs https://www.rechner.club/feiertage
 *
 * Copyright 2015-2018 Simon Fakir
 * Released under the MIT license
 */

const allRegions = [
    'BW',
    'BY',
    'BE',
    'BB',
    'HB',
    'HE',
    'HH',
    'MV',
    'NI',
    'NW',
    'RP',
    'SL',
    'SN',
    'ST',
    'SH',
    'TH',
    'BUND',
    'ALL'
];

/*
const allHolidays = [
    'NEUJAHRSTAG',
    'HEILIGEDREIKOENIGE',
    'KARFREITAG',
    'OSTERSONNTAG',
    'OSTERMONTAG',
    'TAG_DER_ARBEIT',
    'CHRISTIHIMMELFAHRT',
    'MARIAHIMMELFAHRT',
    'PFINGSTSONNTAG',
    'PFINGSTMONTAG',
    'FRONLEICHNAM',
    'DEUTSCHEEINHEIT',
    'REFORMATIONSTAG',
    'ALLERHEILIGEN',
    'BUBETAG',
    'ERSTERWEIHNACHTSFEIERTAG',
    'ZWEITERWEIHNACHTSFEIERTAG'
]; */

const germanTranslations = {
    NEUJAHRSTAG: 'Neujahrstag',
    HEILIGEDREIKOENIGE: 'Heilige Drei Könige',
    KARFREITAG: 'Karfreitag',
    OSTERSONNTAG: 'Ostersonntag',
    OSTERMONTAG: 'Ostermontag',
    TAG_DER_ARBEIT: 'Tag der Arbeit',
    CHRISTIHIMMELFAHRT: 'Christi Himmelfahrt',
    PFINGSTSONNTAG: 'Pfingstsonntag',
    PFINGSTMONTAG: 'Pfingstmontag',
    FRONLEICHNAM: 'Fronleichnam',
    MARIAHIMMELFAHRT: 'Mariä Himmelfahrt',
    DEUTSCHEEINHEIT: 'Tag der Deutschen Einheit',
    REFORMATIONSTAG: 'Reformationstag',
    ALLERHEILIGEN: 'Allerheiligen',
    BUBETAG: 'Buß- und Bettag',
    ERSTERWEIHNACHTSFEIERTAG: '1. Weihnachtstag',
    ZWEITERWEIHNACHTSFEIERTAG: '2. Weihnachtstag',
    MONDAY: 'Montag',
    TUESDAY: 'Dienstag',
    WEDNESDAY: 'Mittwoch',
    THURSDAY: 'Donnerstag',
    FRIDAY: 'Freitag',
    SATURDAY: 'Samstag',
    SUNDAY: 'Sonntag'
};

const dayNames = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
];

/*******************************************************************************************************/
const errorHandler = function (node, err, messageText, stateText) {
    if (!err) {
        return true;
    }

    if (err.message) {
    // const msg = err.message.toLowerCase();
        messageText += ':' + err.message;
    } else {
        messageText += '! (No error message given!)';
    }

    if (node) {
        node.error(messageText);
        node.debug(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        node.status({
            fill: 'red',
            shape: 'ring',
            text: stateText
        });
    } else if (console) {
        console.error(messageText);
        console.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    }

    return false;
};

/*******************************************************************************************************/
/**
 * creates a string with two digits
 * @param {number} n number to format
 * @returns {string} number with minimum two digits
 */
function pad2(n) { // always returns a string
    return (n < 0 || n > 9 ? '' : '0') + n;
}
/*******************************************************************************************************/
function getDataForDay(date, offsetToday, holidays) {
    if (offsetToday !== 0) {
        const d = new Date(date);
        d.setDate(d.getDate() + offsetToday);
        return getDataForDate(d, holidays, offsetToday);
    }

    return getDataForDate(date, holidays, 0);
}

// holidays API
/**
 * get the data for a date.
 * @param date date to get data for
 * @param holidays list of holidays
 * @param offsetToday (optional)
 * @returns object of all information for the day
 */
function getDataForDate(date, holidays, offsetToday) {
    const d = date.getDay(); // gets the day of week
    // const internalDate = toUtcTimestamp(date);

    const result = _newDay(dayNames[d], date);
    if (offsetToday) {
        result.dayOffset = offsetToday;
    }

    result.holiday = holidays.objects.find(holiday => holiday.equals(date));
    result.isSunday = (result.dayOfWeek === 0);
    result.isSaturday = (result.dayOfWeek === 6);
    result.isHoliday = ((typeof result.holiday !== 'undefined') && (result.holiday !== null)); // holidays.integers.indexOf(internalDate) !== -1
    result.name = germanTranslations[result.id];
    result.isWeekend = result.isSunday || result.isSaturday;
    result.isSunOrHoliday = result.isSunday || result.isHoliday;
    result.isWeekendOrHoliday = result.isSaturday || result.isSunday || result.isHoliday;

    return result;
}

/**
 * determinates the current week number of UTC timestamp.
 * @param d date for determinate week number
 * @returns number current week number
 */
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// holidays API
/**
 * Checks if the given holidayName is a valid {@link HolidayType}.
 * @param holidayName {@link HolidayType} to check
 * @throws {Error}
 * @private
 */ /*
function checkHolidayType(holidayName) {
 if (holidayName === null || holidayName === 'undefined') {
     throw new TypeError('holidayName must not be null or 'undefined'');
 }
 if (allHolidays.indexOf(holidayName) === -1) {
     throw new Error(
         'feiertage.js: invalid holiday type "' + holidayName + '"! Must be one of ' + allHolidays.toString()
     );
 }
}/* */

/*
function isSpecificHoliday(
    date,
    holidayName
) {
    checkHolidayType(holidayName);
    return holidays.objects.find(holiday => holiday.equals(date)) !== 'undefined';
}/* */

/**
 *
 * @param year
 * @param region
 * @returns objects: Array,integers
 * @private
 */
function _getHolidaysOfYear(node, year, region) {
    const feiertageObjects = [
        _newDay('NEUJAHRSTAG', _makeDate(year, 1, 1)),
        _newDay('TAG_DER_ARBEIT', _makeDate(year, 5, 1)),
        _newDay('DEUTSCHEEINHEIT', _makeDate(year, 10, 3)),
        _newDay('ERSTERWEIHNACHTSFEIERTAG', _makeDate(year, 12, 25)),
        _newDay('ZWEITERWEIHNACHTSFEIERTAG', _makeDate(year, 12, 26))
    ];

    const easter_date = getEasterDate(year);
    node.debug('easter date ' + easter_date.toISOString());

    let karfreitag = new Date(easter_date.getTime());
    karfreitag = addDays(karfreitag, -2);
    node.debug('karfreitag ' + karfreitag.toISOString());

    let ostermontag = new Date(easter_date.getTime());
    ostermontag = addDays(ostermontag, 1);
    node.debug('ostermontag ' + ostermontag.toISOString());

    let christi_himmelfahrt = new Date(easter_date.getTime());
    christi_himmelfahrt = addDays(christi_himmelfahrt, 39);
    node.debug('christi_himmelfahrt ' + christi_himmelfahrt.toISOString());

    let pfingstsonntag = new Date(easter_date.getTime());
    pfingstsonntag = addDays(pfingstsonntag, 49);
    node.debug('pfingstsonntag ' + pfingstsonntag.toISOString());

    let pfingstmontag = new Date(easter_date.getTime());
    pfingstmontag = addDays(pfingstmontag, 50);
    node.debug('pfingstmontag ' + pfingstmontag.toISOString());

    feiertageObjects.push(_newDay('KARFREITAG', karfreitag));
    feiertageObjects.push(_newDay('OSTERMONTAG', ostermontag));
    feiertageObjects.push(_newDay('CHRISTIHIMMELFAHRT', christi_himmelfahrt));
    feiertageObjects.push(_newDay('PFINGSTMONTAG', pfingstmontag));

    // Heilige 3 Koenige
    if (
        region === 'BW' ||
    region === 'BY' ||
    region === 'ST' ||
    region === 'ALL'
    ) {
        feiertageObjects.push(
            _newDay('HEILIGEDREIKOENIGE', _makeDate(year, 1, 6))
        );
    }

    if (region === 'BB' || region === 'ALL') {
        feiertageObjects.push(_newDay('OSTERSONNTAG', easter_date));
        feiertageObjects.push(_newDay('PFINGSTSONNTAG', pfingstsonntag));
    }

    // Fronleichnam
    if (
        region === 'BW' ||
    region === 'BY' ||
    region === 'HE' ||
    region === 'NW' ||
    region === 'RP' ||
    region === 'SL' ||
    region === 'ALL'
    ) {
        let fronleichnam = new Date(easter_date.getTime());
        fronleichnam = addDays(fronleichnam, 60);
        feiertageObjects.push(_newDay('FRONLEICHNAM', fronleichnam));
    }

    // Maria Himmelfahrt
    if (region === 'SL' || region === 'BY') {
        feiertageObjects.push(
            _newDay('MARIAHIMMELFAHRT', _makeDate(year, 8, 15))
        );
    }
    // Reformationstag

    if (
        year === 2017 ||
    region === 'BB' ||
    region === 'MV' ||
    region === 'SN' ||
    region === 'ST' ||
    region === 'TH' ||
    region === 'ALL'
    ) {
        feiertageObjects.push(
            _newDay('REFORMATIONSTAG', _makeDate(year, 10, 31))
        );
    }

    // Allerheiligen
    if (
        region === 'BW' ||
    region === 'BY' ||
    region === 'NW' ||
    region === 'RP' ||
    region === 'SL' ||
    region === 'ALL'
    ) {
        feiertageObjects.push(_newDay('ALLERHEILIGEN', _makeDate(year, 11, 1)));
    }

    // Buss und Bettag
    if (region === 'SN' || region === 'ALL') {
    // @todo write test
        const bussbettag = getBussBettag(year);
        feiertageObjects.push(
            _newDay(
                'BUBETAG',
                _makeDate(
                    bussbettag.getUTCFullYear(),
                    bussbettag.getUTCMonth() + 1,
                    bussbettag.getUTCDate()
                )
            )
        );
    }

    feiertageObjects.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );

    return {
        objects: feiertageObjects,
        integers: generateIntegerRepresentation(feiertageObjects)
    };
}

/**
 *
 * @param objects
 * @returns {Array}
 * @private
 */
function generateIntegerRepresentation(objects) {
    return objects.map(holiday => toUtcTimestamp(holiday.date));
}

/**
 * Calculates the Easter date of a given year.
 * @param year {number}
 * @returns {Date} Easter date
 * @private
 */
function getEasterDate(year) {
    const C = Math.floor(year / 100);
    const N = year - 19 * Math.floor(year / 19);
    const K = Math.floor((C - 17) / 25);
    let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I -= 30 * Math.floor(I / 30);
    I -=
    Math.floor(I / 28) *
    (1 -
      Math.floor(I / 28) *
      Math.floor(29 / (I + 1)) *
      Math.floor((21 - N) / 11));
    let J = year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4);
    J -= 7 * Math.floor(J / 7);
    const L = I - J;
    const M = 3 + Math.floor((L + 40) / 44);
    const D = L + 28 - 31 * Math.floor(M / 4);
    return new Date(Date.UTC(year, M - 1, D));
}

/**
 * Computes the "Buss- und Bettag"'s date.
 * @param year {number}
 * @returns {Date} the year's "Buss- und Bettag" date
 * @private
 */
function getBussBettag(year) {
    const weihnachten = new Date(Date.UTC(year, 11, 25, 12, 0, 0));
    const ersterAdventOffset = 32;
    let wochenTagOffset = weihnachten.getDay() % 7;

    if (wochenTagOffset === 0) {
        wochenTagOffset = 7;
    }

    const tageVorWeihnachten = wochenTagOffset + ersterAdventOffset;

    let bbtag = new Date(weihnachten.getTime());
    bbtag = addDays(bbtag, -tageVorWeihnachten);

    return bbtag;
}

/**
 * Adds {@code days} days to the given {@link Date}.
 * @param date
 * @param days
 * @returns {Date}
 * @private
 */
function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

/**
 * Creates a new {@link Date}.
 * @param year  -  utc year of the day
 * @param naturalMonth  - natural utc month (1-12)
 * @param day
 * @returns {Date}
 * @private
 */
function _makeDate(year, naturalMonth, day) {
    return new Date(Date.UTC(year, naturalMonth - 1, day));
}

/**
 *
 * @param d
 * @param date
 * @returns day
 * @private
 */
function _newDay(id, date) {
    return {
        id,
        name: (germanTranslations[id]) ? germanTranslations[id] : date.getUTCFullYear() + pad2(date.getUTCMonth()) + pad2(date.getUTCDate()),
        dayOfWeek: date.getUTCDay(),
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        naturalMonth: date.getUTCMonth() + 1,
        year: date.getUTCFullYear(),
        date, // : new Date(year, month, day, hours, minutes, seconds, milliseconds),
        dateString: _localeDateObjectToDateString(date),
        dateISOString: date.toISOString(),
        getNormalizedDate() {
            return toUtcTimestamp(this.date);
        },
        equals(date) {
            const string = _localeDateObjectToDateString(date);
            return this.dateString === string;
        }
    };
}

/**
 *
 * @param date
 * @returns {string}
 * @private
 */
function _localeDateObjectToDateString(date) {
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString().slice(0, 10);
}

/**
 *
 * @param date
 * @returns {object}
 * @private
 */ /*
function _getlocaleDateObject(date) {
 date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
 date.setUTCHours(0, 0, 0, 0);
 return date;
} */

/**
 * Returns the UTC timestamp of the given date with hours, minutes, seconds, and milliseconds set to zero.
 * @param date
 * @returns {number} UTC timestamp
 */
function toUtcTimestamp(date) {
    date.setUTCHours(0, 0, 0, 0);
    return date.getTime();
}

module.exports = function (RED) {
    function germanHolidaysNode(config) {
        RED.nodes.createNode(this, config);
        // var node = this;

        this.on('input', function (msg) {
            try {
                /********************************************
* versenden:
*********************************************/
                // var creds = RED.nodes.getNode(config.creds); - not used
                const attrs = ['region', 'day', 'date', 'ts'];

                const outMsg = {
                    payload: {},
                    topic: msg.topic,
                    data: {}
                };

                for (const attr of attrs) {
                    // value === 'undefined' || value === null --> value == null
                    if ((config[attr] != null) && (config[attr] !== '')) { // eslint-disable-line
                        outMsg.data[attr] = config[attr];
                    }
                    if ((msg[attr] != null) && (msg[attr] !== '')) { // eslint-disable-line
                        outMsg.data[attr] = msg[attr];
                    }
                }

                if ((typeof outMsg.data.ts === 'undefined') && ((typeof msg.payload === 'string') || (msg.payload instanceof Date))) {
                    const dto = new Date(msg.payload);
                    if (dto !== 'Invalid Date' && !isNaN(dto)) {
                        outMsg.data.ts = dto;
                    }
                }
                //-------------------------------------------------------------------
                if (typeof outMsg.data.region === 'undefined' || outMsg.data.region === '') {
                    this.error('configuration error: Region is missing!');
                    this.status({
                        fill: 'red',
                        shape: 'dot',
                        text: 'No Region given!'
                    });
                    return;
                }

                outMsg.data.region = outMsg.data.region.toUpperCase();
                if (allRegions.indexOf(outMsg.data.region) === -1) {
                    this.error('Invalid region: ' + outMsg.data.region + '! Must be one of ' + allRegions.toString());
                    this.status({
                        fill: 'red',
                        shape: 'dot',
                        text: 'Invalid Region given!'
                    });
                    return;
                }

                if ((typeof outMsg.data.date !== 'undefined') && ((outMsg.data.date instanceof Date) || (typeof outMsg.data.date === 'string'))) {
                    const dto = new Date(outMsg.data.date);
                    if (dto !== 'Invalid Date' && !isNaN(dto)) {
                        outMsg.data.year = dto.getUTCFullYear();
                        const holidays = _getHolidaysOfYear(this, outMsg.data.year, outMsg.data.region);
                        outMsg.payload = getDataForDate(dto, holidays);
                        this.send(outMsg);
                        return;
                    }
                }

                if (typeof outMsg.data.ts === 'string') {
                    const dto = new Date(outMsg.data.ts);
                    if (dto !== 'Invalid Date' && !isNaN(dto)) {
                        outMsg.data.ts = dto;
                    }
                }

                if ((typeof outMsg.data.ts === 'undefined') || !(outMsg.data.ts instanceof Date)) {
                    outMsg.data.ts = new Date();
                }

                outMsg.data.year = outMsg.data.ts.getUTCFullYear();
                const holidays = _getHolidaysOfYear(this, outMsg.data.year, outMsg.data.region);

                if (typeof outMsg.data.day !== 'undefined' || !isNaN(outMsg.data.day)) {
                    outMsg.payload = getDataForDay(outMsg.data.ts, outMsg.data.day, holidays);
                    this.send(outMsg);
                    return;
                }

                outMsg.payload = {
                    // lastUpdate: outMsg.data.ts.toISOString(),
                    yesterday: {},
                    today: {},
                    tomorrow: {},
                    dayAfterTomorrow: {},
                    afterTheDayAfterTomorrow: {},
                    hollidays: holidays.objects,
                    hollidaysNum: holidays.integers,
                    next: {},
                    weekNumber: getWeekNumber(outMsg.data.ts)
                };

                outMsg.payload.yesterday = getDataForDay(outMsg.data.ts, -1, holidays);
                outMsg.payload.today = getDataForDate(outMsg.data.ts, holidays, 0); // getDataForDay(outMsg.data.ts, 0, holidays);
                outMsg.payload.tomorrow = getDataForDay(outMsg.data.ts, 1, holidays);
                outMsg.payload.dayAfterTomorrow = getDataForDay(outMsg.data.ts, 2, holidays);
                outMsg.payload.afterTheDayAfterTomorrow = getDataForDay(outMsg.data.ts, 3, holidays);

                outMsg.payload.weekNumberEven = !(outMsg.payload.weekNumber % 2);

                // Brückentag?
                outMsg.payload.today.isBetweenSundayAndHoliday = (outMsg.payload.yesterday.isSunday && outMsg.payload.tomorrow.isHoliday);
                outMsg.payload.tomorrow.isBetweenSundayAndHoliday = (outMsg.payload.today.isSunday && outMsg.payload.dayAfterTomorrow.isHoliday);
                outMsg.payload.dayAfterTomorrow.isBetweenSundayAndHoliday = (outMsg.payload.tomorrow.isSunday && outMsg.payload.afterTheDayAfterTomorrow.isHoliday);

                outMsg.payload.today.isBetweenHolidayAndSaturday = (outMsg.payload.yesterday.isHoliday && outMsg.payload.tomorrow.isSaturday);
                outMsg.payload.tomorrow.isBetweenHolidayAndSaturday = (outMsg.payload.today.isHoliday && outMsg.payload.dayAfterTomorrow.isSaturday);
                outMsg.payload.dayAfterTomorrow.isBetweenHolidayAndSaturday = (outMsg.payload.tomorrow.isHoliday && outMsg.payload.afterTheDayAfterTomorrow.isSaturday);

                outMsg.payload.today.isBetweenWeekendOrHoliday = (outMsg.payload.yesterday.isWeekendOrHoliday && outMsg.payload.tomorrow.isWeekendOrHoliday && !outMsg.payload.today.isWeekendOrHoliday);
                outMsg.payload.tomorrow.isBetweenWeekendOrHoliday = (outMsg.payload.today.isWeekendOrHoliday && outMsg.payload.dayAfterTomorrow.isWeekendOrHoliday && !outMsg.payload.tomorrow.isWeekendOrHoliday);
                outMsg.payload.dayAfterTomorrow.isBetweenWeekendOrHoliday = (outMsg.payload.tomorrow.isWeekendOrHoliday && outMsg.payload.afterTheDayAfterTomorrow.isWeekendOrHoliday && !outMsg.payload.dayAfterTomorrow.isWeekendOrHoliday);

                outMsg.payload.today.isCurrentOrBetweenWeekendOrHoliday = (outMsg.payload.today.isWeekendOrHoliday || outMsg.payload.today.isBetweenWeekendOrHoliday);
                outMsg.payload.tomorrow.isCurrentOrBetweenWeekendOrHoliday = (outMsg.payload.tomorrow.isWeekendOrHoliday || outMsg.payload.tomorrow.isBetweenWeekendOrHoliday);
                outMsg.payload.dayAfterTomorrow.isCurrentOrBetweenWeekendOrHoliday = (outMsg.payload.dayAfterTomorrow.isWeekendOrHoliday || outMsg.payload.today.isBetweenWeekendOrHoliday);

                for (let i = 0; i < outMsg.payload.hollidays.length; i++) {
                    const hd = outMsg.payload.hollidays[i];
                    const d = hd.date;

                    const timeDiff = d.getTime() - outMsg.data.ts.getTime();
                    if (timeDiff > 0) {
                        outMsg.payload.next.holliday = hd;
                        outMsg.payload.next.hollidayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        break;
                    }
                }

                // 0 S 1 M 2 D 3 M 4 D 5 F 6 S 0 S
                outMsg.payload.next.weekendDayDiff = (6 - outMsg.payload.today.dayOfWeek);
                if (outMsg.payload.today.dayOfWeek === 6) {
                    const date = new Date(outMsg.data.ts);
                    date.setDate(date.getDate() + 1);
                    outMsg.payload.next.weekendDay = _newDay('SUNDAY', date);
                } else {
                    const dayOfWeek = 6; // Saturday
                    const date = new Date(outMsg.data.ts);
                    const diff = date.getDay() - dayOfWeek;
                    if (diff > 0) {
                        date.setDate(date.getDate() + 6);
                    } else if (diff < 0) {
                        date.setDate(date.getDate() + ((-1) * diff));
                    }

                    outMsg.payload.next.weekendDay = _newDay('SATURDAY', date);
                }

                outMsg.payload.next.weekendOrHolidayDiff = (outMsg.payload.next.hollidayDiff) ? Math.min(outMsg.payload.next.hollidayDiff, outMsg.payload.next.weekendDayDiff) : outMsg.payload.next.weekendDayDiff;
                if (outMsg.payload.next.holliday && (outMsg.payload.next.weekendOrHolidayDiff === outMsg.payload.next.hollidayDiff)) {
                    outMsg.payload.next.weekendOrHoliday = outMsg.payload.next.holliday;
                } else {
                    outMsg.payload.next.weekendOrHoliday = outMsg.payload.next.weekendDay;
                }

                this.send(outMsg);
            } catch (err) {
                errorHandler(this, err, 'Exception occurred on get german holidays', 'internal error');
            }
        });
    }

    RED.nodes.registerType('german-holidays', germanHolidaysNode);
};