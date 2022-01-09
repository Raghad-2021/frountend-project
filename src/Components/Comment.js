import React, { useState, useEffect,  } from 'react';
import axios from "axios";
import { useParams , useHistory} from "react-router-dom";


export default function Comment({}) {
    const [movies, setmovies] = useState(null);
    const [token, setToken] = useState(null)
    const {comment} = useParams()
    const {id} = useParams()
    const [comments, setComment] = useState([]);
    const [input, setinput] = useState('')
    const history=useHistory()
    

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

    return (
        <div>
        {movies? <div>

            <p>{movies.name}</p>
      <p>{movies.description}</p>
      <img src={movies.img} alr="no img" />
      <textarea onChange={(e)=>{changeComment(e)}}  ></textarea>
      <button onClick={()=>{addComment()}}>add comment</button>
      <div>
      <h1>{comments.map((elm,i)=>{
          return <>
              <p> {elm.userName}</p>
              <p>{elm.comment}</p>

              </>
          
      })}</h1>
      </div>
      </div>
      :""}
        </div>
    )
}



