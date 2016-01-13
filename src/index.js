'use strict';

import Hapi from 'hapi';
import config from 'config';
import Vision from 'vision';
import Handlebars from 'handlebars';
import Inert from 'inert';
import Nes from 'nes';
import Debug from 'debug';

import routes from './routes';

let debug = new Debug(config.name + ':/index');

let server = new Hapi.Server();

server.connection({
  port: config.port
});

debug('registering plugins...');
server.register([ Vision, Inert, Nes ], (err) => {
  if (err)
    throw new Error(err);

  server.views({
    engines: { html: Handlebars },
    path: __dirname + '/public'
  });

  /* Broadcasting */
  setInterval(() => server.broadcast(new Date()), 500);

  /* Namespace for websockets */
  server.subscription('/ws/{app}');
  setInterval(() => server.publish('/ws/time', new Date()), 1100);

  debug('registered plugins!');
});

debug('adding routes...');
server.route(routes);

debug('starting server...');
server.start((err) => {
  if (err)
    throw new Error(err);

  console.log('server started on ' + config.port);
  debug('started server!');
});
