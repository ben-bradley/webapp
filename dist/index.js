'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var debug = require('debug')('index');

var server = new _hapi2['default'].Server();

server.connection({
  port: _config2['default'].port
});

server.register(_vision2['default'], function (err) {
  if (err) throw new Error(err);

  server.views({
    engines: { html: _handlebars2['default'] },
    path: __dirname + '/public'
  });
});

server.register(_inert2['default'], function (err) {
  if (err) throw new Error(err);
});

server.route(_routes2['default']['public']);

server.start(function (err) {
  if (err) throw new Error(err);
  console.log('server started on ' + _config2['default'].port);
});