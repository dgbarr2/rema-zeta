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

const seqa = (start,increment,n) => {
    let vec = [start]
    for (let i=1;i<n;i++){
        vec = [...vec,start+i*increment]
    }
    return vec
}

const setColor = (z) => {
    // Set the colors of the squares according to the value of z
    //
    //if (z < 0.005 & z > -0.005){
    //    console.log("z near zero = ", z)
    //    return "rgb(255,255,255)"
    //} else{
    //    return "rgb(0,0,0)"
    //}
    return "rgb("+(100*z)+",0,"+100*z+")"
}

class QuadraticGraphic extends React.Component {

    svgWidth = 500
    svgHeight = 500


    render() {
        
        //    
        // Coordinates for z = f[(x + iy)]
        //

        const xMin = 0, xMax = 10  // xMax must equal yMax for now.
        const yMin = 0, yMax = 10
        const interval = 1

        const nPoints_x = (xMax - xMin) / interval
        const nPoints_y = (yMax - yMin) / interval
        const squareSize = interval * (svgWidth / (xMax - xMin ))

        const xVec = seqa(xMin,interval,nPoints_x)
        const yVec = seqa(yMin,interval,nPoints_y)

        // Initialise the matrix of zeta values
        let z = new Array(nPoints_x).fill(0).map(() => new Array(nPoints_y).fill(0));
        let colors = new Array(nPoints_x).fill(0).map(() => new Array(nPoints_y).fill(0));
        
        

        
 

        // Generate a z value for each square. 
        for (let i=0;i<nPoints_x;i++){
            for (let j=0;j<nPoints_y;j++){
                //z[i][j] = quadratic(xVec[i],yVec[j],50,50)
                z[i][j] = zeta3(Complex(xVec[i],yVec[j])).real
                colors[i][j] = setColor(z[i][j])
                if (z[i][j]<0.005 & z[i][j]>-0.005){
                    console.log("zero point = ", xVec[i],yVec[i])
                }
                //console.log("z, x, y = ", z[i][j], xVec[i], yVec[i])
                
            }
        }


        


        // Now we locate the position for each of the squares

        const squareSize = 5
        const xMin_sq = xMin * squareSize
        const xMax_sq = xMax * squareSize
        const yMin_sq = yMin * squareSize
        const yMax_sq = yMax * squareSize

        const makeX2 = () => {
            let x = []
            for (let i=0;i<nPoints_x;i+=1){
                x[i] = xMin_sq + i*squareSize
            }
            return x
        }

        const makeY2 = () => {
            let y = []
            for (let i=0;i<nPoints_y;i+=1){
                y[i] = yMax_sq - (i+1)*squareSize  // in JS y=0 is at the top of the figure 
                console.log(" y = ", y[i])
            }
            return y
        }
       
        /*
        let gridLines_x = _.map(makeX(), v => <line x1={v[0]} y1='0' x2={v[0]} y2='400' stroke='lightblue' strokeWidth='1'/>)
        let gridLines_y = _.map(makeY(), v => <line x1='0' y1={v} x2='600' y2={v} stroke='lightblue' strokeWidth='1'/>)
        */
        
        let squares = _.map(makeX2(), v => _.map( makeY2(), w => (<rect x={v} y={w} width={squareSize+1} height={squareSize+1} fill={colors[w/squareSize][v/squareSize]}/>)))
        


    return (
        <svg height={this.svgHeight} width={this.svgWidth}>
                {squares}
                
        </svg>
    )
}

}
export default QuadraticGraphic