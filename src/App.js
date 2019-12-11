import React from 'react';
import './App.css';
import IntroFrame from "./components/introFrame"
import {zetaSum, zetaProd} from "./components/zeta"




let p1 = 3, s = 20
let testSum = zetaSum(p1,s)
let testProd = zetaProd(p1,s)

function App() {
  console.log("testSum = ", testSum)
  console.log("testProd = ", testProd)
  return (
    <div>Test {testSum}</div>
    
    
    
  );
}
//<IntroFrame />

export default App;
