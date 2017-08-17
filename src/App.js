import React, { Component } from 'react';
import './App.css';

function Horizontal(props) {
  return (
    <button className="horizontal"  onClick={props.onClick}>
    </button>
  );
}

function Virtical(props) {
  return (
    <button className="virtical"  onClick={props.onClick}>
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
       virtical: Array(12).fill(null),
       horizontal: Array(12).fill(null),
     };
   }

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
    var sides = [];
    for (var i = 0; i < 12; i++) {
      for (var j = 0; j < 6; j++) {
        if (i % 2 == 0) {
          sides.push(this.renderHorizontal(i * 6 + j))
        }
        else {
          if (i < 11) {
            sides.push(this.renderVirtical(i * 6 + j),
                        this.renderSquare(i * 6 + j))
          }
        }
      }
      rows.push(<div>
                  {sides}
                </div>)
      sides = []
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
        <div className="game-board">
          <Board />
        </div>

      </div>
    );
  }
}

export default App;
