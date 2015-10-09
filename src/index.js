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

server.register(Vision, (err) => {
  if (err)
    throw new Error(err);
    
  server.views({
    engines: { html: Handlebars },
    path: __dirname + '/public'
  });
});

server.register(Inert, (err) => {
  if (err)
    throw new Error(err);
});

server.route(routes.public);

server.start((err) => {
  if (err)
    throw new Error(err);
  console.log('server started on ' + config.port);
});
