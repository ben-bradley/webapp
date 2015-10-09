'use strict';

import React from 'react';
import Router from 'react-router';
// import { Router, Route, Link } from 'react-router';

let { Route, Link } = Router;

class App extends React.Component {
  render() {
    return <div>
      <h1>This is the APP!</h1>
      <ul>
        <li>links follow</li>
        <li><Link to="/foo">foo</Link></li>
        <li><Link to="/bar">bar</Link></li>
      </ul>
      {this.props.children}
    </div>;
  }
}

class Main extends React.Component {
  render() {
    console.log('rendering Main');
    return <h1>MAIN!</h1>;
  }
}

class Foo extends React.Component {
  render() {
    console.log('rendering Foo');
    return <h1>FOO!</h1>;
  }
}

class Bar extends React.Component{
  render() {
    console.log('rendering Bar');
    return <h1>BAR!</h1>;
  }
}

const routes = <Route handler={App}>
  <Route path="/" component={Main} />
  <Route path="foo" component={Foo} />
  <Route path="bar" component={Bar} />
</Route>;

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});

// React.render(<Router routes={routes} />, document.body);
