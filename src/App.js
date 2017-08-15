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
    return (
      <div>
        <div className="board-row">
          {this.renderHorizontal(0)}
          {this.renderHorizontal(1)}
          {this.renderHorizontal(2)}
        </div>
        <div className="board-row">
          {this.renderVirtical(0)}
          {this.renderSquare(0)}
          {this.renderVirtical(1)}
          {this.renderSquare(1)}
          {this.renderVirtical(2)}
          {this.renderSquare(2)}
          {this.renderVirtical(3)}
        </div>
        <div className="board-row">
          {this.renderHorizontal(3)}
          {this.renderHorizontal(4)}
          {this.renderHorizontal(5)}
        </div>
        <div className="board-row">
          {this.renderVirtical(4)}
          {this.renderSquare(3)}
          {this.renderVirtical(5)}
          {this.renderSquare(4)}
          {this.renderVirtical(6)}
          {this.renderSquare(5)}
          {this.renderVirtical(7)}
        </div>
        <div className="board-row">
          {this.renderHorizontal(6)}
          {this.renderHorizontal(7)}
          {this.renderHorizontal(8)}
        </div>
        <div className="board-row">
          {this.renderVirtical(8)}
          {this.renderSquare(6)}
          {this.renderVirtical(9)}
          {this.renderSquare(7)}
          {this.renderVirtical(10)}
          {this.renderSquare(8)}
          {this.renderVirtical(11)}
        </div>
        <div className="board-row">
          {this.renderHorizontal(9)}
          {this.renderHorizontal(10)}
          {this.renderHorizontal(11)}
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
        <div className="game-board">
          <Board />
        </div>

      </div>
    );
  }
}

export default App;
