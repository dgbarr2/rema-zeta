import React from "react"
import _ from 'lodash'
import { zeta3, Complex } from "./zeta_bellbind"


console.log(Math.sqrt(zeta3(2).real * 6));
console.log(zeta3(Complex(0.5, 14.134725142)).abs());
console.log(zeta3(Complex(0.5, 14.134725142))); // Second zero
console.log(zeta3(1).real);  // => inf
console.log(zeta3(0).real);  // => -1/2
console.log(zeta3(-1).real); // => -1/12
console.log(zeta3(-2).real); // => 0



class QuadraticGraphic extends React.Component {

    
    render() {
        
        const nSquares = 11


        const seqa = (start,increment,n) => {
            let vec = [start]
            for (let i=1;i<n;i++){
                vec = [...vec,start+i*increment]
            }
            return vec
        } 

        const xVec = seqa(0,0.1,nSquares), yVec = seqa(10,1,nSquares)

        let z = new Array(nSquares).fill(0).map(() => new Array(nSquares).fill(0));
        let colors = new Array(nSquares).fill(0).map(() => new Array(nSquares).fill(0));
        
        

        const setColor = (z) => {
            //if (z < 0.005 & z > -0.005){
            //    console.log("z near zero = ", z)
            //    return "rgb(255,255,255)"
            //} else{
            //    return "rgb(0,0,0)"
            //}
            return "rgb("+(100*z)+",0,"+100*z+")"
        }
 
        for (let i=0;i<nSquares;i++){
            for (let j=0;j<nSquares;j++){
                //z[i][j] = quadratic(xVec[i],yVec[j],50,50)
                z[i][j] = zeta3(Complex(xVec[i],yVec[j])).real
                colors[i][j] = setColor(z[i][j])
                if (z[i][j]<0.005 & z[i][j]>-0.005){
                    console.log("zero point = ", xVec[i],yVec[i])
                }
                
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
            for (let i=0;i<5*nSquares;i+=5){
                x = [...x,i]
            }
            return x
        }

        const makeY2 = () => {
            let y = []
            for (let i=0;i<5*nSquares;i+=5){
                y = [...y,i]
            }
            return y
        }
       
        let gridLines_x = _.map(makeX(), v => <line x1={v[0]} y1='0' x2={v[0]} y2='400' stroke='lightblue' strokeWidth='1'/>)
        let gridLines_y = _.map(makeY(), v => <line x1='0' y1={v} x2='600' y2={v} stroke='lightblue' strokeWidth='1'/>)
    
        
        let squares = _.map(makeX2(), v => _.map( makeY2(), w => (<rect x={v} y={w} width="6" height="6" fill={colors[w/5][v/5]}/>)))
        


    return (
        <svg height="500" width="500">
                {squares}
                
        </svg>
    )
}

}
export default QuadraticGraphic