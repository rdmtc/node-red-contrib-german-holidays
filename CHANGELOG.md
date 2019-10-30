### CHANGELOG

#### 0.1.14 - maintenance

- removed peer dependencies

#### 0.1.13: critical bug fix

- fixed bug with the code prepared for Node-Red 1.0. The recommend way for be backward compatible doesn't work. This is [also](https://discourse.nodered.org/t/knowing-when-a-node-is-done-new-node-api/15737/9) confirmed by @knolleary.

#### 0.1.12: Maintenance Release

 - more changes for node-red 1.0 (https://nodered.org/blog/2019/09/20/node-done)
 - updated dependencies
 - added node-red 0.19.0 as required version

#### 0.1.11: Maintenance Release

- added Weltkindertag as holiday for Thüringen
- added WELTFRAUENTAG as special day
- added FRIEDENSFEST as special day

#### 0.1.10: Maintenance Release

- updated dependencies

#### 0.1.9: Maintenance Release

- fix display problem in node-red 0.2.x, caused by preparations for node-red 1.0

#### 0.1.8: Maintenance Release

- fix, added Fronleichnam to region BY
- smaller changes in layout of clear/add button of the lists in settings of the node

#### 0.1.7: Maintenance Release

- no changes, only re-released, to fix node-red repository

#### 0.1.6: Maintenance Release

- reworked data model
  - no longer integer representation as array
  - added integer representation to every day object as ts and tsUTC property
- renamed predefined special days
- added changelog
- fixed problem with UTC and weekend detection

#### 0.1.5: Maintenance Release

- added characteristic for holidays and special days
- added more pre-defined special days
- reworked data model
  - removed `weekday` property of a day (now `type[0]`)
  - added for a day a `type` property to a day definition as an array. Where the first element is the day of week information and all following will contain holiday and special day data - preparation for future possibility to have more than one special day at same time
- fixed some data for pre-defined special days

#### 0.1.4: Maintenance Release

- changed implementation day of week for a month (e.g. first Sunday of month, example Erntedank, Muttertag)capability
- added possibility to define days as day of week from end of a month (e.g. last Monday of month)
- reduced logging
- fixed links in documentation

#### 0.1.3: Maintenance Release

- only documentation changed

#### 0.1.2: Maintenance Release

- added holidays for Austria
- fixed pre-defined data for 1th may

#### 0.1.0: Release

- added possibility for a free definition of holidays and special days
