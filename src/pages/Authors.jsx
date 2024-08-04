import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";



const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsloading] = useState(false);


  useEffect(() =>{
    const getAuthors =  async () =>{
      setIsloading(true)

      try {
        const response = await  axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
         setAuthors(response.data)
      } catch (error) {
        
      }
      setIsloading(false)
    }

   getAuthors()

  },[])

  if(isLoading){
    return <Loader />
  }
  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({_id: id, avatar, name, posts }) => {
            return (
              <Link key={id} to={`/posts/users/${id}`} className="author">
                <div className="author__avatar">
                  <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={`Image of ${name}`} />
                </div>
                <div className="author__info">
                  <h4>Nom:{name}</h4>
                  <p>nombre de post: {posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">Utilisateur ou Autheurs non trouvés</h2>
      )}
    </section>
  );
};

export default Authors;
 