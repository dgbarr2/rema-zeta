import React from 'react';
import './App.css';
import IntroFrame from "./components/introFrame"
import ZetaGraphic from "./components/zetaGraphic_4"
import QuadraticGraphic from "./components/quadraticGraphic_3"
import {zetaSum, zetaProd} from "./components/zeta"
import { zeta3, Complex } from "./components/zeta_bellbind"





function App() {
  
  return (
    <div>
      
        <ZetaGraphic/>
    </div>
    
    
    
  );
}
//<IntroFrame />

export default App;
