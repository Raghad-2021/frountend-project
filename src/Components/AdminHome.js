import React, { useState, useEffect } from 'react'

import axios from "axios";
import "./Admin.css";
export default function AdminHome({token}) {

    const [name, setname] = useState("");
    const [img, setimg] = useState("")
    const [description, setdescription] = useState("")
    const [userId, setUserId] = useState("")
    // const [token, setToken] = useState("")
    const [role, setrole] = useState("")
    // useState علشان تخزن لي قيمة الفنكشن
    useEffect(() => {
        //اليوزر هو الي يقدر يحذف او يضيف
        const _userId = localStorage.getItem('userId')
  
        setUserId(_userId)
    
    }, [])

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
         try{
           console.log(token)
        const res = await axios.post(
            `http://localhost:5000/movies`,
            {
                name: name,
                description: description,
                img: img ,
                userId: userId           },
            { headers: { authorization: "Bearer " + token } }

           
          );
      

            } catch(e) {
                console.log(e)
            }
      }
      
      
    return (

     
      <div className='ddd'>
      <h1>Add Movies</h1>
      <input
        onChange={(e) => {
            changename(e);
        }}
        type="text"
        placeholder="name"
      />{" "}
        <br/>
        <br/>
        <input
        onChange={(e) => {
            changeimg(e);
        }}
        type="text"
        placeholder="img"
      />

      <br/>
      <br/>
    
    <input
        onChange={(e) => {
            changedescription(e);
        }}
        type="text"
        placeholder="description"
      />
      <br/>
      <br/>
      <button
        onClick={() => {
            addmovies();
        }}
      >

        Submit
      </button>
      {/* <h3>{token}</h3> */}
      </div>
 
  );
}
