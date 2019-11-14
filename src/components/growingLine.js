import React from "react"

import { timer }  from 'd3-timer';



class GrowingLine extends React.Component {
    constructor(){
        super()
        this.state = { 
            dt_state: 0}
    }

    
    timer = timer(elapsed => {
       const dt = elapsed;
       if (this.paused) this.timer.stop();
       if (dt<300){
            this.setState({
                dt_state: dt/1000,
            })} else if (dt<50000) {
            this.setState({
                dt_state: dt/100
         })} else if (dt>50000){
             this.timer.stop()
         }
       })
    
       render(){
           let h = 5*this.state.dt_state
           return (
               <svg>
            <line x1='10' y1='0' x2={10+h*Math.cos(0.5)} y2= {0+h*Math.sin(0.5)} stroke='lightblue' strokeWidth='2'/>
            <line x1='10' y1='0' x2={10+h*Math.cos(0.5)/2} y2= {0+h*Math.sin(0.5)/2} stroke='blue' strokeWidth='2'/>
            </svg>
           )
       }
    }

    export default GrowingLine