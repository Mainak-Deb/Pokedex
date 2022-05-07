import React, { useState,useEffect } from "react";
import Addmore from "./Addmore";
import Card from "./Card";
import "./styles/Home.css";

const Home = () => {
  const [pokes, setPokes] = useState(()=>{
    let arr=[]
    for(let i=1;i<=20;i++) arr.push(i);
    return arr;
  })
  useEffect(
    ()=>{
      console.log("rendered")
    }
  )
  return (
    <>
    <div className="mainBox">
      <div className="poke-container" id="poke-container">
       { 
       pokes.map(
          i => <Card pokeid={i} />
        )
        }
      </div>
    </div>
    <Addmore handleAdd={setPokes} pokes={pokes} />
    </>
  );
};

export default Home;
