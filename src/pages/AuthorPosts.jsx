import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

const AuthorPosts = () =>  {



  const [posts, setPost] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const {id} = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      setIsloading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`
        );
        setPost(response?.data);
      } catch (error) {
        console.log(error);
      }

      setIsloading(false);
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              contenu,
              title,
              source,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                title={title}
                contenu={contenu}
                thumbnail={thumbnail}
                authorID={creator}
                source={source}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">Pas de post</h2>
      )}
    </section>
  );

  
  
};
export default AuthorPosts;
 