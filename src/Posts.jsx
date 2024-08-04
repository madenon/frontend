import React, { useEffect, useState } from "react";
import axios from "axios";
import PostItem from "./PostItem";
import Loader from "./Loader";

const Posts = () => {
  const [posts, setPost] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsloading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
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
                thumbnail={thumbnail}
                title={title}
                contenu={contenu}
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

export default Posts;
 