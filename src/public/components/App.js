'use strict';

// Import Libraries
import React from 'react';
import { Link } from 'react-router';
import MUI from 'material-ui';

const { ThemeManager } = MUI.Styles;

// Import Components
import Theme from './Theme';
import AppBar from './AppBar';

class App extends React.Component {

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    };
  }

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

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = App;
