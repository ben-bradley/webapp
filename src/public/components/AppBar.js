'use strict';

import React from 'react';
import MUI from 'material-ui';

import Bus from './EventBus';

class AppBar extends React.Component {

  setRows(ev) {
    let rows = Number(ev.target.value);

    Bus.emit('update.rows', rows);
  }

  setCols(ev) {
    let cols = Number(ev.target.value);

    Bus.emit('update.cols', cols);
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { rows, cols } = this.props;
    return (
      <MUI.AppBar
        zDepth={0}
        showMenuIconButton={false}
        title={TITLE}>
        <MUI.TextField
          defaultValue={rows}
          floatingLabelText='Rows'
          onChange={this.setRows} />
        <MUI.TextField
          defaultValue={cols}
          floatingLabelText='Columns'
          multiLine={true}
          onChange={this.setCols} />
      </MUI.AppBar>
    );
  }

}

module.exports = AppBar;
