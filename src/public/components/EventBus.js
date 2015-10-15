'use strict';

import EE2 from 'EventEmitter2';

let { EventEmitter2 } = EE2;

let Bus = new EventEmitter2({
  wildcard: true
});

module.exports = Bus;
