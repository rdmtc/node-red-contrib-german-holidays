/********************************************
* german-holidays:
*********************************************/
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
    'ALL',
  ];
  
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
    'ZWEITERWEIHNACHTSFEIERTAG',
  ];
  
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
    SUNDAY: 'Sonntag',
  };
  
  const dayNames = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  /*******************************************************************************************************/
    const errorHandler = function(node, err, messageText, stateText) {
        if (!err) {
            return true;
        }
        if (err.message) {
            let msg = err.message.toLowerCase();
            messageText += ':' + err.message;
        } else {
            messageText += '! (No error message given!)';
        }

        if (node) {
            node.error(messageText);
            node.debug(JSON.stringify(err, Object.getOwnPropertyNames(err)));
            node.status({fill:"red",shape:"ring",text:stateText});
        } else if (console) {
            console.error(messageText);
            console.error(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        }
        return false;
    }
  /*******************************************************************************************************/
  function getDataForDay(offsetToday) {
    const date = new Date();
    if (offsetToday !== 0) {
      date.setDate(date.getDate() + offsetToday);
    }
    let d = date.getDay();
    
    const year = date.getFullYear();
    const internalDate = toUtcTimestamp(date);
    
    let result = {
      id : dayNames[d],
      day: d,
      month: date.getMonth(),
      year: date.getFullYear(),
      date,
      dateString: _localeDateObjectToDateString(date),
      dayOffset : offsetToday,
      holiday : holidays.objects.find(holiday => holiday.equals(date)),
      isSunday : (d === 0),
      isSaturday :  (d === 6),
    };
    result.isHoliday = ((typeof result.holiday !== 'undefined') && (result.holiday != null)); // holidays.integers.indexOf(internalDate) !== -1
    result.name = germanTranslations[result.id],
    result.isWeekend = result.isSaturday || result.isSaturday;
    result.isSunOrHoliday = result.isSaturday || result.isHoliday;
    result.isWeekendOrHoliday = result.isSaturday || result.isSaturday || result.isHoliday;
  
    return result;
  }
  
  // @flow
  
  /*!
   * feiertage.js
   * @repository https://github.com/sfakir/feiertagejs
   * @docs https://github.com/sfakir/feiertagejs/blob/master/docs.md
   *
   * Copyright 2015-2018 Simon Fakir
   * Released under the MIT license
   */
  
  // holidays api
  /**
   * Checks if the given holidayName is a valid {@link HolidayType}.
   * @param holidayName {@link HolidayType} to check
   * @throws {Error}
   * @private
   */
  function checkHolidayType(holidayName) {
    if (holidayName === null || holidayName === undefined) {
      throw new TypeError('holidayName must not be null or undefined');
    }
    if (allHolidays.indexOf(holidayName) === -1) {
      throw new Error(
        'feiertage.js: invalid holiday type "' + holidayName + '"! Must be one of ' + allHolidays.toString()
      );
    }
  }
  
  function isSpecificHoliday(
    date,
    holidayName
  ) {
    checkHolidayType(holidayName);
    return holidays.objects.find(holiday => holiday.equals(date)) !== undefined;
  }
  
  /**
   *
   * @param year
   * @param region
   * @returns objects: Array,integers
   * @private
   */
  function _getHolidaysOfYear(year, region) {
    const feiertageObjects = [
      _newHoliday('NEUJAHRSTAG', _makeDate(year, 1, 1)),
      _newHoliday('TAG_DER_ARBEIT', _makeDate(year, 5, 1)),
      _newHoliday('DEUTSCHEEINHEIT', _makeDate(year, 10, 3)),
      _newHoliday('ERSTERWEIHNACHTSFEIERTAG', _makeDate(year, 12, 25)),
      _newHoliday('ZWEITERWEIHNACHTSFEIERTAG', _makeDate(year, 12, 26)),
    ];
  
    const easter_date = getEasterDate(year);
    let karfreitag = new Date(easter_date.getTime());
    karfreitag = addDays(karfreitag, -2);
    let ostermontag = new Date(easter_date.getTime());
    ostermontag = addDays(ostermontag, 1);
    let christi_himmelfahrt = new Date(easter_date.getTime());
    christi_himmelfahrt = addDays(christi_himmelfahrt, 39);
    let pfingstsonntag = new Date(easter_date.getTime());
    pfingstsonntag = addDays(pfingstsonntag, 49);
  
    let pfingstmontag = new Date(easter_date.getTime());
    pfingstmontag = addDays(pfingstmontag, 50);
  
    feiertageObjects.push(_newHoliday('KARFREITAG', karfreitag));
    feiertageObjects.push(_newHoliday('OSTERMONTAG', ostermontag));
    feiertageObjects.push(_newHoliday('CHRISTIHIMMELFAHRT', christi_himmelfahrt));
    feiertageObjects.push(_newHoliday('PFINGSTMONTAG', pfingstmontag));
  
    // Heilige 3 Koenige
    if (
      region === 'BW' ||
      region === 'BY' ||
      region === 'ST' ||
      region === 'ALL'
    ) {
      feiertageObjects.push(
        _newHoliday('HEILIGEDREIKOENIGE', _makeDate(year, 1, 6))
      );
    }
    if (region === 'BB' || region === 'ALL') {
      feiertageObjects.push(_newHoliday('OSTERSONNTAG', easter_date));
      feiertageObjects.push(_newHoliday('PFINGSTSONNTAG', pfingstsonntag));
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
      feiertageObjects.push(_newHoliday('FRONLEICHNAM', fronleichnam));
    }
  
    // Maria Himmelfahrt
    if (region === 'SL' || region === 'BY') {
      feiertageObjects.push(
        _newHoliday('MARIAHIMMELFAHRT', _makeDate(year, 8, 15))
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
        _newHoliday('REFORMATIONSTAG', _makeDate(year, 10, 31))
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
      feiertageObjects.push(_newHoliday('ALLERHEILIGEN', _makeDate(year, 11, 1)));
    }
  
    // Buss und Bettag
    if (region === 'SN' || region === 'ALL') {
      // @todo write test
      const bussbettag = getBussBettag(year);
      feiertageObjects.push(
        _newHoliday(
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
      integers: generateIntegerRepresentation(feiertageObjects),
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
    return new Date(year, M - 1, D);
  }
  
  /**
   * Computes the "Buss- und Bettag"'s date.
   * @param jahr {number}
   * @returns {Date} the year's "Buss- und Bettag" date
   * @private
   */
  function getBussBettag(jahr) {
    const weihnachten = new Date(jahr, 11, 25, 12, 0, 0);
    const ersterAdventOffset = 32;
    let wochenTagOffset = weihnachten.getDay() % 7;
  
    if (wochenTagOffset === 0) wochenTagOffset = 7;
  
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
   * @param year
   * @param naturalMonth month (1-12)
   * @param day
   * @returns {Date}
   * @private
   */
  function _makeDate(year, naturalMonth, day) {
    return new Date(year, naturalMonth - 1, day);
  }
  
  /**
   *
   * @param id
   * @param date
   * @returns Holiday
   * @private
   */
  function _newHoliday(id, date) {
    return {
      id,
      name : germanTranslations[id],
      day: date.getUTCDay(),
      month: date.getUTCMonth(),
      year: date.getUTCFullYear(),
      date,
      dateString: _localeDateObjectToDateString(date),
      getNormalizedDate() {
        return toUtcTimestamp(this.date);
      },
      equals(date) {
        const string = _localeDateObjectToDateString(date);
        return this.dateString === string;
      },
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
   * Returns the UTC timestamp of the given date with hours, minutes, seconds, and milliseconds set to zero.
   * @param date
   * @returns {number} UTC timestamp
   */
  function toUtcTimestamp(date) {
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }
  

module.exports = function(RED) {
    function germanHolidaysNode(config) {
        RED.nodes.createNode(this,config);
        //var node = this;

        this.on('input', function (msg) {
            /********************************************
            * versenden:
            *********************************************/
            //var creds = RED.nodes.getNode(config.creds); - not used
            let attrs = ['region', 'url', 'contentType', 'message', 'language', 'ip', 'port', 'volume', 'lowerVolumeLimit', 'upperVolumeLimit', 'muted', 'delay', 'stop', 'pause', 'seek', 'duration'];

            var data = {};
            for (var attr of attrs) {
                if (config[attr]) {
                    data[attr] = config[attr];
                }
                if (msg[attr]) {
                    data[attr] = msg[attr];
                }
            }

            if (typeof msg.payload === 'object') {
                for (var attr of attrs) {
                    if (msg.payload[attr]) {
                        data[attr] = msg.payload[attr];
                    }
                }
            }
            //-------------------------------------------------------------------

            if (typeof data.region === 'undefined'|| data.region === '') {
                this.error("configuraton error: Region is missing!");
                this.status({fill:"red",shape:"dot",text:"No Region given!"});
                return;
            }
            if (allRegions.indexOf(data.region) === -1) {
                throw new Error(
                  'Invalid region: ' + data.region + '! Must be one of ' + allRegions.toString()
                );
            }            

            try {
                msg.data = data;                
                this.debug('start playing on cast device');
                this.debug(JSON.stringify(data));
                
                const now = new Date();
                const year = now.getFullYear();
                const holidays = _getHolidaysOfYear(year, data.region);
                
                msg.trigger = msg.payload;
                msg.ts = now;
                msg.payload = {
                  lastUpdate : now.toISOString(),
                  yesterday : {},
                  today : {},
                  tomorrow : {},
                  dayAfterTomorrow : {},
                  hollidays : holidays.objects,
                  hollidaysNum : holidays.integers,
                  next : {}
                };
                
                msg.payload.yesterday = getDataForDay(-1);
                msg.payload.today = getDataForDay(0);
                msg.payload.tomorrow = getDataForDay(1);
                msg.payload.dayAfterTomorrow = getDataForDay(2);
                
                //Brückentag?
                msg.payload.today.isBetweenSundayAndHoliday = (msg.payload.yesterday.isSunday && msg.payload.tomorrow.isHoliday);
                msg.payload.tomorrow.isBetweenSundayAndHoliday = (msg.payload.today.isSunday && msg.payload.dayAfterTomorrow.isHoliday);
                
                msg.payload.today.isBetweenHolidayAndSaturday = (msg.payload.yesterday.isHoliday && msg.payload.tomorrow.isSaturday);
                msg.payload.tomorrow.isBetweenHolidayAndSaturday = (msg.payload.today.isHoliday && msg.payload.dayAfterTomorrow.isSaturday);
                
                msg.payload.today.isBetweenWeekendOrHoliday = (msg.payload.yesterday.isWeekendOrHoliday && msg.payload.tomorrow.isWeekendOrHoliday && !msg.payload.today.isWeekendOrHoliday);
                msg.payload.tomorrow.isBetweenWeekendOrHoliday = (msg.payload.today.isWeekendOrHoliday && msg.payload.dayAfterTomorrow.isWeekendOrHoliday && !msg.payload.tomorrow.isWeekendOrHoliday);
                
                for (let i = 0; i < msg.payload.hollidays.length; i++) { 
                    let hd = msg.payload.hollidays[i];
                    let d = hd.date;
                    
                    var timeDiff = d.getTime() - msg.ts.getTime();
                    if (timeDiff > 0) {
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        msg.payload.next.holliday = hd;
                        msg.payload.next.hollidayDiff = diffDays;
                        break;
                    }
                }
                
                //0 S 1 M 2 D 3 M 4 D 5 F 6 S 0 S
                msg.payload.next.weekendOrHolidayDiff = (msg.payload.next.hollidayDiff) ? Math.min(msg.payload.next.hollidayDiff, 6 - msg.payload.today.day) : 6 - msg.payload.today.day;
                if (msg.payload.next.holliday && (msg.payload.next.weekendOrHolidayDiff == msg.payload.next.hollidayDiff)) {
                  msg.payload.next.weekendOrHoliday = msg.payload.next.holliday;
                } else {
                  let dayOfWeek = 6;//saturday
                  let date = new Date();
                  let diff = date.getDay() - dayOfWeek;
                  if (diff > 0) {
                      date.setDate(date.getDate() + 6);
                  }
                  else if (diff < 0) {
                      date.setDate(date.getDate() + ((-1) * diff))
                  }
                  msg.payload.next.weekendOrHoliday = _newHoliday('SATURDAY',date);
                }
                return msg;

            } catch (err) {
                errorHandler(this,err,'Exception occured on get german holidays', 'internal error');
            }
            //this.error("Input parameter wrong or missing. You need to setup (or give in the input message) the 'url' and 'content type' or the 'message' and 'language'!!");
            //this.status({fill:"red",shape:"dot",text:"error - input parameter"});
            return null;
        });
    }

    RED.nodes.registerType('german-holidays', germanHolidaysNode);
};
