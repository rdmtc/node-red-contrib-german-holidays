### CHANGELOG

#### 0.1.8: Maintenance Release

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
