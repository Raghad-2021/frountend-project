import React, { useState, useEffect }   from 'react'

import axios from "axios";

export default function Favorit( {token} ) {
    const [movies, setmovies] = useState([]);
    const [Favorit, setFavorit] = useState([]);
     useEffect(async () => {          
         if(token) {
             const Fav = await axios.get("http://localhost:5000/Favorit", {
                 headers: {authorization: "Bearer " + token},
             });
             setFavorit(Fav.data);
             console.log(Fav.data, "ggggggggg");
         }
     }, [token]);

    

     

    return (
        <div className="div1">

          
          <div className="all-moves-here">

     
    {Favorit.map((elem, i)  => { 


         console.log(elem);
       
         return (
           
           <div   className="img" key={i}>
             
             <p>{elem.moviesId.name}</p>
             
             <p >{elem.moviesId.description}</p>
            
             <img  src={elem.moviesId.img} alr="no img" />
      
            

           </div>
          
           
         );
       })}
       </div>
    
     </div>
   );
 }
    
