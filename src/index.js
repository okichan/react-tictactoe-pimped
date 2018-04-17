import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { svg } from './assets/SvgImages'
import { CalculateWinner } from './components/CalculateWinner'
import Board from './components/Board'

class Game extends Component {
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
         theme: 'default'
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

   themeHandelr(e) {
      console.log(e)
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
         <Fragment>
            <div className="theme-selector">
               <select onChange={e => console.log(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="black">Black</option>
                  <option value="pink">Pink</option>
                  <option value="ugly">Ugly</option>
               </select>
            </div>

            <p data-theme="default">wawawa</p>

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
            </div>
         </Fragment>
      )
   }
}

ReactDOM.render(<Game />, document.getElementById('root'))
