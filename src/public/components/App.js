'use strict';

// Import Libraries
import React from 'react';
import { Link } from 'react-router';
import MUI from 'material-ui';

const { ThemeManager } = MUI.Styles;

// Import Components
import Theme from './Theme';
import AppBar from './AppBar';
import Grid from './Grid';
import Bus from './EventBus';

class App extends React.Component {

  constructor(props) {
    super(props);

    let { rows, cols } = props.params;

    this.state = {
      rows: Number(rows) || 3,
      cols: Number(cols) || 4,
      cards: []
    };

    Bus.on('update.rows', (_rows) => {
      this.setState({ rows: _rows });
      console.log('!update.rows', this.state);
    });

    Bus.on('update.cols', (_cols) => {
      this.setState({ cols: _cols });
      console.log('!update.cols', this.state);
    });

    Bus.on('update.cards', (_cards) => {
      this.setState({ cards: _cards });
    });
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    };
  }

  buildCards() {
    console.log('buildCards()', this.state);

    let { rows, cols } = this.state,
      cards = [],
      cardCount = rows * cols;

    while (cards.length < cardCount)
      cards.push(new Card());

    Bus.emit('update.cards', cards);
  }

  componentDidMount() {
    this.buildCards();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentWillUpdate()');

    let { rows, cols } = this.state;

    if (prevState.rows !== rows || prevState.cols !== cols)
      this.buildCards();
  }

  render() {
    let { rows, cols, cards } = this.state;

    return (
      <div>
        <AppBar rows={rows} cols={cols} />
        <Grid cols={cols} cards={cards} />
      </div>
    );
  }
}

function Card() {
  return {
    foo: 'bar'
  };
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = App;
