import React, { useState, useEffect } from "react";
import { link,useHistory,  useParams } from "react-router-dom";

import axios from "axios";
import "./movies.css";
export default function Movies({ token2 }) {
const [movies, setmovies] = useState([]);
const [element, setelement] = useState("");
// const {id} = useParams();
// علشان نخزن قيمة state الجديده
// const [searchArr, setSearchArr] = useState("");
const [role, setrole] = useState(null);
const [token, settoken] = useState(null)
useEffect(async () => {
  
  const  _token = token2 ? token2 :  localStorage.getItem('token');
  // عشان ناخذ التوكن اما من الصفحه الي قبلها او من اللوكل ستوريج
  const  _role = localStorage.getItem('role');
  const  token = localStorage.getItem('token');

  // اليوزر ياخذه من الصفحه الي قبل اما الادمن
  // ياخذ من الوكل ستوريج 
  const res = await axios.get("http://localhost:5000/movies", {
    headers: { authorization: "Bearer " + _token },
    // useEffect نستدعيها مرا وحده الي هي يوم نعمل ل Commponet init  بحيث يجيب البيانات من Api 
  });
  setrole(_role);
      console.log("jjjjj");
      settoken(token);
  setmovies(res.data);
}, []);


// const searchTarget = (e) => {
//   setSearchArr(e.target.value);
// };
// const search = () => {
//   const search1 = movies.filter((elm) => {
//     if (elm.name.toLowerCase().includes(searchArr.toLocaleLowerCase())) {
//       return elm;
//     }
//         });
//         setmovies(search1)
// };




const deleteMovies=async (id, index)=>{
console.log(id);
  const deleteMovies = await axios.delete(`http://localhost:5000/movies/${id}`,
 
  {
    headers: { authorization: `Bearer ${token}` },
  }
);
console.log(deleteMovies.data);

  const copiedArr= [...movies];
  copiedArr.splice(index,1);
  setmovies(copiedArr);

};
console.log("kkkkkk");


  
  return (
   
    <div className="div1">
      <div className="gggggg">
      

       {/* <input type="text" onChange={(e)=>{searchTarget(e)}} />
          <button onClick={()=>{search()}}>search</button> */}
          </div>
          <div className="all-moves">

       {movies.map((elem, i) => {
         return (
           <div className="img">
             
             <p className="modiv">{elem.name}</p>
             <img className="movdiv" src={elem.img} alr="no img" />
             <p className="modiv">{elem.description}</p>

             
             {role && role == "admin" ? (
              //علشان يشيك هل هو ادم او يوزر 
             <button
                onClick={() => {
                  deleteMovies(elem._id, i);
                }}
              >delete</button>
              ) : null}


           </div>
           
         );
       })}
       </div>
    
     </div>
   );
 }
    