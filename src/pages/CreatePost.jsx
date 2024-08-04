import React, { useState, useContext, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuil from "react-quill";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [contenu, setContenu] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  // rediriger vers la page de connexion pour tout utilisateur qui n'est pas connecté

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const CreatePost = async (e) => {
    // se referer au mode dans la base de donnee
    e.preventDefault();
    const postData = new FormData();
    postData.set("title", title);
    postData.set("contenu", contenu);
    postData.set("source", source);
    postData.set("thumbnail", thumbnail);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status == 201) {
        return navigate("/");
      }
    } catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Creer un poste</h2>
        {error && <p className="form__error-message">{error}</p>}

        <form className="form create-post__form" onSubmit={CreatePost}>
          <input
            type="text"
            placeholder="Le titre du poste"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          {/* <span className="text-xs text-slate-500">{moment(date).format("MMMM Do YYYY / HH:mm:ss")}</span> */}
          <div className="thumbnail">
            <p>Télécharger une Image</p>
            
            <input
              onChange={(e) => setThumbnail(e.target.files[0])}
              type="file"
              accept=".png, .jpg, .jpeg, .mp4"
              placeholder="Charger une image "
              
            />
          </div>

          <ReactQuil
            modules={modules}
            formats={formats}
            value={contenu}
            onChange={setContenu}
          />
          <input
            type="text"
            placeholder="La source de la note  y compris nom du quartier et Ville"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
            }}
          />
          <button type="submit" className="btn primary">
            Creer le post{" "}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
 