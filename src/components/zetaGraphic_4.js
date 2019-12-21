import React from "react"
import _ from 'lodash'
import { zeta3, Complex } from "./zeta_bellbind"


//console.log(Math.sqrt(zeta3(2).real * 6));
//console.log(zeta3(Complex(0.5, 14.134725142)).abs());
//console.log(zeta3(Complex(0.5, 14.134725142))); // Second zero
//console.log(zeta3(1).real);  // => inf
//console.log(zeta3(0).real);  // => -1/2
//console.log(zeta3(-1).real); // => -1/12
//console.log(zeta3(-2).real); // => 0

const seqa = (start,increment,n) => {
    let vec = []
    let cf = 10   // Correction factor to ensure calculations are performed on integers. See https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
    for (let i=0;i<n;i++){
        const incrementCf = increment * cf
        vec[i] = start + (i * incrementCf) / cf
    }
    return vec
}

const setColor = (z) => {
    return "rgb("+z+",0,"+z+")"
}

const quadratic = (x,y,a,b) => {
    return (x-a)*(x-a) + (y-b)*(y-b) 
  }

  const cubic = (x,y,a,b) => {
    return (x-a)*(x-a)*(x-a) + (y-b)*(y-b)*(y-b) 
  }

class ZetaGraphic extends React.Component {

    svgWidth = 500
    svgHeight = 500


    render() {
        
        //    
        // Coordinates for z = f[(x + iy)]
        //

        
        const xMin = -6, xMax = 10  // Range of x and y must be equal, and centred on zero
        const yMin = -8, yMax = 8
        const interval = 1

        const nPoints_x = (xMax - xMin) / interval
        const nPoints_y = (yMax - yMin) / interval
        const squareSize = interval * (this.svgWidth / (xMax - xMin ))

        console.log(nPoints_x, nPoints_y, squareSize)

        const xVec = seqa(xMin,interval,nPoints_x)
        const yVec = seqa(yMin,interval,nPoints_y)

        console.log("xVec = ", xVec)
        console.log("yVec = ", yVec)
        //console.log("squareSize = ", squareSize)

        // Include a conversion factor to avoid calcuations on non-integers
        const cf = 10
        const intervalCf = interval*cf, squareSizeCf = squareSize*cf

        // Initialise the matrix of zeta values
        let z = new Array(nPoints_x).fill(0).map(() => new Array(nPoints_y).fill(0));
        let zMap = new Array(nPoints_x).fill(0).map(() => new Array(nPoints_y).fill(0));
        let colors = new Array(nPoints_x).fill(0).map(() => new Array(nPoints_y).fill(0));
        
        

        
 

        // Generate a z value for each square. 
        for (let i=0;i<nPoints_x;i++){
            for (let j=0;j<nPoints_y;j++){
                //z[i][j] = ((i+1)*j) * 50 
                z[i][j] = ((quadratic(xVec[i],yVec[j],0,0))).toFixed(0) *1
                //z[i][j] = zeta3(Complex(xVec[i],yVec[j])).real
                colors[i][j] = setColor(z[i][j])
                if (z[i][j]<0.005 & z[i][j]>-0.005){
                console.log("?? zeros at: ", xVec[i], yVec[j])
                }
                
            }
        }

        console.log("z = ", z)

        // Transpose the z 'matrix'
        for (let i=0;i<nPoints_x;i++){
            for (let j=0;j<nPoints_y;j++){
                zMap[nPoints_x-1-i][j] = z[j][i] 
            }
        }


        // Generate a color for each square.
        for (let i=0;i<nPoints_x;i++){
            for (let j=0;j<nPoints_y;j++){
                
                colors[i][j] = setColor(zMap[i][j])
                
            }
        }


        


        // Now we locate the position for each of the squares

        
        const xMin_sq = xMin * squareSize
        const xMax_sq = xMax * squareSize
        const yMin_sq = yMin * squareSize
        const yMax_sq = yMax * squareSize

        const makeX2 = () => {
            let x = [], xx = []
            for (let i=0;i<nPoints_x;i+=1){
                
                x[i] = (xVec[i]*cf / intervalCf) * (squareSizeCf) / cf
                console.log("i,x[i] in makeX2 = ", i, x[i])
            }
            for (let i=0;i<nPoints_x;i+=1){
                
                xx[i] = x[i] - x[0]
                console.log("i,x[i] in makeX2 revised = ", i, xx[i])
            }
            return xx
        }
        
        const makeY2 = () => {
            let y = [], yy = []
            
            for (let i=0;i<nPoints_y;i+=1){
                y[i] = ((yMax*cf - yVec[i]*cf - intervalCf - yMin*cf) * ((squareSizeCf) / (intervalCf))) / cf   
                console.log("i,y[i] in makeY2 = ", i, y[i])
            }
            for (let i=0;i<nPoints_y;i+=1){
                yy[i] = y[0] - y[i]
                console.log("i,y[i] in makeY2 revised = ", i, yy[i])
            }

            return yy
        }
       
        /*
        let gridLines_x = _.map(makeX2(), v => <line x1={v[0]} y1='0' x2={v[0]} y2='400' stroke='lightblue' strokeWidth='1'/>)
        let gridLines_y = _.map(makeY2(), v => <line x1='0' y1={v} x2='600' y2={v} stroke='lightblue' strokeWidth='1'/>)
        */
        
       let text = _.map(makeX2(), v => _.map( makeY2(), w => (<text x={v} y={w+15}>{v/squareSize},{w/squareSize}</text> )))
       console.log("text = ", text)
       let squares = _.map(makeX2(), v => _.map( makeY2(), w => (<rect x={v} y={w}   width={squareSize+1} height={squareSize+1} fill={colors[w/squareSize][v/squareSize]}/>)))
        
        console.log("z = ", z)
        //console.log("zMap = ", zMap)
        console.log("colors = ", colors)
        //console.log("squares = ", squares)

    return (
        <svg height={this.svgHeight} width={this.svgWidth}>
                {squares}
                
        
        </svg>
    )
}
//{text}
}
export default ZetaGraphic