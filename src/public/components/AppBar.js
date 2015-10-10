'use strict';

import MUI from 'material-ui';
import React from 'react';

class AppBar extends React.Component {

  render() {
    return <MUI.AppBar
      zDepth={0}
      showMenuIconButton={false}
      title="Framework Name" />
  }

}

module.exports = AppBar;
