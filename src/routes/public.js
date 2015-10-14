'use strict';

import handlers from '../handlers';

module.exports = [ {
  method: 'get',
  path: '/',
  config: {
    description: 'This returns the main app view/page',
    handler: handlers.public.indexHtml
  }
}, {
  method: 'get',
  // this needs to align with src/public/index.js
  path: '/webapp/{param*}',
  config: {
    description: 'This returns the main app view/page',
    handler: handlers.public.indexHtml
  }
}, {
  method: 'get',
  path: '/index.js',
  config: {
    description: 'This returns the actual file to the browser',
    handler: handlers.public.indexJs
  }
}, {
  method: 'get',
  path: '/index.css',
  config: {
    description: 'This returns the actual file to the browser',
    handler: handlers.public.indexCss
  }
} ];
