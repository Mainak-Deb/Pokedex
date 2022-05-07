import React from 'react'
import Home from './Home'
import { BrowserRouter, Routes, Route,useParams,useNavigate,Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import './styles/App.css'
import Pokemon from './Pokemon';


const App = () => {
  return (
    <>
     <BrowserRouter>
     <Link to='/' style={{textDecoration:'none'}}>
      <h1 >
        <span style={{color:'white'}} >Poke</span>  
        <span style={{color:'yellow'}}  >Dex</span>
        </h1>
     </Link>
     

     
      <div>
        <Searchbar/>
      </div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/pokemon" element={<Pokemon/>} >
            <Route path=":pokename" element={<Pokemon/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


// const Pokehead = () => {
//   return (
//     <></>
//   )
//     <>
//     <h1></h1>
//     </>
  
// }

export default App
