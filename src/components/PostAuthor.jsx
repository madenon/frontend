import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import   TimeAgo from "javascript-time-ago";
import moment from "moment"
import "moment/locale/fr";
 import fr  from "javascript-time-ago/locale/fr.json"
// fr fr from "timeago/locales/jquery.timeago.fr";

 import ru  from "javascript-time-ago/locale/ru.json"

 TimeAgo.addDefaultLocale(fr)
 TimeAgo.addLocale(ru)


const PostAuthor = ({ createdAt, authorID  }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <Link to={`/posts/users/${authorID}`} className="post__author">
      <div className="post__author-avatar">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`}
          alt="thumbnail"
        />
      </div>

      <div className="post__author-deatils">
        <h5>Par: {author?.name}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale="us-US"/></small>
        <div>
        <span className="text-xs text-slate-500">{moment(createdAt).format("MMMM Do YYYY HH:mm:ss")}</span>

        </div>
      </div>
    </Link>
  );
};

export default PostAuthor;
 