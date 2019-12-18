import React from "react"
import _ from 'lodash'


const quadratic = (x,y,a,b) => {
    return (x-a)*(x-a) + (y-b)*(y-b) 
  }

class QuadraticGraphic extends React.Component {

    
    render() {
        const testQuadratic = quadratic(5,5,2,2)
        const xVec = [0,1,2,3,4], yVec = [0,1,2,3,4]

        let z = new Array(5).fill(0).map(() => new Array(4).fill(0));
        let colors = new Array(5).fill(0).map(() => new Array(4).fill(0));
        
        const setColor = (z) => {
            let color
            if (z >= 0 & z < 2){
                color = "rgb(50,50,50)"
            } else if (z >= 2  & z < 5){
                color = "rgb(50,50,255)"
            }else if (z >= 5  & z < 10){
                color = "rgb(50,255,255)"
            }
            return color
        }

        for (let i=0;i<5;i++){
            for (let j=0;j<5;j++){
                z[i][j] = quadratic(xVec[i],yVec[j],2,2)
                colors[i][j] = setColor(z[i][j])
            }
        }
        
        console.log("z = ", z)


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

        const makeX2 = () => {
            let x = []
            for (let i=0;i<50;i+=10){
                x = [...x,i]
            }
            return x
        }
        const makeY2 = () => {
            let y = []
            for (let i=0;i<50;i+=10){
                y = [...y,i]
            }
            return y
        }

        
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
        let squares_x2 = _.map(makeX(), v => <rect x={v[0]} y="10" width="10" height="10" fill={colors[0][v[1]]} />)
        let squares_x3 = _.map(makeX(), v => <rect x={v[0]} y="20" width="10" height="10" fill={colors[1][v[1]]} />)
        let squares_x4 = _.map(makeX(), v => <rect x={v[0]} y="30" width="10" height="10" fill={colors[2][v[1]]} />)
        let squares_x5 = _.map(makeX(), v => <rect x={v[0]} y="40" width="10" height="10" fill={colors[3][v[1]]} />)
        let squares_x6 = _.map(makeX(), v => <rect x={v[0]} y="50" width="10" height="10" fill={colors[4][v[1]]} />)

        let squares_x7 = _.map(makeX2(), v => _.map( makeY2(), w => (<rect x={v} y={w} width="10" height="10" fill={colors[w/10][v/10]}/>)))
        
        
        

        
        
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
  
  {squares_x7}

</svg>
    )
}

}
export default QuadraticGraphic