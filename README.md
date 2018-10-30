# node-red-contrib-german-holidays for NodeRED

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/hypnos3/node-red-contrib-german-holidays/graphs/commit-activity)
[![GitHub version](https://badge.fury.io/gh/Hypnos3%2Fnode-red-contrib-german-holidays.svg)](https://github.com/hypnos3/node-red-contrib-german-holidays)
[![NPM version](https://badge.fury.io/js/node-red-contrib-german-holidays.svg)](http://badge.fury.io/js/node-red-contrib-german-holidays)
[![HitCount](http://hits.dwyl.io/hypnos3/node-red-contrib-german-holidays.svg)](http://hits.dwyl.io/hypnos3/node-red-contrib-german-holidays)
[![Dependencies Status](https://david-dm.org/hypnos3/node-red-contrib-german-holidays/status.svg)](https://david-dm.org/hypnos3/node-red-contrib-german-holidays)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Issues](https://img.shields.io/github/issues/hypnos3/node-red-contrib-german-holidays.svg?style=flat-square)](https://github.com/hypnos3/node-red-contrib-german-holidays/issues)

<!-- [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) -->

This node are for getting german holidays or information if today/tomorow is a holiday in german. his can be used for smart home.

> This is still in development!

## Installation

`npm install node-red-contrib-german-holidays`

## Quick Start

Simple flow that sends an mp3 to the chromecast or google cast device:

![example 1](images/example1.png?raw=true)

    [{"id":"2607227a.3c983e","type":"german-holidays","z":"c4313d2c.5d102","region":"SN","x":360,"y":100,"wires":[["dcaacec7.e1eb"]]},{"id":"dcaacec7.e1eb","type":"debug","z":"c4313d2c.5d102","name":"Holidays","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":560,"y":100,"wires":[]},{"id":"d2ed4078.52011","type":"inject","z":"c4313d2c.5d102","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"05 00 * * *","once":false,"onceDelay":0.1,"x":150,"y":100,"wires":[["2607227a.3c983e"]]}]

## Implemented Nodes

- german-holidays Node -get german holidays on any input

## How to use

### Configuration posibilities

![configuration of the node](images/node-german-holidays-properties.png?raw=true)

the region specifies the region for calculating the german holidays. If all is selected, all holidays are used (independend if they are really for all regions are available) and id "allgemeine" are used obnly holidays will be considered which are available in all regions of germany.

### Options for the incomming message object

The incomming messsage is mainly used for triogger the calculation. This will be done typically once per day. Nevertheless you have the following posibilitys to configure the working of the node by the following properties of the incomming messages:

- **region**, `msg.region` the region which should be used for getting holidays. Could also be defined in the configuration of the node. This property must be a string of two letters with the german state shortcut (BY=Bayern, BE=Berlin, ...).
- **ts**, `msg.ts` defines a timestamp for the source (today) for calculation of the data. if not defined today will be used.
- **day**, `msg.day` if defined only the Holiday information will get the relative to the timestamp (today by default). So if `msg.ts` is not defined, `msg.day = 0` is today, `msg.day = -1` is yesterday; `msg.day = 1` is tomorow, ... Additionally the output will be a day object **only** representing this day.
- **date**, `msg.date` if defined only the Holiday information for the defined date will given. If this is given, the output will be **only** a day object representing this day.

### generic day object

if the input property day or date was set, the payload is only a day object with the following properties. Otherwhise the payload is a more complex object for different days which are of type day-object (see below).

- `id` _string_ an id of the object (is the english name in upper case)
- `name` _string_ name of the day (in german).
- `dayOfWeek` _string_ the day of the week, where 1 is monday.
- `day` _number_ the day in month of the day
- `month` _number_ the month of the day.
- `year` _number_ the year of the day.
- `date` _number_ the day as javascript date.
- `dateString` _string_ the date of the day as string.
- (optional) `dayOffset` _number_ the offset to today in days (not every time available)
- `isSaturday` _boolean_ is true if the day is saturday.
- `isSunday` _boolean_ is true if the day is sunday.
- `isHoliday` _boolean_ is true if the day is an holiday.
- `isWeekend` _boolean_ is true if the day is sunday or saturday.
- `isSunOrHoliday` _boolean_ is true if the day is sunday or a holiday.
- `isWeekendOrHoliday` _boolean_ is true if the day is sunday, saturday or a holiday.
- (optional) `isBetweenSundayAndHoliday` _string_ is true if the day is a monday when tuseday is a holiday (only available on standard output for today, tomorrow and dayAfterTomorrow).
- (optional) `isBetweenHolidayAndSaturday` _string_ is true if the day is a fridey when thursday is a holiday (only available on standard output for today, tomorrow and dayAfterTomorrow).
- (optional) `isBetweenWeekendOrHoliday` _string_ is true if the day is not a saturday, sunday or a holiday, but the day before or after is saturday, sunday or a holiday (only available on standard output for today, tomorrow and dayAfterTomorrow).

### Output message object

if the input has no day or date property (default use case) the the payload is an object with the following properties

- `msg.payload.yesterday` _day-object_ day-object for the day before today.
- `msg.payload.today` _day-object_ day-object for today.
- `msg.payload.tomorrow` _day-object_ day-object for the day after today.
- `msg.payload.dayAfterTomorrow` _day-object_ day-object for the day after tomorrow.
- `msg.payload.afterTheDayAfterTomorrow` _day-object_ day-object for the day after tomorrow.
- `msg.payload.next` _object_ object representing information about the next holiday.
- `msg.payload.next.holliday` _day-object_ object representing the next holiday.
- `msg.payload.next.hollidayDiff` _number_ count of days until next holiday.
- `msg.payload.next.weekendDay` _day-object_ object representing the next saturday or sunday (if it is saturday).
- `msg.payload.next.weekendDayDiff` _number_ count of days until next saturday or sunday (if it is saturday).
- `msg.payload.next.weekendOrHoliday` _day-object_ object representing the next holiday or saturday or sunday (next free day).
- `msg.payload.next.weekendOrHolidayDiff` _number_ count of days until next holiday or saturday or sunday (next free day).
- `msg.payload.hollidays` _day-object_ An array of objects for every Holiday in the year.
- `msg.payload.hollidays` _array_ An array of objects for every Holiday in the year.
- `msg.payload.hollidaysNum` _array_ An array of numbers for every Holiday in the year.
- `msg.payload.weekNumber` _number_ weekNumber for today.
- `msg.payload.weekNumberEven` _boolean_ Is `true` if the weekNumber is even.

## Usage

Typically the node will be triggered at once every day and the result will be persistent in a global context. Then with a switch node the flows cann be conteolled by the usage of the properties of the object output.
Examples for using this node:

- shutter can be opened/closed on different timestamps based if today or tomorow is a holiday
- dimmer can set to different brightness based if it is a Holiday

![usage example](images/example2.png?raw=true)

    [{"id":"2607227a.3c983e","type":"german-holidays","z":"c4313d2c.5d102","name":"","region":"SN","x":420,"y":140,"wires":[["dcaacec7.e1eb","15259bce.575154"]]},{"id":"dcaacec7.e1eb","type":"debug","z":"c4313d2c.5d102","name":"Holidays","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":620,"y":100,"wires":[]},{"id":"d2ed4078.52011","type":"inject","z":"c4313d2c.5d102","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"05 00 * * *","once":false,"onceDelay":0.1,"x":150,"y":100,"wires":[["2607227a.3c983e"]]},{"id":"e4912846.3a1ca8","type":"inject","z":"c4313d2c.5d102","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":true,"onceDelay":"1","x":150,"y":180,"wires":[["2607227a.3c983e"]]},{"id":"1ab3e37c.4d15fd","type":"comment","z":"c4313d2c.5d102","name":"every day at midnight","info":"","x":180,"y":60,"wires":[]},{"id":"869da82f.484e48","type":"comment","z":"c4313d2c.5d102","name":"once on Node-Red start","info":"","x":180,"y":140,"wires":[]},{"id":"15259bce.575154","type":"change","z":"c4313d2c.5d102","name":"","rules":[{"t":"set","p":"day-info","pt":"global","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":650,"y":180,"wires":[[]]},{"id":"d2fe809f.3c90d","type":"switch","z":"c4313d2c.5d102","name":"","property":"day-info.today.isWeekendOrHoliday","propertyType":"global","rules":[{"t":"true"},{"t":"else"}],"checkall":"true","repair":false,"outputs":2,"x":410,"y":300,"wires":[["c73a89b5.6630f8"],["e245c8da.585928"]]},{"id":"26326493.2e010c","type":"inject","z":"c4313d2c.5d102","name":"","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":150,"y":300,"wires":[["d2fe809f.3c90d"]]},{"id":"c73a89b5.6630f8","type":"debug","z":"c4313d2c.5d102","name":"is Weekend or Holiday","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":660,"y":300,"wires":[]},{"id":"e245c8da.585928","type":"debug","z":"c4313d2c.5d102","name":"is not a Weekend and not a Holiday","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":700,"y":360,"wires":[]},{"id":"e427d079.51212","type":"comment","z":"c4313d2c.5d102","name":"Example for usage in switch node","info":"","x":210,"y":260,"wires":[]}]

## Bugs and Feedback

For bugs, questions and discussions please use the
[GitHub Issues](https://github.com/Hypnos3/node-red-contrib-german-holidays/issues).

### :moneybag: Donations [![Donate](https://img.shields.io/badge/donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=32NJPXPMR9YV8)
Even for those that don't have the technical knowhow to help developing on there are ways to support development. So if you want to donate some money please feel free to send money via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=32NJPXPMR9YV8).

## LICENSE

Licensed under the MIT License (MIT) License. (See LICENCE file)
This was developed by using the https://github.com/sfakir/feiertagejs.

## Other

 [![Greenkeeper badge](https://badges.greenkeeper.io/Hypnos3/node-red-contrib-german-holidays.svg)](https://greenkeeper.io/)
