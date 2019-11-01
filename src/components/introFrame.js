import React from 'react';
import MathJax from 'react-mathjax';

import styled from "styled-components"
import { ReactComponent as LatexHalf } from "./prePreparedSVG/img/latexHalf.svg"

import { timer }  from 'd3-timer';

//import  { ReactComponent as CreatedSVG } from '../img/svgFromMathJax.svg';

// https://www.embeddedrelated.com/showarticle/599.php
// https://bitbucket.org/jason_s/svg_mathjax/src/default/
// https://buildmedia.readthedocs.org/media/pdf/mathjax/v2.7-latest/mathjax.pdf

const Ellipse = styled.ellipse`
fill-opacity: 0.7;
stroke: red;
stroke-width: 1.5px
`


class MathJaxSVG extends React.Component {
    constructor(){
        super()
        this.state = { 
            dt_state: 0,
            dt_state_2: 0,
            dt_state_3: 0}
    }

    
    timer = timer(elapsed => {
       const dt = elapsed;
       if (this.paused) this.timer.stop();
       if (dt<300){
            this.setState({
                dt_state: dt/100,
            })} else if (dt<5000) {
            this.setState({
                dt_state: dt/100,
                dt_state_2: dt/500,
                dt_state_3: dt/20 - 10
         })} else if (dt>5000){
             this.timer.stop()
         }
       })
       
    titleSVG = "\\hbox{What does it feel like to invent math?}" 
    sum_tex = "1+2+4+8+\\cdots = -1"

    render() {
        
        return(<div>
                <svg width="800" height="400" >
                    <rect x="0" y = "0" width="800" height="400"    fill="black" stroke="green"/>
                     
                    <Ellipse cx="200" cy={100+this.state.dt_state} rx={this.state.dt_state_2**2} ry={this.state.dt_state_2+10} fill="pink"/>
                    <LatexHalf width="100" height={200-this.state.dt_state} x="30" y={100+this.state.dt_state} color="50%"/>
                    
                    
                    <foreignObject x='70' y={this.state.dt_state_3-150} opacity={this.state.dt_state/100} color='white'>
                        <MathJax.Provider>
                            <MathJax.Node inLine formula={this.titleSVG}/>
                            <MathJax.Node inLine formula={this.sum_tex}/>
                        </MathJax.Provider>
                    </foreignObject>
                    
                    <rect x={2*this.state.dt_state_3-100} y = {this.state.dt_state_3-135} width={500-2*this.state.dt_state_3} height="20"    fill="black" />
                    
                </svg>
            </div>
        )            
    }            
}
export default MathJaxSVG