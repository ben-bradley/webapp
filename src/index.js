'use strict';

import Hapi from 'hapi';
import config from 'config';

import routes from './routes';

let debug = require('debug')('index');

let server = new Hapi.Server();

server.connection({
  port: config.port
});

server.route({
  method: 'get',
  path: '/',
  handler: (request, reply) => {
    reply('ok!');
  }
});

server.route(routes.public);

server.start((err) => {
  if (err)
    throw new Error(err);
  console.log('server started on ' + config.port);
});
