import React, { Component } from 'react';
import './App.css';

var playerOneCtr = 0;
var playerTwoCtr = 0;
var oneIsNext = true;
var counters = [];

function Horizontal(props) {
  var btnClass = 'horizontal';
  if (props.value) {
    btnClass = 'horizontal-played';
  };

  return (
    <button className={btnClass} onClick={props.onClick}>
    </button>
  );
}

function Vertical(props) {
  var btnClass = 'vertical';
  if (props.value) {
    btnClass = 'vertical-played';
  };

  return (
    <button className={btnClass} onClick={props.onClick}>
    </button>
  );
}

function Square(props) {
  return (
    <button className="square">
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  constructor() {
    super();
    this.state = {
      verticals: Array(36).fill(null),
      horizontals: Array(36).fill(null),
      squares: Array(36).fill(null),
    };
  }

  squareComplete(i) {
    if (i === 4) {
      if (oneIsNext) {
        playerOneCtr ++;
      }
      else {
        playerTwoCtr ++;
      }
      return oneIsNext ? "1" : "2";
    }
    else {
      return null;
    }
  }

  handleHorizontalClick(i) {
    const horizontals = this.state.horizontals.slice();
    const squares = this.state.squares.slice();
    let squareWinner;
    let changePlayer = true;

    if (horizontals[i] || ((i+1) % 6 === 0)) {
      return;
    }
    horizontals[i] = true;
    counters[i]++;

    squareWinner = this.squareComplete(counters[i]);

    if (squareWinner) {
      squares[i] = squareWinner;
      changePlayer = false;
    }

    if (i > 5){
      counters[i-6]++;
      squareWinner = this.squareComplete(counters[i-6]);

      if (squareWinner) {
        squares[i-6] = squareWinner;
        changePlayer = false;
      }

    }

    if (changePlayer) {
      oneIsNext = !oneIsNext;
    }

    this.setState({
      horizontals: horizontals,
      squares: squares,
    });
  }

  renderHorizontal(i) {
    return (
      <Horizontal
        value={this.state.horizontals[i]}
        onClick={() => this.handleHorizontalClick(i)}
      />
    );
  }

  handleVerticalClick(i) {
    const verticals = this.state.verticals.slice();
    const squares = this.state.squares.slice();
    let squareWinner;
    let changePlayer = true;

    if (verticals[i]) {
      return;
    }
    verticals[i] = true;
    counters[i]++;
    squareWinner = this.squareComplete(counters[i]);

    if (squareWinner) {
      squares[i] = squareWinner;
      changePlayer = false;
    }

    if (i > 0) {
      counters[i-1]++;
      squareWinner = this.squareComplete(counters[i-1]);

      if (squareWinner) {
        squares[i-1] = squareWinner;
        changePlayer = false;
      }

    };

    if (changePlayer) {
      oneIsNext = !oneIsNext;
    }

    this.setState({
      verticals: verticals,
      squares: squares,
    });

  }

  renderVertical(i) {
    return (
      <Vertical
        value={this.state.verticals[i]}
        onClick={() => this.handleVerticalClick(i)}
      />
    );
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
      />
    );
  }

  calculateWinner() {
    if (playerOneCtr > 12) {
      return '1';
    }
    else if (playerTwoCtr > 12) {
      return '2';
    }
    else {
      return null;
    }
  }

  render() {
    var rows = [];
    var sides = [];

    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        sides.push(this.renderHorizontal(i * 6 + j))
      }
      rows.push(<div className="board-row">
                  {sides}
                </div>)
      sides = []
      if (i < 5) {
        for (j = 0; j < 6; j++) {
          sides.push(this.renderVertical(i * 6 + j),
                     this.renderSquare(i * 6 + j))
        }
        rows.push(<div className="board-row">
                    {sides}
                  </div>)
        sides = []
      }
    };
    const winner = this.calculateWinner();
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (oneIsNext ? "1" : "2");
    }


    return (
      <div>
        <div>
          {rows}
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>

    );
  }
}

class App extends Component {
  initializeCounters() {
    for (var i = 0; i < 36; i++) {
      counters[i] = 0;
    }
  }

  render() {
    this.initializeCounters();
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React Dots</h2>
        </div>
        <div className="game">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
