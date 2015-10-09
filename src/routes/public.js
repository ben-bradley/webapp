'use strict';

module.exports = [{
  method: 'get',
  path: '/',
  handler: (request, reply) => {
    reply('index.html');
  }
}];
