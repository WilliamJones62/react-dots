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
    </button>
  );
}

class Board extends React.Component {
  constructor() {
     super();
     this.state = {
       verticals: Array(36).fill(null),
       horizontals: Array(36).fill(null),
       squares: Array(36).fill(0),
       oneIsNext: true,
     };
   }

  handleHorizontalClick(i) {
    const horizontals = this.state.horizontals.slice();
    const squares = this.state.squares.slice();
    if (horizontals[i] || ((i+1) % 6 === 0)) {
      return;
    }
    horizontals[i] = true;
    squares[i]++;
    if (i > 5){
      squares[i-6]++;
    }
    this.setState({
      horizontals: horizontals,
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
    const squares = this.state.squares.slice();
    if (verticals[i]) {
      return;
    }
    verticals[i] = true;
    squares[i]++;
    if(i > 0){
      squares[i-1]++;
    };
    this.setState({
      verticals: verticals,
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
      />
    );
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

    return (
      <div>
        {rows}
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
