import React from "react";
import "./styles/Statchart.css";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
const Statchart = (props) => {
  return (
    <>
      <div className="statcon">
        <h2>Statistics</h2>
        <hr />
        <div className="statspan">Attack</div>
        <div class="container">
          <div class="skills" style={{backgroundColor:'#fc039d',width:String(props.stat.attack)+'%'}} >{props.stat.attack}%</div>
        </div><hr />
    
        <div className="statspan">Defense</div>
        <div class="container">
          <div class="skills"  style={{backgroundColor:'#24c704',width:String(props.stat.defense)+'%'}} >{props.stat.defense}%</div>
        </div><hr />

        <div className="statspan">High Power</div>
        <div class="container">
          <div class="skills"  style={{backgroundColor:'#0392ab',width:String(props.stat.hp)+'%'}} >{props.stat.hp}%</div>
        </div><hr />

        <div className="statspan">Speed</div>
        <div class="container">
          <div class="skills"  style={{backgroundColor:'#fa8e00',width:String(props.stat.speed)+'%'}} >{props.stat.speed}%</div>
        </div><hr />
      </div>
    </>
  );
};

export default Statchart;
