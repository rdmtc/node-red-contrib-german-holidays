/********************************************
 * german-holidays:
 *********************************************/

/*!
 * This is based on the feiertage.js
 * @repository https://github.com/sfakir/feiertagejs
 * @docs https://github.com/sfakir/feiertagejs/blob/master/docs.md
 * @docs https://www.rechner.club/feiertage
 * @docs http://manfred.wilzeck.de/Datum_berechnen_allgemein.html
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


const easterX = -1;
const adventX = -2;

const holidayDef = {
    NEUJAHRSTAG: {
        nameDE : 'Neujahrstag', // 1.1.
        month: 1,
        day: 1,
        isHoliday: allRegions
    },
    HEILIGEDREIKOENIGE: {
        nameDE : 'Heilige Drei Könige', // 6.1.
        nameAlt: 'Epiphanias',
        month: 1,
        day: 6,
        isHoliday: ['BW', 'BY', 'ST', 'ALL']
    },
    VALENTINSTAG: {
        nameDE : 'Valentinstag', // 14. 2.
        month: 2,
        day: 14,
        isHoliday: []
    },
    SCHMUDONN: {
        nameDE : 'Schmutziger Donnerstag', // 52 Tage vor dem Ostersonntag
        ref: easterX,
        day: -52,
        isHoliday: []
    },
    ROSENMONTAG: {
        nameDE : 'Rosenmontag', // 48 Tage vor dem Ostersonntag
        ref: easterX,
        day: -48,
        isHoliday: []
    },
    FASTNACHTSDIENSTAG: {
        nameDE : 'Fastnachtsdienstag', // 47 Tage vor dem Ostersonntag
        ref: easterX,
        day: -47,
        isHoliday: []
    },
    ASCHERMITTWOCH: {
        nameDE : 'Aschermittwoch', // 46 Tage vor dem Ostersonntag (der erste Tag der Fastenzeit)
        ref: easterX,
        day: -46,
        isHoliday: []
    },
    PALMSONNTAG: {
        nameDE : 'Palmsonntag', // 7 Tage vor dem Ostersonntag
        ref: easterX,
        day: -7,
        isHoliday: []
    },
    GRUENDONNERSTAG: {
        nameDE : 'Gründonnerstag', // 4 Tage vor dem Ostersonntag
        ref: easterX,
        day: -4,
        isHoliday: []
    },
    KARFREITAG: {
        nameDE : 'Karfreitag',
        ref: easterX,
        day: -2,
        isHoliday: allRegions
    },
    OSTERSONNTAG: {
        nameDE :  'Ostersonntag',
        ref: easterX,
        day: 0,
        isHoliday: ['BB', 'ALL']
    },
    OSTERMONTAG: {
        nameDE :  'Ostermontag',
        ref: easterX,
        day: 1,
        isHoliday: allRegions
    },
    JOHANISTAG: {
        nameDE: 'Johannistag', // 30. April
        month: 4,
        day: 24,
        isHoliday: []
    },
    MICHAELISTAG: {
        nameDE: 'Michaelistag', // 30. April
        month: 4,
        day: 29,
        isHoliday: []
    },
    WALPURGISNACHT: {
        nameDE : 'Walpurgisnacht', // 30. April
        month: 4,
        day: 30,
        isHoliday: []
    },
    TAG_DER_ARBEIT: {
        nameDE :  'Tag der Arbeit', // 1. Mai
        nameAlt: 'Maifeiertag',
        month: 1,
        day: 5,
        isHoliday: allRegions
    },
    EISHEILIGEN1: {
        nameDE : 'Eisheiliger Mamertus', // 11. Mai
        month: 5,
        day: 11,
        isHoliday: []
    },
    EISHEILIGEN2: {
        nameDE : 'Eisheiliger Pankratius', // 12. Mai
        month: 5,
        day: 12,
        isHoliday: []
    },
    EISHEILIGEN3: {
        nameDE : 'Eisheiliger Servatius', // 13. Mai
        month: 5,
        day: 13,
        isHoliday: []
    },
    EISHEILIGEN4: {
        nameDE : 'Eisheiliger Bonifatius', // 14. Mai
        month: 5,
        day: 14,
        isHoliday: []
    },
    EISHEILIGEN5: {
        nameDE : 'Eisheilige Kalte Sophie', // 15. Mai
        month: 5,
        day: 15,
        isHoliday: []
    },
    MUTTERTAG: {
        nameDE : 'Muttertag', // 2. Sonntag im Mai
        month: 12 + 5,
        day: 7,
        isHoliday: []
    },
    KINDERTAG: {
        nameDE: 'Kindertag', // 1.6.
        month: 6,
        day: 1,
        isHoliday: []
    },
    CHRISTIHIMMELFAHRT: {
        nameDE :  'Christi Himmelfahrt',
        nameAlt: 'Vatertag',
        ref: easterX,
        day: 39,
        isHoliday: allRegions
    },
    PFINGSTSONNTAG: {
        nameDE :  'Pfingstsonntag',
        ref: easterX,
        day: 49,
        isHoliday: ['BB', 'ALL']
    },
    PFINGSTMONTAG: {
        nameDE :  'Pfingstmontag',
        ref: easterX,
        day: 50,
        isHoliday: allRegions
    },
    TRINITATISSONNTAG: {
        nameDE: 'Trinitatissonntag',
        ref: easterX,
        day: 56,
        isHoliday: []
    },
    FRONLEICHNAM: {
        nameDE :  'Fronleichnam',
        ref: easterX,
        day: 60,
        isHoliday: ['BW', 'HE', 'NW', 'RP', 'SL', 'ALL']
    },
    SIEBENSCHLAEFER: {
        nameDE : 'Siebenschläfer', // 27. Juni
        month: 6,
        day: 27,
        isHoliday: []
    },
    MARIAHIMMELFAHRT: {
        nameDE :  'Mariä Himmelfahrt',
        month: 8,
        day: 15,
        isHoliday: ['SL', 'BY', 'ALL']
    },
    ERNTEDANK: {
        nameDE : 'Erntedank', // erster Sonntag im Oktober
        month: 12 + 10,
        day: 1,
        isHoliday: []
    },
    DEUTSCHEEINHEIT: {
        nameDE :  'Tag der Deutschen Einheit',
        month: 10,
        day: 3,
        isHoliday: allRegions
    },
    REFORMATIONSTAG: {
        nameDE :  'Reformationstag', // 31. Oktober
        nameAlt: 'Halloween',
        month: 10,
        day: 31,
        isHoliday: ['BB', 'MV', 'SN', 'ST', 'TH', 'ALL']
    },
    ALLERHEILIGEN: {
        nameDE :  'Allerheiligen',
        month: 11,
        day: 1,
        isHoliday: ['BW', 'BY', 'NW', 'RP', 'SL', 'ALL']
    },
    ALLERSEELEN: {
        nameDE : 'Allerseelen', // 2. November
        month: 11,
        day: 2,
        isHoliday: []
    },
    MARTINSTAG: {
        nameDE : 'Martinstag', // 11. November
        month: 11,
        day: 11,
        isHoliday: []
    },
    VOLKSTRAUERTAG: {
        nameDE : 'Volkstrauertages', // Sonntag (3 Tage) vor dem Buß- und Bettag
        ref: adventX,
        day: -35,
        isHoliday: []
    },
    BUBETAG: {
        nameDE :  'Buß- und Bettag',
        ref: adventX,
        day: -32,
        isHoliday: ['SN', 'ALL']
    },
    TOTENSONNTAG: {
        nameDE : 'Totensonntag', // Sonntag (4 Tage) nach dem Buß- und Bettag; eine Woche vor dem ersten Advent
        nameAlt: 'Ewigkeitssonntag',
        ref: adventX,
        day: -28,
        isHoliday: []
    },
    ADVENT1: {
        nameDE : 'erste Advent', // vierte Sonntag vor Weihnachten; Zwischen Buss und Bettag und dem 1. Advent liegen 11 Tage
        ref: adventX,
        day: -21,
        isHoliday: []
    },
    ADVENT2: {
        nameDE : 'zweite Advent', // dritte Sonntag vor Weihnachten; Zwischen Buss und Bettag und dem 2. Advent liegen 18 Tage
        ref: adventX,
        day: -14,
        isHoliday: []
    },
    NIKOLAUS: {
        nameDE : 'Nikolaus', // 6.12.
        month: 12,
        day: 6,
        isHoliday: []
    },
    ADVENT3: {
        nameDE : 'dritte Advent', // zweite Sonntag vor Weihnachten; Zwischen Buss und Bettag und dem 3. Advent liegen 25 Tage
        ref: adventX,
        day: -7,
        isHoliday: []
    },
    ADVENT4: {
        nameDE : 'vierte Advent', // Sonntag direkt vor Weihnachten; Zwischen Buss und Bettag und dem 4. Advent liegen 32 Tage
        ref: adventX,
        day: 0,
        isHoliday: []
    },
    HEILIGABEND: {
        nameDE: 'Heiligabend',
        month: 12,
        day: 24,
        isHoliday: []
    },
    ERSTERWEIHNACHTSFEIERTAG: {
        nameDE :  '1. Weihnachtstag',
        month: 12,
        day: 25,
        isHoliday: allRegions
    },
    ZWEITERWEIHNACHTSFEIERTAG: {
        nameDE : '2. Weihnachtstag',
        month: 12,
        day: 26,
        isHoliday: allRegions
    },
    SILVESTER: {
        nameDE : 'Silvester', // 31.12.
        month: 12,
        day: 31,
        isHoliday: []
    }
};

const dayNames = [
    { id: 'SUNDAY', nameDE: 'Sonntag' },
    { id: 'MONDAY', nameDE: 'Montag'},
    { id: 'TUESDAY', nameDE: 'Dienstag'},
    { id: 'WEDNESDAY', nameDE: 'Mittwoch'},
    { id: 'THURSDAY', nameDE: 'Donnerstag'},
    { id: 'FRIDAY', nameDE: 'Freitag' },
    { id: 'SATURDAY', nameDE: 'Samstag' },
    { id: 'SUNDAY', nameDE : 'Sonntag' }
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
        console.error(messageText); // eslint-disable-line
        console.error(JSON.stringify(err, Object.getOwnPropertyNames(err))); // eslint-disable-line
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
    return (n < 0 || (n > 9 ? '' : '0')) + n;
}

/**
 * Format a date do a string similar to ISO format, but with no secondy or milliseconds to be shorter
 * @param {Date} d Date to format
 *  @returns {string} date representation
 */
function _dateToString(d) {
    return d.getUTCFullYear() + '-' + pad2(d.getUTCMonth() + 1) + '-' + pad2(d.getUTCDate()) + 'T' + pad2(d.getUTCHours()) + ':' + pad2(d.getUTCMinutes()) + 'Z';
}
/*******************************************************************************************************/
/**
 * get Holiday Data for a specific Day
 * @param {Date} date Date to check
 * @param {*} [offsetToday] offset from today
 * @param {*} daysObjects Holidays object Data
 * @returns object of all information for the day
 */
function getDataForDay(date, offsetToday, daysObjects) {
    if (offsetToday !== 0) {
        const d = new Date(date);
        d.setDate(d.getDate() + offsetToday);
        return getDataForDate(d, daysObjects, offsetToday);
    }

    return getDataForDate(date, daysObjects, 0);
}

// holidays API
/**
 * get the data for a date.
 * @param date date to get data for
 * @param daysObjects list of daysObjects
 * @param offsetToday (optional)
 * @returns object of all information for the day
 */
function getDataForDate(date, daysObjects, offsetToday) {
    const d = date.getDay(); // gets the day of week
    // const internalDate = toUtcTimestamp(date);
    const result = _newDay(dayNames[d].id, date, dayNames[d].nameDE);

    result.weekday = {
        id: result.id,
        name: result.name
    };

    result.isSunday = (result.dayOfWeek === 0);
    result.isSaturday = (result.dayOfWeek === 6);

    result.holiday = daysObjects.holidays.find(holiday => holiday.equals(date));
    result.isHoliday = ((typeof result.holiday !== 'undefined') && (result.holiday !== null));

    if (result.isHoliday) {
        result.specialday = result.holiday;
        result.isSpecialday = result.isHoliday;
    } else {
        result.specialday = daysObjects.specialdays.find(specialday => specialday.equals(date));
        result.isSpecialday = ((typeof result.specialday !== 'undefined') && (result.specialday !== null));
    }

    if (offsetToday) {
        result.dayOffset = offsetToday;
    }

    result.isWeekend = result.isSunday || result.isSaturday;
    result.isSunOrHoliday = result.isSunday || result.isHoliday;
    result.isWeekendOrHoliday = result.isSaturday || result.isSunday || result.isHoliday;

    if (result.isHoliday) {
        result.idExt = result.holiday.id;
        result.nameExt = result.holiday.name;
    } else if (result.isSpecialday) {
        result.idExt = result.specialday.id;
        result.nameExt = result.specialday.name;
    } else {
        result.idExt = result.id;
        result.nameExt = result.name;
    }

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

function _checkDefault(node) {
    node.default.ts = new Date();
    const newYear = node.default.ts.getUTCFullYear();
    if (newYear !== node.default.year) {
        node.default.year = newYear;
        node.default.dayObjs = _getSpecialDaysOfYear(node, node.default.year, node.default.region, true);
    }
}

/**
 * push an element to the days array, but test if already a day definition exists
 * @param {*} arr array
 * @param {*} el element to push
 */
function _pushUnique(arr, el) {
    const pos = arr.findIndex( (x) => {
        return (el.day === x.day) && (el.month === x.month);
    });
    if (pos > -1) {
        return;
    }
    arr.push(el);
}

/**
 * creates all data of special and holidays of a year
 * @param {*} node  -  the node object for debuging
 * @param {Number} year  -  the year for calculation of the special days
 * @param {String} region  -  region to calculate holidays
 * @returns objects: Array,integers
 * @private
 */
function _getSpecialDaysOfYear(node, year, region, force) {
    if (node.default.dayObjs && node.default.year === year && node.default.region === region && !force) {
        return node.default.dayObjs;
    }

    region = region || 'ALL';
    const easter_date = getEasterDate(year);
    node.debug('easter date ' + easter_date.toISOString());
    const christmas_date = _makeDate(year, 12, 25);
    let advent4th_Offset = christmas_date.getDay() % 7;
    if (advent4th_Offset === 0) {
        advent4th_Offset = 7;
    }
    const advent4th = _makeDate(year, christmas_date, -advent4th_Offset);
    const silvester = _makeDate(year, 12, 31);
    const silvester_Offset = silvester.getUTCDay();

    let oktFirst_Offset = _makeDate(year, 10, 1).getUTCDay();
    if (oktFirst_Offset === 0) { oktFirst_Offset = 7; }

    const specialdaysObjects = [];
    _addExtraDays(node.addSpecialday, specialdaysObjects, year, [], easter_date, christmas_date, advent4th);

    _pushUnique(specialdaysObjects, _newDay('NEUJAHRSTAG', _makeDate(year, 1, 1)));
    _pushUnique(specialdaysObjects, _newDay('HEILIGEDREIKOENIGE', _makeDate(year, 1, 6)));
    _pushUnique(specialdaysObjects, _newDay('SCHMUDONN', _makeDate(year, easter_date, -52)));
    _pushUnique(specialdaysObjects, _newDay('ROSENMONTAG', _makeDate(year, easter_date, -48)));
    _pushUnique(specialdaysObjects, _newDay('FASTNACHTSDIENSTAG', _makeDate(year, easter_date, -47)));
    _pushUnique(specialdaysObjects, _newDay('ASCHERMITTWOCH', _makeDate(year, easter_date, -46)));
    _pushUnique(specialdaysObjects, _newDay('PALMSONNTAG', _makeDate(year, easter_date, -7)));
    _pushUnique(specialdaysObjects, _newDay('GRUENDONNERSTAG', _makeDate(year, easter_date, -4)));
    _pushUnique(specialdaysObjects, _newDay('KARFREITAG', _makeDate(year, easter_date, -2)));
    _pushUnique(specialdaysObjects, _newDay('OSTERSONNTAG', easter_date));
    _pushUnique(specialdaysObjects, _newDay('OSTERMONTAG', _makeDate(year, easter_date, 1)));
    _pushUnique(specialdaysObjects, _newDay('CHRISTIHIMMELFAHRT', _makeDate(year, easter_date, 39)));
    _pushUnique(specialdaysObjects, _newDay('PFINGSTSONNTAG', _makeDate(year, easter_date, 49)));
    _pushUnique(specialdaysObjects, _newDay('PFINGSTMONTAG', _makeDate(year, easter_date, 50)));
    _pushUnique(specialdaysObjects, _newDay('FRONLEICHNAM', _makeDate(year, easter_date, 60)));
    _pushUnique(specialdaysObjects, _newDay('TAG_DER_ARBEIT', _makeDate(year, 5, 1)));
    _pushUnique(specialdaysObjects, _newDay('KINDERTAG', _makeDate(year, 6, 1)));
    _pushUnique(specialdaysObjects, _newDay('SIEBENSCHLAEFER', _makeDate(year, 6, 27)));
    _pushUnique(specialdaysObjects, _newDay('MARIAHIMMELFAHRT', _makeDate(year, 8, 15)));
    _pushUnique(specialdaysObjects, _newDay('DEUTSCHEEINHEIT', _makeDate(year, 10, 3)));
    _pushUnique(specialdaysObjects, _newDay('REFORMATIONSTAG', _makeDate(year, 10, 31)));
    _pushUnique(specialdaysObjects, _newDay('ALLERHEILIGEN', _makeDate(year, 11, 1)));
    _pushUnique(specialdaysObjects, _newDay('ALLERSEELEN', _makeDate(year, 11, 2)));
    _pushUnique(specialdaysObjects, _newDay('MARTINSTAG', _makeDate(year, 11, 11)));
    _pushUnique(specialdaysObjects, _newDay('VOLKSTRAUERTAG', _makeDate(year, advent4th, -35)));
    _pushUnique(specialdaysObjects, _newDay('BUBETAG', _makeDate(year, advent4th, -32)));
    _pushUnique(specialdaysObjects, _newDay('TOTENSONNTAG', _makeDate(year, advent4th, -28)));
    _pushUnique(specialdaysObjects, _newDay('ADVENT1', _makeDate(year, advent4th, -21)));
    _pushUnique(specialdaysObjects, _newDay('NIKOLAUS', _makeDate(year, 12, 6)));
    _pushUnique(specialdaysObjects, _newDay('ADVENT2', _makeDate(year, advent4th, -14)));
    _pushUnique(specialdaysObjects, _newDay('ADVENT3', _makeDate(year, advent4th, -7)));
    _pushUnique(specialdaysObjects, _newDay('ADVENT4', advent4th));
    _pushUnique(specialdaysObjects, _newDay('ERSTERWEIHNACHTSFEIERTAG', christmas_date));
    _pushUnique(specialdaysObjects, _newDay('ZWEITERWEIHNACHTSFEIERTAG', _makeDate(year, 12, 26)));
    _pushUnique(specialdaysObjects, _newDay('SILVESTER', silvester));
    _pushUnique(specialdaysObjects, _newDay('VALENTINSTAG', _makeDate(year, 2, 14)));
    _pushUnique(specialdaysObjects, _newDay('ERNTEDANK', _makeDate(year, 10, 8 - oktFirst_Offset)));
    _pushUnique(specialdaysObjects, _newDay('MUTTERTAG', _makeDate(year, 5, 14 - silvester_Offset)));
    _pushUnique(specialdaysObjects, _newDay('WALPURGISNACHT', _makeDate(year, 4, 30)));
    _pushUnique(specialdaysObjects, _newDay('EISHEILIGEN1', _makeDate(year, 5, 11)));
    _pushUnique(specialdaysObjects, _newDay('EISHEILIGEN2', _makeDate(year, 5, 12)));
    _pushUnique(specialdaysObjects, _newDay('EISHEILIGEN3', _makeDate(year, 5, 13)));
    _pushUnique(specialdaysObjects, _newDay('EISHEILIGEN4', _makeDate(year, 5, 14)));
    _pushUnique(specialdaysObjects, _newDay('EISHEILIGEN5', _makeDate(year, 5, 15)));
    _pushUnique(specialdaysObjects, _newDay('HEILIGABEND', _makeDate(year, 12, 24)));

    specialdaysObjects.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );

    const holidayObjects = [];
    _addExtraDays(node.addHolidays, holidayObjects, year, ['ALWAYS'], easter_date, christmas_date, advent4th);

    specialdaysObjects.forEach( d => {
        if (d.regions.includes(region)) {
            _pushUnique(holidayObjects, d);
        }
    });
    holidayObjects.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );

    return {
        holidays: holidayObjects,
        specialdays: specialdaysObjects,
        integers: {
            holidays: generateIntegerRepresentation(holidayObjects),
            specialdays: generateIntegerRepresentation(specialdaysObjects)
        }
    };
}

/**
 * generates an integer representation array of the days array
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
 * Creates a new {@link Date}.
 * @param {Number|Date} yearOrRef  -  utc year of the day
 * @param {Number|Date} naturalMonthOrRef  - natural utc month (1-12) or a date object if the new Date should be calculated in realative to the given Date
 * @param {Number} day  - day of month (1 - 31) or if a reference Date is given the number of days as offset from the reference date
 * @returns {Date}  -  new Date
 * @private
 */
function _makeDate(year, naturalMonthOrRef, day) {
    if (typeof year === 'object') {
        year = year.getUTCFullYear();
    }

    if (typeof naturalMonthOrRef === 'object') {
        const date = new Date(naturalMonthOrRef.getTime());
        date.setDate(date.getDate() + day);
        return date;
    }

    if (naturalMonthOrRef > 12) {
        let sd = new Date(Date.UTC(year, naturalMonthOrRef - 13, 1)).getUTCDay();
        if (sd === 0) { sd = 7; }
        return new Date(Date.UTC(year, naturalMonthOrRef - 13, ((day + 7) - sd)));
    }

    return new Date(Date.UTC(year, naturalMonthOrRef - 1, day));
}

/**
 * generates a day object
 * @param {String} id  -  id of the object
 * @param {Date} date  -  date of the day
 * @param {String} [name]  -  name of the day
 * @param {Array} [regions]  -  valid regions of the day
 * @returns day
 * @private
 */
function _newDay(id, date, name, regions) {
    name = name || (holidayDef[id] ? holidayDef[id].nameDE : id);
    regions = regions || (holidayDef[id] ? holidayDef[id].isHoliday : []);
    return {
        id,
        name,
        regions,
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
 * add extra day definition to an day array
 * @param {Array} extraDays  -  extra day definition array
 * @param {Array} outArr  -  day array
 * @param {Number} year  -  year for makeDate
 * @param {String} region  -  region for make Date
 * @param {Date} easter_date  -  easter data for relative day setting
 * @param {Date} christmas_date  -  christmas data for relative day setting
 * @param {Date} advent4th  -  advent data for relative day setting
 */
function _addExtraDays(extraDays, outArr, year, region, easter_date, christmas_date, advent4th) {
    if (extraDays && extraDays.length > 0) {
        extraDays.forEach(d => {
            let month = parseInt(d.month);
            const day = parseInt(d.day);
            if (!isNaN(month) && !isNaN(day) && month <= 12 && month !== 0 && month >= -3 && day >= 1 && day <= 31) {
                if (month === easterX) {
                    month = easter_date;
                } else if (month === adventX) {
                    month = advent4th;
                }
                const id = pad2(month) + '-' + pad2(day);
                _pushUnique(outArr, _newDay(id, _makeDate(year, month, day), d.name, region));
            }
        });
    }
}

/**
 *
 * @param {Date} date
 * @returns {string}
 * @private
 */
function _localeDateObjectToDateString(date) {
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString().slice(0, 10);
}

/**
 * Returns the UTC timestamp of the given date with hours, minutes, seconds, and milliseconds set to zero.
 * @param {Date} date
 * @returns {number} UTC timestamp
 */
function toUtcTimestamp(date) {
    date.setUTCHours(0, 0, 0, 0);
    return date.getTime();
}

module.exports = function (RED) {
    function germanHolidaysNode(config) {
        RED.nodes.createNode(this, config);
        this.default = {
            today: new Date(),
            region: config.region
        };

        this.addHolidays = config.addHolidays;
        this.addSpecialdays = config.addSpecialdays;
        // const node = this;

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
                        const specialdays = _getSpecialDaysOfYear(this, outMsg.data.year, outMsg.data.region);
                        outMsg.payload = getDataForDate(dto, specialdays);
                        this.send(outMsg);
                        this.status({
                            fill: 'grey',
                            shape: 'ring',
                            text: _dateToString(outMsg.data.ts)
                        });
                        return;
                    }
                }

                if (typeof outMsg.data.ts === 'string') {
                    const dto = new Date(outMsg.data.ts);
                    if (dto !== 'Invalid Date' && !isNaN(dto)) {
                        outMsg.data.ts = dto;
                    }
                }

                _checkDefault(this);
                if ((typeof outMsg.data.ts === 'undefined') || !(outMsg.data.ts instanceof Date)) {
                    outMsg.data.ts = this.default.ts;
                }

                outMsg.data.year = outMsg.data.ts.getUTCFullYear();
                const dayObjs = _getSpecialDaysOfYear(this, outMsg.data.year, outMsg.data.region);

                if (typeof outMsg.data.day !== 'undefined' || !isNaN(outMsg.data.day)) {
                    outMsg.payload = getDataForDay(outMsg.data.ts, outMsg.data.day, dayObjs);
                    this.send(outMsg);
                    this.status({
                        fill: 'grey',
                        shape: 'ring',
                        text: _dateToString(outMsg.data.ts)
                    });
                    return;
                }

                outMsg.payload = {
                    // lastUpdate: outMsg.data.ts.toISOString(),
                    yesterday: {},
                    today: {},
                    tomorrow: {},
                    dayAfterTomorrow: {},
                    afterTheDayAfterTomorrow: {},
                    hollidays: dayObjs.holidays,
                    hollidaysNum: dayObjs.integers.holidays,
                    specialdays: dayObjs.specialdays,
                    specialdaysNum: dayObjs.integers.specialdays,
                    next: {},
                    weekNumber: getWeekNumber(outMsg.data.ts)
                };
                outMsg.payload.yesterday = getDataForDay(outMsg.data.ts, -1, dayObjs);
                outMsg.payload.today = getDataForDate(outMsg.data.ts, dayObjs, 0); // getDataForDay(outMsg.data.ts, 0, holidays);
                outMsg.payload.tomorrow = getDataForDay(outMsg.data.ts, 1, dayObjs);
                outMsg.payload.dayAfterTomorrow = getDataForDay(outMsg.data.ts, 2, dayObjs);
                outMsg.payload.afterTheDayAfterTomorrow = getDataForDay(outMsg.data.ts, 3, dayObjs);

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

                for (let i = 0; i < outMsg.payload.specialdays.length; i++) {
                    const sd = outMsg.payload.specialdays[i];
                    const d = sd.date;

                    const timeDiff = d.getTime() - outMsg.data.ts.getTime();
                    if (timeDiff > 0) {
                        outMsg.payload.next.specialday = sd;
                        outMsg.payload.next.specialdayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        break;
                    }
                }

                // 0 S 1 M 2 D 3 M 4 D 5 F 6 S 0 S
                outMsg.payload.next.weekendDayDiff = (6 - outMsg.payload.today.dayOfWeek);
                if (outMsg.payload.today.dayOfWeek === 6) {
                    const date = new Date(outMsg.data.ts);
                    date.setDate(date.getDate() + 1);
                    outMsg.payload.next.weekendDay = _newDay(dayNames[0].id, date, dayNames[0].nameDE);
                } else {
                    const dayOfWeek = 6; // Saturday
                    const date = new Date(outMsg.data.ts);
                    const diff = date.getDay() - dayOfWeek;
                    if (diff > 0) {
                        date.setDate(date.getDate() + 6);
                    } else if (diff < 0) {
                        date.setDate(date.getDate() + ((-1) * diff));
                    }

                    outMsg.payload.next.weekendDay = _newDay(dayNames[6].id, date, dayNames[6].nameDE);
                }

                outMsg.payload.next.weekendOrHolidayDiff = (outMsg.payload.next.hollidayDiff) ? Math.min(outMsg.payload.next.hollidayDiff, outMsg.payload.next.weekendDayDiff) : outMsg.payload.next.weekendDayDiff;
                if (outMsg.payload.next.holliday && (outMsg.payload.next.weekendOrHolidayDiff === outMsg.payload.next.hollidayDiff)) {
                    outMsg.payload.next.weekendOrHoliday = outMsg.payload.next.holliday;
                } else {
                    outMsg.payload.next.weekendOrHoliday = outMsg.payload.next.weekendDay;
                }

                this.status({
                    fill: 'grey',
                    shape: 'dot',
                    text: _dateToString(outMsg.data.ts)
                });
                this.send(outMsg);
            } catch (err) {
                errorHandler(this, err, 'Exception occurred on get german holidays', 'internal error');
            }
        });
    }

    RED.nodes.registerType('german-holidays', germanHolidaysNode);
};