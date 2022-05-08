import axios from "axios";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import React, { useEffect, useState } from "react";
import "./styles/Card.css";

const Card = (props) => {
  const colors = {
    fire: ["#FDDFDF", "#de3700"],
    grass: ["#DEFDE0", "#21c400"],
    electric: ["#FCF7DE", "#fa9a00"],
    water: ["#DEF3FD", "#087fc4"],
    ground: ["#f4e7da", "#8f4300"],
    rock: ["#d5d5d4", "#3b3a39"],
    fairy: ["#fceaff", "#ab18ad"],
    poison: ["#98d7a5", "#175900"],
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
  
  const triNum = (n) => {
    if (n > 902) {
      n = n % 902;
    }
    const sn = String(n);
    if (sn.length == 1) {
      return "00" + sn;
    } else if (sn.length == 2) {
      return "0" + sn;
    } else if (sn.length == 3) {
      return +sn;
    }
  };


  const [name,setName] = useState("")
  const [type,setType] = useState("normal")
  const [id, setid] = useState(0)
  const [imgUrl, setimgUrl] = useState('')
  const [typeUrl, settypeUrl] = useState('')
  let srcUrl=`/pokemon/${name}`

  useEffect(()=>{
    async function getData(){
      const res= await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokeid}`);
      console.log(res.data);
      setid(res.data.id);
      setimgUrl(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${triNum(id)}.png`)
      setName(res.data.name)
      setType(res.data.types[0].type.name)
      settypeUrl('/type/'+String(res.data.types[0].type.name))
      console.log(res.data.types[0].type.name)
      srcUrl=`/pokemon/${name}`
    };
    getData();
  })
  return (
    <>
    <Link to={srcUrl} className="pokelink">
      <div className="pokemon"  style={{backgroundColor:colors[type][0]}}>
        <div className="img-container">
          <img
            src={imgUrl}
            alt=""
          />
        </div>
        <div className="info">
          <span className="number"> #{triNum(id)} </span>
          <h3 className="name"> <upper> {name.toUpperCase()} </upper>  </h3>
          <Link to={typeUrl} style={{textDecoration:'none'}}>
          <small className="type">
             <span className="coltype" style={{backgroundColor:colors[type][1]}} >  {type} </span>{" "}
          </small></Link>
        </div>
      </div>
      </Link>
    </>
  );
};

export default Card;
