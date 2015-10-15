'use strict';

import React from 'react';
import MUI from 'material-ui';

class Grid extends React.Component {
  render() {
    let { rows, cols, cards } = this.props;

    console.log(this);

    return (
      <MUI.GridList cols={cols} cellHeight={180}>
        {cards.map((card, i) => {
          return <Card i={i} card={card} />;
        })}
      </MUI.GridList>
    );
  }
}

class Card extends React.Component {

  render() {
    return (
      <MUI.GridTile title={'card-' + this.props.i}>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </MUI.GridTile>
    );
  }

}

module.exports = Grid;
