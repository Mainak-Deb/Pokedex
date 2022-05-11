import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/pokemon.css";
import "./styles/Home.css";
import axios from "axios";
import Card from './Card';
import { all } from 'mathjs';


const Type = () => {
  const {typename} = useParams();
  const [pokemons, setpokemons] = useState([])
  useEffect(
      ()=>{
        async function getData(){
            const res = await axios.get(
                `https://pokeapi.co/api/v2/type/${typename}`
              );
            const allpoks=res.data.pokemon
            console.log(allpoks)
            let pokearr=[]
            for(let i=0;i<allpoks.length ;i++){
                pokearr.push(allpoks[i].pokemon.name)
            }
            setpokemons(pokearr)
        }
        getData();
      },
      [typename]
  )
  return (
    <>
    <h1 className="head">{typename}</h1>
    <div className="mainBox">
      <div className="poke-container" id="poke-container">
       { 
       pokemons.map(
          i => <Card pokeid={i} />
        )
        }
      </div>
    </div>
    </>
  )
}

export default Type