import React from "react";
import { Link } from "react-router-dom";
import "./styles/Pokestat.css";

const Pokestat = (props) => {
  const colors = {
    fire: ["#FDDFDF", "#de3700"],
    grass: ["#DEFDE0", "#21c400"],
    electric: ["#FCF7DE", "#fa9a00"],
    water: ["#DEF3FD", "#087fc4"],
    ground: ["#f4e7da", "#8f4300"],
    rock: ["#d5d5d4", "#3b3a39"],
    fairy: ["#fceaff", "#ab18ad"],
    poison: ["#f5b0ff", "#8f00a3"],
    bug: ["#f8d5a3", "#f07605"],
    dragon: ["#97b3e6", "#c43800"],
    psychic: ["#eaeda1", "#819605"],
    flying: ["#F5F5F5", "#c93838"],
    fighting: ["#E6E0D4", "#996909"],
    normal: ["#F5F5F5", "#996909"],
    ghost: ["#7f7894", "#240342"],
    dark: ["#5e5e5c", "#0f0f0f"],
    ice: ["#79e4e8", "#0388a6"],
    steel: ["#B2B4B5", "#696B6F"],
  };
  return (
    <>
      <div className="pokestat">
        <h2>TYPES</h2>
        {props.infos.types.map((i) => (
          <Link to={'/type/'+String(i)} className="pokelink">
          <span
            className="powers"
            style={{ backgroundColor: colors[i][1], color: colors[i][0] }}
          >
            {" "}
            <b>{i.toUpperCase()}</b>
          </span></Link>
        ))}
      </div>
      <br />
      <hr />
      <div className="pokestat">
        <h2>STRENGTH</h2>
        {props.infos.strength.map((i) => (
          <Link to={'/type/'+String(i)} className="pokelink">
          <span
            className="powers"
            style={{ backgroundColor: colors[i][1], color: colors[i][0] }}
          >
            <b>{i.toUpperCase()}</b>
          </span></Link>
        ))}
      </div>
    
      <br /> <hr />
      <div className="pokestat">
        <h2>WEAKNESS</h2>
        {props.infos.weakness.map((i) => (
           <Link to={'/type/'+String(i)} className="pokelink">
          <span
            className="powers"
            style={{ backgroundColor: colors[i][1], color: colors[i][0] }}
          >
            <b>{i.toUpperCase()}</b>
          </span></Link>
        ))}
      </div>
      </>
  );
};

export default Pokestat;
