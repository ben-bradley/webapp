'use strict';

import React from 'react';
import { Link } from 'react-router';

import AppBar from './AppBar';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar />
        <ul>
          <li><Link to="/user/bob" activeClassName="active">Bob</Link></li>
          <li><Link to="/user/bob" query={{ showAge: true }} activeClassName="active">Bob With Query Params</Link></li>
          <li><Link to="/user/sally" activeClassName="active">Sally</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

module.exports = App;
