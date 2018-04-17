import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {svg} from './assets/SvgImages'
import { CalculateWinner } from "./components/CalculateWinner";
import Board from './components/Board'

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
         gameResult: null
      }
   }

   handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      const current = history[history.length - 1]
      const squares = current.squares.slice()
      if (CalculateWinner(squares) || squares[i]) {
         return
      }
      squares[i] = this.state.xIsNext ? svg.cross : svg.circle
      this.setState({
         history: history.concat([
            {
               squares: squares
            }
         ]),
         stepNumber: history.length,
         xIsNext: !this.state.xIsNext,
         gameResult: CalculateWinner(squares)
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
      const winner = CalculateWinner(current.squares)

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

ReactDOM.render(<Game />, document.getElementById('root'))
