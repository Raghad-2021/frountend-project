import React, { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";

import axios from "axios";
export default function Movies({ token }) {
const [movies, setmovies] = useState([]);
// علشان نخزن قيمة state الجديده
// const [searchArr, setSearchArr] = useState("");

useEffect(async () => {
  const res = await axios.get("http://localhost:5000/movies", {
    headers: { authorization: "Bearer " + token },
    // useEffect نستدعيها مرا وحده الي هي يوم نعمل ل Commponet init  بحيث يجيب البيانات من Api 
  });
  setmovies(res.data);
}, []);
   


  return (
   
    <div className="div1">
       {movies.map((elem, i) => {
         return (
           <div>
             <p>{elem.name}</p>
             <p>{elem.description}</p>
             <img src={elem.img} alr="no img" />
           </div>
         );
       })}
    
     </div>
   );
 }
    