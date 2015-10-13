'use strict';

function indexView(request, reply) {
  reply.view('index', {
    api: 'foobar'
  });
}

module.exports = {
  indexView,
  directory: {
    path: __dirname + '/../public'
  }
};
