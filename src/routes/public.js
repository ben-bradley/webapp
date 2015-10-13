'use strict';

import handlers from '../handlers';

module.exports = [{
  method: 'get',
  path: '/',
  config: {
    description: 'This returns the main app view/page',
    handler: handlers.public.indexView
  }
}, {
  method: 'get',
  path: '/webapp/{param*}',
  config: {
    description: 'This returns the main app view/page',
    handler: handlers.public.indexView
  }
}, {
  method: 'get',
  path: '/{param*}',
  config: {
    description: 'This tries to return an actual file to the browser',
    handler: {
      directory: handlers.public.directory
    }
  }
}];
