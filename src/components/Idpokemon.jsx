import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./styles/pokemon.css";
import axios from "axios";
import Pokestat from "./Pokestat";
import Statchart from "./Statchart";

const Idpokemon = () => {
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
      const { pokeid } = useParams();
      const pokename=pokeid;
      console.log(pokename)
      const [basicdetail, setbasicdetail] = useState({
        name: "",
        id: "",
        png: "",
        svg: "",
        phrase: "",
        type: "normal",
      });
    
      const [stats, setstats] = useState({  });
      const [types, settypes] = useState({
        types: [],
        strength: [],
        weakness:[]
      });

      const [bothid, setbothid] = useState({
          previd:'',
          nextid:''
      })

      function min(x,y){
          if(x<y){return x}
          else{return y}
      }
      function max(x,y){
        if(x>y){return x}
        else{return y}
    }
      const [evolution, setevolution] = useState([]);
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
    

      async function getId(pokename) {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokename.toLowerCase()}`
        );
        let id = res.data.id;
        return id;
      }
      async function getName(pokeid) {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokeid}`
        );
        let name = res.data.name;
        return name;
      }
      useEffect(() => {
        async function getData() {
          const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokename}`
          );
          let id = res.data.id;
          let previd='/pokemonid/'+String(max(1,id-1))
          let nextid='/pokemonid/'+String(min(id+1,900))
          setbothid(
              {
                  previd:previd,
                  nextid:nextid
              }
          )
          let name= res.data.name;
          let svg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
          let png = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${triNum(
            id
          )}.png`;
          //console.log(res);
          const type = res.data.types[0].type.name;
          const res2 = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          );
    
          let phrase = res2.data.flavor_text_entries[0].flavor_text;
          setbasicdetail({
            name: name,
            id: id,
            png: png,
            svg: svg,
            phrase: phrase,
            type: type,
          });
          //console.log(basicdetail);
          let evolution_chain = res2.data.evolution_chain.url;
          const ev = await axios.get(evolution_chain);
          //console.log(ev.data);
          let blankev = [];
          blankev.push(ev.data.chain.species.name);
          if (ev.data.chain.evolves_to.length != 0) {
            blankev.push(ev.data.chain.evolves_to[0].species.name);
            if (ev.data.chain.evolves_to[0].evolves_to.length != 0) {
              blankev.push(ev.data.chain.evolves_to[0].evolves_to[0].species.name);
            }
          }
          //console.log(blankev);
          let eid = [];
          for (let i = 0; i < blankev.length; i++) {
            eid.push(await getId(blankev[i]));
          }
          console.log(eid);
          let newev = [];
          for (let i = 0; i < blankev.length; i++) {
            newev.push([blankev[i], eid[i]]);
          }
          setevolution(newev);
    
          //console.log(res.data.types);
          
          const st=res.data.stats
          const stdata={}
          for (let i = 0; i < st.length; i++) {
            stdata[st[i].stat.name]=st[i].base_stat
          }
          console.log(stdata);
          setstats(stdata)
    
    
          const tp=res.data.types
          const tpdata=[]
          for (let i = 0; i < tp.length; i++) {
            tpdata.push(tp[i].type.name)
          }
          console.log(tpdata);
    
          const dmurl=res.data.types[0].type.url
          const dmres = await axios.get(dmurl);
          const dm=dmres.data.damage_relations
          const dmdata=[]
          for (let i = 0; i < dm.double_damage_from.length; i++) {
            dmdata.push(dm.double_damage_from[i].name)
          }
          console.log("dmdata",dmdata);
    
          const strengthdata=[]
          for (let i = 0; i < dm.double_damage_to.length; i++) {
            strengthdata.push(dm.double_damage_to[i].name)
          }
          console.log(strengthdata);
          settypes({
            types: tpdata,
            strength: strengthdata,
            weakness:dmdata
          })
          console.log(types)
        }
        getData();
      });
      return (
        <>
          <br />
          <hr />
          <h1 className="head"><span className="headspan">#{basicdetail.id}</span> {basicdetail.name.toUpperCase()} <span className="headspan">#{basicdetail.id}</span> </h1>
          <div>
            <Link to={bothid.previd}><button className="pokebutton" style={{borderRadius:'20px 0px 0px 20px'}}>Previous</button></Link>
            
            <Link to={bothid.nextid}><button className="pokebutton"style={{borderRadius:'0px 20px 20px 0px'}}>Next</button></Link>
            
          </div>
          <div className="infomain">
            <div className="info-container">
              <div className="ftext">
                <b>{basicdetail.phrase}</b>
              </div>
              <div
                className="infocard"
                style={{ backgroundColor: colors[basicdetail.type][0] }}
              >
                <img src={basicdetail.png} alt={pokename} />
              </div>
              <div
                className="infocard"
                style={{ backgroundColor: colors[basicdetail.type][0] }}
              >
                <img src={basicdetail.svg} alt={pokename} />
              </div>
              <div
                className="infocard"
                style={{ backgroundColor: colors[basicdetail.type][0] }}
              >
                <Pokestat infos={types}  />
              </div>
              <div
                className="infocard"
                style={{ backgroundColor: colors[basicdetail.type][0] }}
              >
                <Statchart stat={stats} />
              </div>
            </div>
            <div className="info-container">
              {evolution.map((i) => {
                let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${triNum(
                  i[1]
                )}.png`;
                let refUrl = `/pokemon/${i[0]}`;
                return (
                  <>
                    <div
                      className="evolvecard"
                      style={{ backgroundColor: colors[basicdetail.type][0] }}
                    >
                      <Link to={refUrl}  style={{textDecoration:'none'}}>
                        <h2>{i[0].toUpperCase()}</h2>
                        <img src={imgUrl} alt={i[0]} />
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      );
}

export default Idpokemon