'use strict';

import React from 'react';
import { createHistory, useBasename } from 'history';
import { Router, Route, Link } from 'react-router';

import App from './components/App';
import User from './components/User';

const History = useBasename(createHistory)({
  // this needs to align with src/routes/public.js
  basename: '/' + APPNAME
});

const Routes = [{
  path: '/',
  component: App
}, {
  path: '/rows/:rows/cols/:cols',
  component: App
}];

React.render((
  <Router history={History} routes={Routes} />
), document.getElementById('app'));
