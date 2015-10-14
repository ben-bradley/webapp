'use strict';

function indexHtml(request, reply) {
  reply.view('index', {
    api: 'foobar'
  });
}

module.exports = {
  indexHtml,
  indexCss: { file: __dirname + '/../public/index.css' },
  indexJs: { file: __dirname + '/../public/index.js' },
  directory: { path: __dirname + '/../public' }
};
