import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

import "./SignUp.css";

export default function SinUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePass = (e) => {
    setPass(e.target.value);
  };
  const addUser = async () => {
    const res = await axios.post("http://localhost:5000/sinUp", {
      name,
      email,
      pass,
    });
    if (res.status == 201) {
      history.push("/logIn");
    }
  };
  return (
  
   

    <div className="loginbox">
 
     <h1>SignUp</h1>
     <label>Name:</label>

     <br/>
      <input
        onChange={(e) => {
          changeName(e);
        }}
        type="text"
        placeholder="name"
      /> 
      <br/>
      <br/>
      <label>email:</label>

      <br/>
      <input
        onChange={(e) => {
          changeEmail(e);
        }}
        type="text"
        placeholder="email"
      />
            <br/>
            <br/>
          
            <label>password:</label>
        <br/>
      <input
        onChange={(e) => {
          changePass(e);
        }}
        type="pass"
        placeholder="pass"
      /> 
            <br/>
            <br/>


      <button
        onClick={() => {
          addUser();
        }}
      >
        sinUp
      </button>
      <i class="fas fa-user"></i>


    </div>
    
  );
}
