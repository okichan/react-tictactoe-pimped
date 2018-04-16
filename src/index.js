import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Square = (props) => {
   return (
      <button className={`square ${props.test}`} onClick={props.onClick}>
         {props.value}
      </button>
   )
}

class Board extends React.Component {
   renderSquare(i, wonSquares) {
      return (
         <Square
         value={this.props.squares[i]}
         onClick={() => this.props.onClick(i)}
         test={wonSquares && wonSquares.includes(i)}
         />
      )
   }
   
   render() {
      const wonSquares = this.props.data.gameResult && this.props.data.gameResult[1]
      
      return (
         <div>
            <div className="board-row">
               {this.renderSquare(0, wonSquares)}
               {this.renderSquare(1, wonSquares)}
               {this.renderSquare(2, wonSquares)}
            </div>
            <div className="board-row">
               {this.renderSquare(3, wonSquares)}
               {this.renderSquare(4, wonSquares)}
               {this.renderSquare(5, wonSquares)}
            </div>
            <div className="board-row">
               {this.renderSquare(6, wonSquares)}
               {this.renderSquare(7, wonSquares)}
               {this.renderSquare(8, wonSquares)}
            </div>
         </div>
      )
   }
}

class Game extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         history: [
            {
               squares: Array(9).fill(null)
            }
         ],
         stepNumber: 0,
         xIsNext: true,
         gameResult: null,
      }
   }

   handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      const current = history[history.length - 1]
      const squares = current.squares.slice()
      if (calculateWinner(squares) || squares[i]) {
         return
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      this.setState({
         history: history.concat([
            {
               squares: squares
            }
         ]),
         stepNumber: history.length,
         xIsNext: !this.state.xIsNext,
         gameResult: calculateWinner(squares)
      })
   }

   jumpTo(step) {
      this.setState({
         stepNumber: step,
         xIsNext: step % 2 === 0
      })
   }

   render() {
      const history = this.state.history
      const current = history[this.state.stepNumber]
      const winner = calculateWinner(current.squares)

      const moves = history.map((step, move) => {
         const desc = move ? 'Go to move #' + move : 'Go to game start'
         return (
            <li key={move}>
               <button
                  onClick={() => {
                     this.jumpTo(move)
                  }}
               >
                  {desc}
               </button>
            </li>
         )
      })
      let status
      if (winner) {
         status = winner[0]
      } else {
         status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
      }

      return (
         <div className="game">
            <div className="game-board">
               <Board
                  squares={current.squares}
                  onClick={i => this.handleClick(i)}
                  data={this.state}
               />
            </div>
            <div className="game-info">
               <div>{status}</div>
               <ol>{moves}</ol>
            </div>
            {/* <ShoppingList name="Tomomi" /> */}
         </div>
      )
   }
}

function calculateWinner(squares) {
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ]
   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
         squares[a] &&
         squares[a] === squares[b] &&
         squares[a] === squares[c]
      ) {
         return [`Winner: ${squares[a]}`, lines[i]]
      } else if (
         !squares.includes(null) &&
         squares[a] !== squares[b] &&
         squares[a] !== squares[c]
      ) {
         return ['Draw']
      }
   }
   return null
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
