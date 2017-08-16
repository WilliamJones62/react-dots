import React, { Component } from 'react';
import './App.css';

function Horizontal(props) {
  return (
    <button className="horizontal">
    </button>
  );
}

function Virtical(props) {
  return (
    <button className="virtical">
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
  renderHorizontal(i) {
    return (
      <Horizontal
      />
    );
  }

  renderVirtical(i) {
    return (
      <Virtical
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
    for (var i = 0; i < 3; i++) {
      rows.push(<div className="board-row">
                {this.renderHorizontal(i * 3)}
                {this.renderHorizontal(i * 3 + 1)}
                {this.renderHorizontal(i * 3 + 2)}
              </div>)
      rows.push(<div className="board-row">
                {this.renderVirtical(i * 4)}
                {this.renderSquare(i * 4)}
                {this.renderVirtical(i * 4 + 1)}
                {this.renderSquare(i * 4 + 1)}
                {this.renderVirtical(i * 4 + 2)}
                {this.renderSquare(i * 4 + 2)}
                {this.renderVirtical(i * 4 + 3)}
              </div>)
    };

    rows.push(<div className="board-row">
              {this.renderHorizontal(3 * 3)}
              {this.renderHorizontal(3 * 3 + 1)}
              {this.renderHorizontal(3 * 3 + 2)}
            </div>);

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
        <div className="game-board">
          <Board />
        </div>

      </div>
    );
  }
}

export default App;
