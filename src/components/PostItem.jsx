import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  title,
  contenu,
  source,
  authorID,
  thumbnail,
  createdAt,
}) => {
  const shortDescription =
    contenu.length > 145 ? contenu.substr(0, 145) + `...voir plus ` : contenu;
  const postTitle =
    title.length > 30 ? title.substr(0, 30) + "...voir plus" : title;
  return (
    <article className="post">
      <div className="post__imag">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt="title"
        />
      </div>
      <div className="post__content">
        <Link to={`/posts/${postID}`}>
        <p className="detailsPost">Voir details du post</p>
          <h3 >  {postTitle}</h3>
        </Link>

        <p dangerouslySetInnerHTML={{ __html: shortDescription }} />
        <div className="post_footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
        </div>
      </div>
    </article>
  );
};

export default PostItem;
 