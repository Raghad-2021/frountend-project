import React, { useState, useEffect } from 'react'

import axios from "axios";

export default function AdminHome({token}) {
    const [movies, setmovies] = useState("");
    const [name, setname] = useState("");
    const [img, setimg] = useState("")
    const [description, setdescription] = useState("")
    
     const changename=(e)=>{
        setname(e.target.value)
     }
     const changedescription=(e)=>{
        setdescription(e.target.value);
     } 

     const changeimg=(e)=>{
        setimg(e.target.value);
     }
     const addmovies=async()=>{
        const res = await axios.post(
            `http://localhost:5000/movies`,
            {
                newName: name,
                newdescription: description,
                newImg: img            },
            { headers: { authorization: "Bearer " + token } }
          );
          console.log(res.data,"hhhhhh")
          setmovies(res.data.token)
      }

    return (
        <div>
            <h1>Admin</h1>
            <input onChange={(e)=>{changename(e)}} type="text" placeholder="name" />
            <input onChange={(e)=>{changedescription(e)}} type="text"     placeholder="description"
 />
            <input onChange={(e)=>{changeimg(e)}} type="text"placeholder="img"
 />
         
            <button onClick={()=>{addmovies()}}>add movies</button>
           
        </div>
    )
}


