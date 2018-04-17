import React from 'react'
import Square from "./Square";

export default class Board extends React.Component {
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