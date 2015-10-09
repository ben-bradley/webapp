'use strict';

module.exports = [{
  method: 'get',
  path: '/',
  config: {
    description: 'This returns the main app view/page',
    handler: function handler(request, reply) {
      reply.view('index', {
        api: 'foobar'
      });
    }
  }
}, {
  method: 'get',
  path: '/{param*}',
  config: {
    description: 'This tries to return an actual file to the browser',
    handler: {
      directory: {
        path: __dirname + '/../public'
      }
    }
  }
}];