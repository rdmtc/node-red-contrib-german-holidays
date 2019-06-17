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

const characteristic = {
    unspecified: 0,
    calendar: 1,
    holiday: 2, // Feiertag
    nationalholiday: 4, // Nationalfeiertag
    birthday: 8, // Geburtstag
    anniversary: 16,
    actionday: 32, // Aktionstag
    customday: 64, // Brauchtumstag
    specialday: 128, // Festtag
    remembranceday: 256, // Gedenktag
    carnival: 512, // Volksfest
    religion: 1024,
    event: 2048, // Veranstaltung
    festival: 4096, // Festspiele, Festival
    meeting: 8196, // Treffen, Tagung, Versammlung
    operation: 16384 // Einsatz
};

const easterX = -1;
const adventX = -2;

const holidayDef = {
    NEUJAHRSTAG: {
        name : 'Neujahrstag', // 1.1.
        month: 1,
        day: 1,
        regions: allRegions,
        character: characteristic.holiday
    },
    HEILIGEDREIKOENIGE: {
        name : 'Heilige Drei Könige', // 6.1.
        nameAlt: 'Epiphanias',
        month: 1,
        day: 6,
        regions: ['BW', 'BY', 'ST', 'ALL'],
        character: characteristic.holiday
    },
    KARFREITAG: {
        name : 'Karfreitag',
        month: easterX,
        day: -2,
        regions: allRegions,
        character: characteristic.holiday
    },
    OSTERSONNTAG: {
        name :  'Ostersonntag',
        month: easterX,
        day: 0,
        regions: ['BB', 'ALL'],
        character: characteristic.holiday
    },
    OSTERMONTAG: {
        name :  'Ostermontag',
        month: easterX,
        day: 1,
        regions: allRegions,
        character: characteristic.holiday
    },
    TAG_DER_ARBEIT: {
        name :  'Tag der Arbeit', // 1. Mai
        nameAlt: 'Maifeiertag',
        month: 5,
        day: 1,
        regions: allRegions,
        character: characteristic.holiday
    },
    CHRISTIHIMMELFAHRT: {
        name :  'Christi Himmelfahrt',
        nameAlt: 'Vatertag',
        month: easterX,
        day: 39,
        regions: allRegions,
        character: characteristic.holiday
    },
    PFINGSTSONNTAG: {
        name :  'Pfingstsonntag',
        month: easterX,
        day: 49,
        regions: ['BB', 'ALL'],
        character: characteristic.holiday
    },
    PFINGSTMONTAG: {
        name :  'Pfingstmontag',
        month: easterX,
        day: 50,
        regions: allRegions,
        character: characteristic.holiday
    },
    FRONLEICHNAM: {
        name :  'Fronleichnam',
        month: easterX,
        day: 60,
        regions: ['BW', 'HE', 'NW', 'RP', 'SL', 'ALL'],
        character: characteristic.holiday
    },
    MARIAHIMMELFAHRT: {
        name :  'Mariä Himmelfahrt',
        month: 8,
        day: 15,
        regions: ['SL', 'BY', 'ALL'],
        character: characteristic.holiday
    },
    DEUTSCHEEINHEIT: {
        name :  'Tag der Deutschen Einheit',
        month: 10,
        day: 3,
        regions: allRegions,
        character: characteristic.holiday
    },
    REFORMATIONSTAG: {
        name :  'Reformationstag', // 31. Oktober
        nameAlt: 'Halloween',
        month: 10,
        day: 31,
        regions: ['BB', 'MV', 'SN', 'ST', 'TH', 'ALL'],
        character: characteristic.holiday
    },
    ALLERHEILIGEN: {
        name :  'Allerheiligen',
        month: 11,
        day: 1,
        regions: ['BW', 'BY', 'NW', 'RP', 'SL', 'ALL'],
        character: characteristic.holiday
    },
    BUBETAG: {
        name :  'Buß- und Bettag',
        month: adventX,
        day: -32,
        regions: ['SN', 'ALL'],
        character: characteristic.holiday
    },
    ERSTERWEIHNACHTSFEIERTAG: {
        name :  '1. Weihnachtstag',
        month: 12,
        day: 25,
        regions: allRegions,
        character: characteristic.holiday
    },
    ZWEITERWEIHNACHTSFEIERTAG: {
        name : '2. Weihnachtstag',
        month: 12,
        day: 26,
        regions: allRegions,
        character: characteristic.holiday
    }
};

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
function _pad2(n) { // always returns a string
    return (n < 0 || (n > 9 ? '' : '0')) + n;
}

/**
 * Format a date do a string similar to ISO format, but with no secondy or milliseconds to be shorter
 * @param {Date} d Date to format
 *  @returns {string} date representation
 */
function _dateToString(d) {
    return d.getUTCFullYear() + '-' + _pad2(d.getUTCMonth() + 1) + '-' + _pad2(d.getUTCDate()) + 'T' + _pad2(d.getUTCHours()) + ':' + _pad2(d.getUTCMinutes()) + 'Z';
}
/*******************************************************************************************************/
/**
 * determinates the current week number of UTC timestamp.
 * @param d date for determinate week number
 * @returns number current week number
 */
function _getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function _checkDefault(node, ts) {
    const newYear = (new Date()).getUTCFullYear();
    if (newYear !== node.default.year) {
        node.default.ts = ts;
        node.default.year = newYear;
        node.default.dayObjs = _getSpecialDaysOfYear(node, node.default.year, undefined, true, true);
    }
}

/**
 * push an element to the days array, but test if already a day definition exists
 * @param {*} arr array
 * @param {*} el element to push
 */
function _pushUnique(arr, el) {
    if (!el) {
        return;
    }
    const pos = arr.findIndex( (x) => {
        return (el.day === x.day) && (el.month === x.month) && (el.year === x.year);
    });
    if (pos > -1) {
        return;
    }
    arr.push(el);
}

/**
 * added default holidays for a region
 * @param {Array} arrayToAdd array to add
 * @param {String} region region for adding
 */
function _addToArrayForRegion(arrayToAdd, region) {
    if (region && region !== '') {
        Object.keys(holidayDef).forEach((key) => {
            const d = holidayDef[key];
            if (d.regions.includes(region)) {
                d.id = key;
                arrayToAdd.push(d);
            }
        });
    }
}

/**
 * creates all data of special and holidays of a year
 * @param {*} node  -  the node object for debuging
 * @param {Number} year  -  the year for calculation of the special days
 * @param {String} [region]  -  force to recalculate, otherwise load existing data
 * @param {Boolean} [force]  -  force to recalculate, otherwise load existing data
 * @param {Boolean} [calcNext]  -  calculate the holiday also for the next year
 * @returns objects: Array
 * @private
 */
function _getSpecialDaysOfYear(node, year, region, force, calcNext) {
    node.debug(`_getSpecialDaysOfYear year=${year}, region=${region}, force=${force}, calcNext=${calcNext}`);

    if (node.default.dayObjs && (node.default.year === year) && (force !== true) && !region) {
        // node.debug('return default obj');
        return node.default.dayObjs;
    }

    const easter = _getEasterDate(year);
    const advent4th = _getAdvent4th(year);


    const holidayObjects = [];
    const specialdaysObjects = [];
    _addToArrayForRegion(holidayObjects, region);
    _addDaysToArray(node.holidaysArray, holidayObjects, year, easter, advent4th, node.characters);
    _addDaysToArray(node.specialdaysArray, specialdaysObjects, year, easter, advent4th, node.characters);

    if (calcNext === true) {
        const yearNext = year + 1;
        const easterNext = _getEasterDate(yearNext);
        const advent4thNext = _getAdvent4th(yearNext);

        _addDaysToArray(node.holidaysArray, holidayObjects, yearNext, easterNext, advent4thNext, node.characters);
        _addDaysToArray(node.specialdaysArray, specialdaysObjects, yearNext, easterNext, advent4thNext, node.characters);
    }

    holidayObjects.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );
    specialdaysObjects.sort(
        (a, b) => a.date.getTime() - b.date.getTime()
    );

    return {
        holidays: holidayObjects,
        specialdays: specialdaysObjects
    };
}

/**
 * Calculates the Easter date of a given year.
 * @param year {number}
 * @returns {Date} Easter date
 * @private
 */
function _getEasterDate(year) {
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
 * Calculates the 4th Advent date of a given year.
 * @param year {number}
 * @returns {Date} 4th Advent date
 * @private
 */
function _getAdvent4th(year) {
    const date = _makeDate(year, 12, 25);
    const offset = ((date.getDay() % 7) || 7);
    return _makeDate(year, date, -offset);
}

/**
 * get a {@link Date} for the specific day of week in the given month
 * @param {number} year year to check
 * @param {number} month month to check
 * @param {number} dayOfWeek day of week 0=Sunday, 1=Monday, ..., 6=Saturday
 * @param {number} n the nTh Numer of the day of week - 0 based
 * @returns {Date}  -  new Date
 */
function _firstNthWeekdayOfMonth(year, month, dayOfWeek, n) {
    const date = new Date(Date.UTC(year, month, 1));
    const add = (dayOfWeek - date.getDay() + 7) % 7 + n * 7;
    date.setDate(1 + add);
    return date;
}

/**
 * get a {@link Date} for the last specific day of week in the given month
 * @param {number} year year to check
 * @param {number} month month to check
 * @param {number} dayOfWeek day of week 0=Sunday, 1=Monday, ..., 6=Saturday
 * @param {number} n the nTh Numer of the day of week - 0 based
 * @returns {Date}  -  new Date
 */
function _lastNthWeekdayOfMonth(year, month, dayOfWeek, n) {
    const date = new Date(Date.UTC(year, month + 1, 0));
    const dy = date.getDay(); // day of week
    if ( dy < dayOfWeek) {
        dayOfWeek -= 7;
    }
    date.setDate(date.getDate() - (dy - dayOfWeek - n * 7));
    return date;
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

    if (typeof naturalMonthOrRef === 'object' && !isNaN(day)) {
        const date = new Date(naturalMonthOrRef.getTime());
        date.setDate(date.getDate() + day);
        return date;
    } else if (isNaN(naturalMonthOrRef) || isNaN(day) || naturalMonthOrRef < 1) {
        return null;
    }

    if (naturalMonthOrRef >= 13 && naturalMonthOrRef <= 24) {
        return _firstNthWeekdayOfMonth(year, naturalMonthOrRef - 13, (day % 7), Math.trunc(day / 7));
    }

    if (naturalMonthOrRef >= 25 && naturalMonthOrRef <= 36) {
        return _lastNthWeekdayOfMonth(year, naturalMonthOrRef - 25, (day % 7), Math.trunc(day / 7));
    }

    if (naturalMonthOrRef <= 12 && day >= 1 && day <= 31) {
        return new Date(Date.UTC(year, naturalMonthOrRef - 1, day));
    }
    return null;
}

/**
 * generates a day object
 * @param {String} id  -  id of the object
 * @param {Date} date  -  date of the day
 * @param {String} name  -  name of the day
 * @param {String} [nameAlt]  -  alterntive name of the day
 * @param {*} [character]  -  character of the day
 * @param {*} [characteristics]  -  characteristics of the day
 * @returns day
 * @private
 */
function _newDay(id, date, name, nameAlt, character, characteristics) {
    if (!date) {
        return null;
    }
    character = character || 0;
    const obj = {
        id,
        name,
        nameAlt,
        character,
        dayOfWeek: date.getDay(), // date.getUTCDay(),
        day: date.getDate(), // date.getUTCDate(),
        month: date.getMonth(), // date.getUTCMonth(),
        naturalMonth: date.getMonth() + 1,// date.getUTCMonth() + 1,
        year: date.getFullYear(), // date.getUTCFullYear(),
        date, // : new Date(year, month, day, hours, minutes, seconds, milliseconds),
        ts: _toTimestamp(date),
        tsUTC: _toUtcTimestamp(date),
        dateString: _localeDateObjectToDateString(date),
        dateISOString: date.toISOString(),
        characteristics,
        equals(date) {
            const string = _localeDateObjectToDateString(date);
            return this.dateString === string;
        }
    };
    if (!obj.id) {
        obj.id = (_pad2(obj.naturalMonth) + '-' + _pad2(obj.day));
    }
    return obj;
}

function _getCharacterNames(character, arr) {
    const result = [];
    if(character && arr) {
        arr.forEach(el => {
            if ((character & el.id) !== 0) { // bit is set
                result.push(el.name);
            }
        });
    }
    return result;
}

/**
 * add extra day definition to an day array
 * @param {Array} daysDefinitionArray  -  extra day definition array
 * @param {Array} outArr  -  day array
 * @param {Number} year  -  year for makeDate
 * @param {Date} easter_date  -  easter data for relative day setting
 * @param {Date} advent4th  -  advent data for relative day setting
 * @param {Array} characters  -  array of characteristics
 */
function _addDaysToArray(daysDefinitionArray, outArr, year, easter_date, advent4th, characters) {
    if (daysDefinitionArray && daysDefinitionArray.length > 0) {
        daysDefinitionArray.forEach(d => {
            let month = parseInt(d.month);
            const day = parseInt(d.day);
            if (!isNaN(month) && !isNaN(day) && month <= 24 && month !== 0 && month >= -3) {
                if (month === easterX) {
                    month = easter_date;
                } else if (month === adventX) {
                    month = advent4th;
                }
                _pushUnique(outArr, _newDay(d.id, _makeDate(year, month, day), d.name, d.nameAlt, d.character, _getCharacterNames(d.character, characters)));
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
function _toUtcTimestamp(date) {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d.getTime();
}

function _toTimestamp(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

module.exports = function (RED) {
    function germanHolidaysNode(config) {
        RED.nodes.createNode(this, config);
        this.default = {  };
        this.holidaysArray = config.holidays || [];
        this.specialdaysArray = config.specialdays || [];

        // this.debug('Holiday!!');
        // this.debug(JSON.stringify(config, Object.getOwnPropertyNames(config)));

        if (config.region && config.region !== '' && config.region !== null && typeof config.region !== 'undefined') {
            _addToArrayForRegion(this.holidaysArray, config.region);
            delete config.region;
        }

        this.characters = [];
        Object.keys(characteristic).forEach((key) => {
            const id = characteristic[key];
            this.characters.push({
                key,
                id,
                name : RED._('german-holidays.characteristic.' + key)
            });
        });

        // const node = this;

        /**
         * get the data for a date.
         * @param RED Red Data
         * @param date date to get data for
         * @param daysObjects list of daysObjects
         * @param offsetToday (optional)
         * @returns object of all information for the day
         */
        this.getDataForDate = (date, daysObjects, offsetToday) => {
            const d = date.getDay(); // gets the day of week
            const result = _newDay(undefined, date, RED._('german-holidays.days.' + d), RED._('german-holidays.days.' + (d + 7)));
            result.type = [{
                id: result.id,
                name: result.name,
                nameAlt: result.nameAlt,
                character: result.character,
                characteristics: result.characteristics
            }];

            result.isSunday = (result.dayOfWeek === 0);
            result.isSaturday = (result.dayOfWeek === 6);

            result.holiday = daysObjects.holidays.find(holiday => holiday.equals(date));
            result.isHoliday = ((typeof result.holiday !== 'undefined') && (result.holiday !== null));
            result.specialday = daysObjects.specialdays.find(specialday => specialday.equals(date));
            result.isSpecialday = ((typeof result.specialday !== 'undefined') && (result.specialday !== null));

            if (offsetToday) {
                result.dayOffset = offsetToday;
            }

            result.isWeekend = result.isSunday || result.isSaturday;
            result.isSunOrHoliday = result.isSunday || result.isHoliday;
            result.isWeekendOrHoliday = result.isSaturday || result.isSunday || result.isHoliday;
            result.isHolidayOrSpecialday = result.isHoliday || result.isSpecialday;

            if (result.isHoliday) {
                result.id = result.holiday.id;
                result.name = result.holiday.name;
                result.nameAlt = result.holiday.nameAlt;
            } else if (result.isSpecialday) {
                result.id = result.specialday.id;
                result.name = result.specialday.name;
                result.nameAlt = result.specialday.nameAlt;
            }

            if (result.holiday) {
                result.type.push(result.holiday);
                result.character |= result.holiday.character;
            }
            if (result.specialday) {
                result.type.push(result.specialday);
                result.character |= result.specialday.character;
            }
            result.characteristics = _getCharacterNames(result.character, this.characters);

            return result;
        };

        /**
         * get Holiday Data for a specific Day
         * @param {Date} date Date to check
         * @param {*} [offsetToday] offset from today
         * @param {*} daysObjects Holidays object Data
         * @returns object of all information for the day
         */
        this.getDataForDay = (date, offsetToday, daysObjects) => {
            if (offsetToday !== 0) {
                const d = new Date(date);
                d.setDate(d.getDate() + offsetToday);
                return this.getDataForDate(d, daysObjects, offsetToday);
            }

            return this.getDataForDate(date, daysObjects, 0);
        };

        this.on('input', function (msg) {
            // this.debug('Holiday!! Start');
            try {
                /********************************************
                * versenden:
                *********************************************/
                // var creds = RED.nodes.getNode(config.creds); - not used
                const attrs = ['region', 'day', 'date', 'ts', 'year'];

                const outMsg = RED.util.cloneMessage(msg);
                outMsg.data = {};

                for (const attr of attrs) {
                    // value === 'undefined' || value === null --> value == null
                    if ((config[attr] != null) && (config[attr] !== '')) { // eslint-disable-line
                        outMsg.data[attr] = config[attr];
                    }
                    if ((msg[attr] != null) && (msg[attr] !== '')) { // eslint-disable-line
                        outMsg.data[attr] = msg[attr];
                        delete outMsg[attr];
                    }
                }

                if (typeof msg.payload === 'object') {
                    for (const attr of attrs) {
                        if ((msg.payload[attr] != null) && (msg.payload[attr] !== '')) { // eslint-disable-line
                            outMsg.data[attr] = msg.payload[attr];
                        }
                    }
                } else if ((typeof outMsg.data.ts === 'undefined') && ((typeof msg.payload === 'string') || (msg.payload instanceof Date)) || (typeof msg.payload === 'number')) {
                    const dto = new Date(msg.payload);
                    if (dto !== 'Invalid Date' && !isNaN(dto)) {
                        outMsg.data.comment = 'data.ts from payload [string] "' + msg.payload + '" = ' + dto.toISOString();
                        outMsg.data.ts = dto;
                    }
                }

                if (outMsg.data.ts instanceof Date) {
                    outMsg.data.comment = 'data.ts [date] = ' + outMsg.data.ts.toISOString();
                } else if (typeof outMsg.data.ts === 'string' || (typeof outMsg.data.ts === 'number')) {
                    const dto = new Date(outMsg.data.ts);
                    if (dto !== 'Invalid Date' && !isNaN(dto)) {
                        outMsg.data.comment = 'data.ts [string] "' + outMsg.data.ts + '" = ' + dto.toISOString();
                        outMsg.data.ts = dto;
                    } else {
                        outMsg.data.ts = new Date();
                        outMsg.data.comment = 'use default timestamp ' + outMsg.data.ts.toISOString();
                    }
                } else {
                    outMsg.data.ts = new Date();
                    outMsg.data.comment = 'use default timestamp ' + outMsg.data.ts.toISOString();
                }

                outMsg.payload = {};

                if (!(outMsg.data.ts instanceof Date)) {
                    outMsg.data.ts = new Date();
                    outMsg.data.comment = 'use default timestamp ' + outMsg.data.ts.toISOString();
                }

                // outMsg.data.year = outMsg.data.ts.getFullYear();
                outMsg.data.year = outMsg.data.ts.getUTCFullYear();

                // this.debug(JSON.stringify(outMsg, Object.getOwnPropertyNames(outMsg)));
                //-------------------------------------------------------------------
                if (this.holidaysArray.length < 0) {
                    this.error('configuration error: No Holiday is defined. At least one Holiday must be configured!');
                    this.status({
                        fill: 'red',
                        shape: 'dot',
                        text: 'No Region given!'
                    });
                    return;
                }

                if (typeof outMsg.data.region !== 'undefined' && outMsg.data.region !== '' && outMsg.data.region !== null) {
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
                } else {
                    delete outMsg.data.region;
                }

                if ((typeof outMsg.data.date !== 'undefined') && ((outMsg.data.date instanceof Date) || (typeof outMsg.data.date === 'string'))) {
                    const dto = new Date(outMsg.data.date);
                    if (dto !== 'Invalid Date' && !isNaN(dto)) {
                        outMsg.data.comment = 'data date';
                        outMsg.data.year = dto.getUTCFullYear();
                        const specialdays = _getSpecialDaysOfYear(this, outMsg.data.year, outMsg.data.region);
                        outMsg.payload = this.getDataForDate(dto, specialdays);
                        this.send(outMsg);
                        this.status({
                            fill: 'grey',
                            shape: 'ring',
                            text: _dateToString(dto)
                        });
                        return;
                    }
                }

                _checkDefault(this, outMsg.data.ts);

                if (typeof outMsg.data.day !== 'undefined' || !isNaN(outMsg.data.day)) {
                    outMsg.data.year = outMsg.data.ts.getUTCFullYear();
                    const dataObjs = _getSpecialDaysOfYear(this, outMsg.data.year, outMsg.data.region);

                    outMsg.payload = this.getDataForDay(outMsg.data.ts, outMsg.data.day, dataObjs);
                    this.send(outMsg);
                    this.status({
                        fill: 'grey',
                        shape: 'ring',
                        text: _dateToString(outMsg.data.ts)
                    });
                    return;
                }

                const dayObjs = _getSpecialDaysOfYear(this, outMsg.data.year, outMsg.data.region);

                outMsg.payload = {
                    // lastUpdate: outMsg.data.ts.toISOString(),
                    yesterday: {},
                    today: {},
                    tomorrow: {},
                    dayAfterTomorrow: {},
                    afterTheDayAfterTomorrow: {},
                    hollidays: dayObjs.holidays,
                    specialdays: dayObjs.specialdays,
                    next: {
                        hollidays : [],
                        hollidaysDiff : [],
                        specialdays: [],
                        specialdaysDiff: []
                    },
                    weekNumber: _getWeekNumber(outMsg.data.ts)
                };
                outMsg.payload.yesterday = this.getDataForDay(outMsg.data.ts, -1, dayObjs);
                outMsg.payload.today = this.getDataForDate(outMsg.data.ts, dayObjs, 0); // getDataForDay(outMsg.data.ts, 0, holidays);
                outMsg.payload.tomorrow = this.getDataForDay(outMsg.data.ts, 1, dayObjs);
                outMsg.payload.dayAfterTomorrow = this.getDataForDay(outMsg.data.ts, 2, dayObjs);
                outMsg.payload.afterTheDayAfterTomorrow = this.getDataForDay(outMsg.data.ts, 3, dayObjs);

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

                const tNow = outMsg.data.ts.getTime();
                // const t7 = outMsg.data.ts.getTime() + 604800000;

                for (let i = 0; i < outMsg.payload.hollidays.length; i++) {
                    const hd = outMsg.payload.hollidays[i];
                    const d = hd.date;

                    const time = d.getTime();
                    if (time > tNow) {
                        hd.diff = (time - tNow);
                        hd.diffDays = Math.ceil(hd.diff / (1000 * 3600 * 24));
                        outMsg.payload.next.hollidays.push(hd);
                        if (outMsg.payload.next.hollidays.length > 9) {
                            break;
                        }
                    }
                }
                if (outMsg.payload.next.hollidays[0]) {
                    outMsg.payload.next.holliday = outMsg.payload.next.hollidays[0];
                    outMsg.payload.next.hollidayDiff = outMsg.payload.next.hollidays[0].diffDays;
                }

                for (let i = 0; i < outMsg.payload.specialdays.length; i++) {
                    const sd = outMsg.payload.specialdays[i];
                    const d = sd.date;
                    const time = d.getTime();
                    if (time > tNow) {
                        sd.diff = (time - tNow);
                        sd.diffDays = Math.ceil(sd.diff / (1000 * 3600 * 24));
                        outMsg.payload.next.specialdays.push(sd);
                        if (outMsg.payload.next.specialdays.length > 9) {
                            break;
                        }
                    }
                }
                if (outMsg.payload.next.specialdays[0]) {
                    outMsg.payload.next.specialday = outMsg.payload.next.specialdays[0];
                }

                // 0 S 1 M 2 D 3 M 4 D 5 F 6 S 0 S
                outMsg.payload.next.weekendDayDiff = (6 - outMsg.payload.today.dayOfWeek);
                if (outMsg.payload.today.dayOfWeek === 6) {
                    const date = new Date(outMsg.data.ts);
                    date.setDate(date.getDate() + 1);
                    outMsg.payload.next.weekendDay = _newDay(undefined, date, RED._('german-holidays.days.0'), RED._('german-holidays.days.7'));
                } else {
                    const dayOfWeek = 6; // Saturday
                    const date = new Date(outMsg.data.ts);
                    const diff = date.getDay() - dayOfWeek;
                    if (diff > 0) {
                        date.setDate(date.getDate() + 6);
                    } else if (diff < 0) {
                        date.setDate(date.getDate() + ((-1) * diff));
                    }

                    outMsg.payload.next.weekendDay = _newDay(undefined, date, RED._('german-holidays.days.6'), RED._('german-holidays.days.13'));
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