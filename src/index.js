import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
const cross = (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 415.188 415.188">
      <path d="M412.861 78.976c3.404-6.636 2.831-14.159-.15-20.404.84-7.106-1.02-14.321-7.746-19.855a59509.569 59509.569 0 0 1-18.781-15.457c-11.005-9.055-28.237-11.913-38.941 0-48.619 54.103-99.461 105.856-152.167 155.725-39.185-36.605-78.846-72.713-118.223-108.868-13.82-12.693-33.824-8.71-42.519 6.411-12.665 6.286-22.931 14.481-31.42 28.468-4.042 6.664-3.727 15.076 0 21.764 25.421 45.578 74.557 85.651 114.957 122.529-5.406 4.839-10.772 9.724-16.287 14.461-54.43 46.742-91.144 76.399-23.029 124.325.919.647 1.856.504 2.789.882 1.305.602 2.557 1.026 4.004 1.264.45.017.87.093 1.313.058 1.402.114 2.774.471 4.195.192 36.621-7.18 70.677-35.878 101.576-67.48 30.1 29.669 62.151 58.013 97.395 74.831 8.391 4.005 18.395 1.671 24.855-3.931 10.832.818 20.708-5.913 25.665-15.586.734-.454 1.207-.713 2.002-1.21 15.748-9.838 17.187-29.431 5.534-42.936-26.313-30.492-54.284-59.478-82.798-87.95 51.341-50.166 115.448-104.27 147.776-167.233z" />
   </svg>
)
const circle = (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.689 453.689">
      <path d="M231.245 16.365c-9.744 0-19.646.582-29.551 1.737a323.648 323.648 0 0 0-13.729 2.049c-2.869.442-5.512 1.29-7.894 2.511-93.32 12.423-164.763 82.37-178.08 174.695C-14.323 310.471 71.365 417.058 193 434.952c10.694 1.574 21.703 2.372 32.717 2.372h.01c111.657 0 208.656-75.921 225.617-176.597 9.78-58.016-11.34-121.679-57.93-174.67-39.515-44.942-97.115-69.692-162.169-69.692zm13.086 51.92c43.407 3.062 81.091 21.048 112.071 53.506 36.444 38.182 52.704 91.861 42.432 140.084-13.065 61.383-77.612 123.521-175.675 123.521-11.382 0-22.589-.99-33.299-2.96-90.146-16.539-151.098-99.701-135.874-185.4 13.062-73.488 77.733-124.812 157.285-124.812 5.367 0 10.821.241 16.204.718 6.624.583 12.301-1.095 16.856-4.657z" />
   </svg>
)

const Square = props => {
   return (
      <button className={`square ${props.test}`} onClick={props.onClick}>
         {props.value}
      </button>
   )
}

class Board extends React.Component {
   render() {
      const wonSquares =
         this.props.data.gameResult && this.props.data.gameResult[1]

      return (
         <div className="grid-container">
            {Array(9)
               .fill('')
               .map((m, i) => {
                  return (
                     <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        test={wonSquares && wonSquares.includes(i)}
                     />
                  )
               })}
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
         gameResult: null
      }
   }

   handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      const current = history[history.length - 1]
      const squares = current.squares.slice()
      if (calculateWinner(squares) || squares[i]) {
         return
      }
      squares[i] = this.state.xIsNext ? cross : circle
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
