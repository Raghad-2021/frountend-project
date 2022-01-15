import React, { useState, useEffect,  } from 'react';
import { useParams , useHistory} from "react-router-dom";
import { RiDeleteBin5Fill } from 'react-icons/ri';

import axios from "axios";

import "./Comment.css";


export default function Comment({}) {
    const [movies, setmovies] = useState([]);
    const [token, setToken] = useState(null)
    const {comment} = useParams()
    const {id} = useParams()
    const [comments, setComment] = useState([]);
    const [input, setinput] = useState('')
    const history=useHistory()
    const [elem, setelem] = useState("")

    useEffect(async () => {
        console.log(id,"id");
        const tokenFromStorage = localStorage.getItem('token')
        setToken(tokenFromStorage)
        const res = await axios.get(`http://localhost:5000/comment/${id}`,{
            headers: { authorization: "Bearer " + tokenFromStorage }
        });
      console.log(res.data);
      setmovies(res.data);
      setComment(res.data.comment)
              }, []);


        
        
              const changeComment=(e)=>{
                setinput(e.target.value)
              }

              const addComment=async()=>{
                const res = await axios.post(
                    `http://localhost:5000/comment/${id}`,
                    {
                        comment:input
                    },
                    { headers: { authorization: "Bearer " + token } }
                  );
                //  history.push("./Comment")
                // console.log(res.data)
                setinput('')
                  setComment([...res.data])
              }

              console.log("Comment5");
              
      const deleteComment=async (movieId, index)=>{
  //console.log(id);
      const updatedComments = comments.filter((el , i) => i != index)
    
    const deleteComment = await axios.patch(`http://localhost:5000/comment/${movieId}` , {comments: updatedComments},
   
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  console.log(deleteComment.data);
  
    const copiedArr= [...comments];
    copiedArr.splice(index,1);
    setComment(copiedArr);
  
  };

    return (
        <div>
        {movies? <div>

            <p>{movies.name}</p>
      <p>{movies.description}</p>
      <img src={movies.img} alr="no img" />

      <br/>
      <br/>
      <br/>

      <iframe
      width="420"
      height="315"
      src={movies.video}
      />  

    <br/>
    <br/>
    <br/>

      <textarea  clssName="input"   onChange={(e)=>{changeComment(e)}}  ></textarea>
      <br/>
      <br/>

      <button onClick={()=>{addComment()}}>add comment</button>

      <div>
      <h1>{comments.map((elm,i)=>{
        console.log("_id");
          return <>
              <p> {elm.userName}</p>
              <p>{elm.comment}</p>
              
              <button onClick={()=>{deleteComment(movies._id, i) }}>
              <RiDeleteBin5Fill/>

              </button>

              </>
          
      })}</h1>
      </div>
      </div>
      :""}
        </div>
    )
}



