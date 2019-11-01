import React from 'react';

import styled from "styled-components"

import { timer }  from 'd3-timer';
import latexHalf from "./img/latexHalf.svg"
import  { ReactComponent as LatexHalf } from './img/latexHalf.svg';
import  { ReactComponent as BlueLatexHalf } from './img/blueLatexHalf.svg';
import SvgLatexHalf from './img/SvgLatexHalf.js';

// https://www.embeddedrelated.com/showarticle/599.php
// https://bitbucket.org/jason_s/svg_mathjax/src/default/
// https://buildmedia.readthedocs.org/media/pdf/mathjax/v2.7-latest/mathjax.pdf

const Ellipse = styled.ellipse`
fill-opacity: 0.7;
stroke: blue;
stroke-width: 1.5px
`




class ExternalSVG extends React.Component {
    constructor(){
        super()
        this.state = { 
            dt_state: 0,
            dt_state_2: 0}
    }

    
    timer = timer(elapsed => {
       const dt = elapsed;
       if (this.paused) this.timer.stop();
       if (dt<100){
            this.setState({
                dt_state: dt/100,
            })} else if (dt<2000) {
            this.setState({
                dt_state: dt/100,
                dt_state_2: dt/500
         })} else if (dt>2000){
             this.timer.stop()
         }
       })
       
     

    render() {
        
        return(<div>
            
                <svg width="800" height="400" >
                    <rect x="0" y = "0" width="800" height="400"    fill="lightgray" stroke="green"/>
                    
                    <BlueLatexHalf width="100" height={200-this.state.dt_state} x="30" y={100+this.state.dt_state} />
                     
                    <Ellipse cx="200" cy={100+this.state.dt_state} rx={this.state.dt_state_2**2} ry={this.state.dt_state_2+10} fill="pink"/>
                    <img x="10" y="20" width="80" height="80" src={"latexHalf"} /> 
                    
                    
                    </svg>
                    <svg width="800" height="400" >
                    <LatexHalf />
                    </svg>
                    <svg width="800" height="400" >
                    <SvgLatexHalf height="200" colordgb="pink"/>
                    
                    </svg>
                    
            </div>
        )            
    }            
}
export default ExternalSVG