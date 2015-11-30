'use strict';

import Hapi from 'hapi';
import config from 'config';
import Vision from 'vision';
import Handlebars from 'handlebars';
import Inert from 'inert';

import routes from './routes';

let debug = require('debug')('index');

let server = new Hapi.Server();

server.connection({
  port: config.port
});

debug('registering plugins...');
server.register([ Vision, Inert ], (err) => {
  if (err)
    throw new Error(err);

  server.views({
    engines: { html: Handlebars },
    path: __dirname + '/public'
  });
  debug('registered plugins!');
});

debug('adding routes...');
server.route(routes.public);

debug('starting server...');
server.start((err) => {
  if (err)
    throw new Error(err);
  console.log('server started on ' + config.port);
  debug('started server!');
});
