import React from "react"
import _ from 'lodash'


class ZetaGraphic extends React.Component {

    
    render() {

        const makeX = () => {
            let x = [[0,0]]
            for (let i=0;i<100;i+=10){
                x = [...x,[i,i/10]]
            }
            return x
        }
        const makeY = () => {
            let y = []
            for (let i=0;i<100;i+=10){
                y = [...y,i]
            }
            console.log("y = ", y)
            return y
        }

        console.log("x = ", makeX())
        const  colVal = ["rgb(50,50,"+255+")","rgb(255,50,"+255+")","rgb(50,255,"+255+")","rgb(255,155,"+255+")"]


        const colVal2 = () => {
            let col = []
            for (let i=0;i<10;i++){
                col = [...col,"rgb(100,10,"+25*i+")"]
            }
            return col
        }

        const colVal2_vec = colVal2()
        console.log("Test colVal2: ", colVal2_vec)
        
        let gridLines_x = _.map(makeX(), v => <line x1={v[0]} y1='0' x2={v[0]} y2='400' stroke='lightblue' strokeWidth='1'/>)
        let gridLines_y = _.map(makeY(), v => <line x1='0' y1={v} x2='600' y2={v} stroke='lightblue' strokeWidth='1'/>)
    let squares_x = _.map(makeX(), v => <rect x={v[0]} width="10" height="10" fill={colVal2_vec[v[1]]} />)


        
        const drawSquare = (xCentre,yCentre,size) =>{
            let squareSize = 5
            return <svg><rect x="5" y="5" width={squareSize} height={squareSize} style={{fill:"rgb(0,0,255)"}} /></svg>
        }
        const test = drawSquare(5,5,5)
            console.log(test)

    return (
        <svg height="210" width="500">
  <line x1="0" y1="0" x2="200" y2="200"  style={{stroke:"rgb(255,255,0)",strokeWidth:2}}/>
  <rect x="5" y="5" width="5" height="5" style={{fill:"rgb(0,0,255)"}} />
  {gridLines_x}
  {gridLines_y}
  {squares_x}

</svg>
    )
}

}
export default ZetaGraphic