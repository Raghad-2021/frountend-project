import React, { useState, useEffect } from "react";
import { link,useHistory,  useParams } from "react-router-dom";
import { FcLike } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { refresh } from 'react-icons/ri';

import axios from "axios";
import "./movies.css";
export default function Movies({ token }) {
const [movies, setmovies] = useState([]);
const [Favorit, setFavorit] = useState("");
// const [video, setvideo] = useState("");


const [element, setelement] = useState("");
// const {id} = useParams();
// علشان نخزن قيمة state الجديده
const [searchArr, setSearchArr] = useState("");
const [role, setrole] = useState(null);
const history=useHistory()
const {id} = useParams()
const [inputNameMovie, setInputNameMovie] = useState("")
useEffect(async () => {
  

  // عشان ناخذ التوكن اما من الصفحه الي قبلها او من اللوكل ستوريج
  const  _role = localStorage.getItem('role');
 

  // اليوزر ياخذه من الصفحه الي قبل اما الادمن
  // ياخذ من الوكل ستوريج 
  const res = await axios.get("http://localhost:5000/movies", {
    headers: { authorization: "Bearer " + token },
    // useEffect نستدعيها مرا وحده الي هي يوم نعمل ل Commponet init  بحيث يجيب البيانات من Api 
  });
  setrole(_role);
      // console.log("jjjjj");
   
  setmovies(res.data);
}, []);

useEffect(async () => {
  if(token) {
      const Fav = await axios.get("http://localhost:5000/movies", {
          headers: {authorization: "Bearer " + token},
      });
      setFavorit(Fav.data);
      console.log(Fav.data, "ffffff");
  }
}, []);


const searchTarget = (e) => {
  setSearchArr(e.target.value);
};
const search = () => {
  const search1 = movies.filter((elm) => {
    if (elm.name.toLowerCase().includes(searchArr.toLocaleLowerCase())) {
      return elm;
    }
        });
        setmovies(search1)
};




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

const gotmovies=async(id)=>{
  console.log(id)
  history.push(`/Comment/${id}`)
}
  


const toggleColor=async(id)=>{
  try{
 const res = await axios.post(
     `http://localhost:5000/Favorit/${id}`,
     {
            },
     { headers: { authorization: "Bearer " + token } }

    
   );

    //  setFavorit([...res.data])

    console.log( res.data, "kkk");
     } catch(e) {
         console.log(e)
     }
}

const changename=(e)=>{
  setInputNameMovie(e.target.value);
}

const updatenam=async (id,i)=>{
  console.log(id);
    const updateMovies = await axios.put(`http://localhost:5000/updet`,
    {
      id : id , 
      newName : inputNameMovie
    },
   
    {
      headers: { authorization: `Bearer ${token}` },
    }

  );
  // console.log(deleteMovies.data);
  
  
    setmovies(updateMovies.data);
  
  };

  return (
   
    <div className="div1">
      
          <div className="Search">
       <input type="text" onChange={(e)=>{searchTarget(e)}} />
          <button onClick={()=>{search()}}>
<BsSearch/>

          </button>
          </div>
          
          <div className="all-moves-here">

       {movies && movies.map((elem, i) => {
         
         console.log(elem);
         return (
           <div   className="img" key={i}>
             
             <p class="w3-text-yellow">{elem.name}</p>
             
             <p className="text">{elem.description}</p>
             <br/>
      <br/>
             <img  className="movdiv"  onClick={()=>{gotmovies(elem._id)}} src={elem.img} alr="no img" />
             
    
             <input
        onChange={(e) => {
            changename(e);
        }}
        type="text"
        placeholder="name"
      />

       <i><button class="fa fa-cloud"
                onClick={() => {
                  updatenam(elem._id);
                }}
               >
                 bbb
                 <refresh />
               </button>
      </i>
             {/* <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${elem.video}`}
    />              */}
    
    <button className="FcLike"
                onClick={() => {
                  toggleColor(elem._id);
                }}
               >
               
               
               <FcLike  />
               {/* disabled={isRedColor} */}

              </button>
              
             {role && role == "admin" ? (
              //علشان يشيك هل هو ادم او يوزر 
             <button className="BOUTN"
                onClick={() => {
                  deleteMovies(elem._id, i);
                }}
              >
                <RiDeleteBin5Fill/>


              </button>
              
              ) : null}


           </div>
           
         );
       })}
       </div>
    
     </div>
   );
 }
    