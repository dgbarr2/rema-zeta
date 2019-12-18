import React from "react"
import _ from 'lodash'


const quadratic = (x,y,a,b) => {
    return (x-a)**2 + (y-b)*(y-b) + (x-a)*(y-b)/5 
  }

class QuadraticGraphic extends React.Component {

    
    render() {
        
        const nSquares = 51
        
        const seqa = (start,increment,n) => {
            let vec = [start]
            for (let i=1;i<n;i++){
                vec = [...vec,start+i*increment]
            }
            return vec
        } 

        const xVec = seqa(0,1,nSquares), yVec = seqa(0,1,nSquares)

        let z = new Array(nSquares).fill(0).map(() => new Array(nSquares).fill(0));
        let colors = new Array(nSquares).fill(0).map(() => new Array(nSquares).fill(0));
        
        

        const setColor = (z) => {
            return "rgb("+1*z/10+",0,"+5*z/10+")"
        }

        for (let i=0;i<nSquares;i++){
            for (let j=0;j<nSquares;j++){
                z[i][j] = quadratic(xVec[i],yVec[j],25,25)
                colors[i][j] = setColor(z[i][j])
            }
        }


        const makeX = () => {
            let x = [[0,0]]
            for (let i=0;i<10*nSquares;i+=10){
                x = [...x,[i,i/10]]
            }
            return x
        }
        const makeY = () => {
            let y = []
            for (let i=0;i<10*nSquares;i+=10){
                y = [...y,i]
            }
            return y
        }

        const makeX2 = () => {
            let x = []
            for (let i=0;i<10*nSquares;i+=10){
                x = [...x,i]
            }
            return x
        }
        const makeY2 = () => {
            let y = []
            for (let i=0;i<10*nSquares;i+=10){
                y = [...y,i]
            }
            return y
        }
       
        let gridLines_x = _.map(makeX(), v => <line x1={v[0]} y1='0' x2={v[0]} y2='400' stroke='lightblue' strokeWidth='1'/>)
        let gridLines_y = _.map(makeY(), v => <line x1='0' y1={v} x2='600' y2={v} stroke='lightblue' strokeWidth='1'/>)
    
        
        let squares = _.map(makeX2(), v => _.map( makeY2(), w => (<rect x={v} y={w} width="11" height="11" fill={colors[w/10][v/10]}/>)))
        
console.log("colors = ", colors)

    return (
        <svg height="500" width="500">
                {squares}
                
        </svg>
    )
}

}
export default QuadraticGraphic