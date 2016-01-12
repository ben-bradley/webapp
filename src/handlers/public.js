'use strict';

import config from 'config';

function indexHtml(request, reply) {
  reply.view('index', config.browserGlobals);
}

export default {
  indexHtml,
  indexCss: { file: __dirname + '/../public/index.css' },
  indexJs: { file: __dirname + '/../public/index.js' },
  directory: { path: __dirname + '/../public' }
};
