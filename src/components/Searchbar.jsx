import React, { useRef } from "react";
import { BrowserRouter, useNavigate } from 'react-router-dom';

import "./styles/Searchbar.css";

const Searchbar = () => {
  const ref= useRef(null)
  const navigate = useNavigate();
  return (
    <>
    <div className="searchContainer" >
      <input type="text" ref={ref} placeholder="Search" required />
      <button className="searchButton" type="submit" onClick={ 
        (event)=>{
            let pokename=ref.current.value
            console.log(pokename)
            navigate(`/pokemon/${pokename}`);
            
        }
       }  >🔍</button>
      </div>
    </>
  );
};

export default Searchbar;
