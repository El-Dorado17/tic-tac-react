import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/*
We only have 3 React Components: 

Square
    Renders a button

Board
    Renders 9 squares

Game
    Renders the interactive portions (not yet created)


What I've Done:
  -Passed the value as a prop in Square so each square shows what number it is
  -added an onClick function so when a square is clicked, it console.logs 'click'
  
  -Use state to remember when/where X was clicked 
  -Lifting state to a parent component so all child components may be 
  in order

  -Filled all squares with null value until given an X/O
*/


// this.props.value changes each square to show its value/number

//constructor is added to this class to initialize the state??

/*
class Square extends React.Component {


                  constructor(props) {
                    super(props)
                    this.state = {
                      value: null,
                    }
                  }
              render method is changed to show the states value when clicked
              Now, wherever I click will by re-rendered as X


              
    render() {
      return (
        <button 
        className="square" 
        onClick={()=> this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  }

  !NEXT: Lift state up again; learn and repeat
  */

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  
  class Board extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      }
    }
    //The purpose of the above: So all squares are marked as null until filled
    //with either X or O value

    handleClick(i){
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext? 'X' : 'O';
      this.setState({
        squares:squares,
        xIsNext: !this.state.xIsNext
      })
    }
    // This allows state to be stored in the Board component
    // Also we are using .slice on a copy of the squares array instead of modifying them directly
  
    renderSquare(i) {
      return (
      <Square
        value={this.state.squares[i]} 
        onClick={()=> this.handleClick(i)}
        /> //changed to pass prop "value" //* changed to pass squares current value
      )
    }
    //square value is actually passing the prop DOWN to a child component (Board to Square)
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     history: [{
    //       squares: Array(9).fill(null),
    //     }],
    //     xIsNext: true,
    //   };
    // }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }