import React from 'react'
import "./styles/Addmore.css";
const Addmore = (props) => {
    const plus=()=>{
        console.log("clicked")
        props.handleAdd(
            (prevarr)=>{
                let newarr=[...prevarr];
                let last= prevarr.length+1
                for(let i=last;i<=last+20;i++) newarr.push(i);
                console.log("pokes",props.pokes)
                return newarr;
            }
        )
    }

  return (
    <>  
        <div className="container">
        {/* <img src="https://pngimg.com/uploads/pokeball/pokeball_PNG30.png" alt="Snow" style="width:100%"/> */}
        <button className="btn" onClick={plus} > More</button>
        </div>
    </>
  )
}

export default Addmore