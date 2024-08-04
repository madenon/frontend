import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading , setIsLoading] = useState(false)

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  // rediriger vers la page de connexion pour tout utilisateur qui n'est pas connecté

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const DeletePost = async () => {
    setIsLoading(true)
    
    try {

      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log("Post non trouvé");
    }
  };

  if(isLoading){
    return <Loader />
  }

  return (
    <Link className="btn sm danger" onClick={() => DeletePost(id)}>
      Supprimer
    </Link>
  );
};

export default DeletePost;
 