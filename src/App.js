import React, { Component } from 'react';
import './App.css';

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
      counters: Array(36).fill(0),
      squares: Array(36).fill(null),
      playerOneCtr: 0,
      playerTwoCtr: 0,
      oneIsNext: true,
    };
  }

  squareComplete(i) {
    let playerOneCtr = this.state.playerOneCtr;
    let playerTwoCtr = this.state.playerTwoCtr;

    if (i === 4) {
      if (this.state.oneIsNext) {
        playerOneCtr ++;
      }
      else {
        playerTwoCtr ++;
      }
      this.setState({
        playerOneCtr: playerOneCtr,
        playerTwoCtr: playerTwoCtr,
      });

      return this.state.oneIsNext ? "1" : "2";
    }
    else {
      return null;
    }
  }

  handleHorizontalClick(i) {
    const horizontals = this.state.horizontals.slice();
    const counters = this.state.counters.slice();
    const squares = this.state.squares.slice();
    let squareWinner;

    if (horizontals[i] || ((i+1) % 6 === 0)) {
      return;
    }
    horizontals[i] = true;
    counters[i]++;

    squareWinner = this.squareComplete(counters[i]);

    if (squareWinner) {
      squares[i] = squareWinner;
    }

    if (i > 5){
      counters[i-6]++;
      squareWinner = this.squareComplete(counters[i-6]);

      if (squareWinner) {
        squares[i-6] = squareWinner;
      }

    }

    this.setState({
      horizontals: horizontals,
      counters: counters,
      squares: squares,
      oneIsNext: !this.state.oneIsNext,
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
    const counters = this.state.counters.slice();
    const squares = this.state.squares.slice();
    let squareWinner;
    if (verticals[i]) {
      return;
    }
    verticals[i] = true;
    counters[i]++;
    squareWinner = this.squareComplete(counters[i]);

    if (squareWinner) {
      squares[i] = squareWinner;
    }

    if (i > 0) {
      counters[i-1]++;
      squareWinner = this.squareComplete(counters[i-1]);

      if (squareWinner) {
        squares[i-1] = squareWinner;
      }

    };
    this.setState({
      verticals: verticals,
      counters: counters,
      squares: squares,
      oneIsNext: !this.state.oneIsNext,
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
    if (this.state.playerOneCtr > 12) {
      return '1';
    }
    else if (this.state.playerTwoCtr > 12) {
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
        for (var j = 0; j < 6; j++) {
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
      status = "Next player: " + (this.state.oneIsNext ? "1" : "2");
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
  render() {
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
