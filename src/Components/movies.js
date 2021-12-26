import React, { useState, useEffect } from "react";
import { useHistory} from "react-router-dom";

import axios from "axios";
import "./movies.css";
export default function Movies({ token }) {
const [movies, setmovies] = useState([]);
// علشان نخزن قيمة state الجديده
// const [searchArr, setSearchArr] = useState("");

useEffect(async () => {
  
  const  _token = token ? token :  localStorage.getItem('token')
  // اليوزر ياخذه من الصفحه الي قبل اما الادمن
  // ياخذ من الوكل ستوريج 
  const res = await axios.get("http://localhost:5000/movies", {
    headers: { authorization: "Bearer " + _token },
    // useEffect نستدعيها مرا وحده الي هي يوم نعمل ل Commponet init  بحيث يجيب البيانات من Api 
  });
  setmovies(res.data);
}, []);
   


  return (
   
    <div className="div1">
       {movies.map((elem, i) => {
         return (
           <div className="movdiv">
             <p>{elem.name}</p>
             <p>{elem.description}</p>
             <img src={elem.img} alr="no img" />
           </div>
         );
       })}
    
     </div>
   );
 }
    