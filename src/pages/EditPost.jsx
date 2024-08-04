import React, { useContext, useEffect, useState } from "react";
import  'react-quill/dist/quill.snow.css'
import ReactQuil from 'react-quill'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import axios from "axios";



const EditPost = () => {
  const [title, setTitle] = useState("");
  const [contenu, setContenu] = useState("");
  const [thumbnail, setThumbnail] = useState(false);
  const [source, setSource] = useState("");
  const [error, setError] = useState("");
  const {id} = useParams()


  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
const navigate = useNavigate()
  // rediriger vers la page de connexion pour tout utilisateur qui n'est pas connecté

useEffect(() =>{
  if(!token){
    navigate("/login")
  }
},[])


const editPost = async(e) =>{
  e.preventDefault();

  const postData = new FormData();
  postData.set("title", title);
  postData.set("contenu", contenu);
  postData.set("source", source);
  postData.set("thumbnail", thumbnail);
 
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
      postData,
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status == 200) {
      return navigate("/");
    }
  } catch (err) {
    console.log(err)
    setError(err.response.data.message);
  }


}


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

useEffect(() =>{
  const getPost = async(e) =>{


    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setTitle(response.data.title)
        setContenu(response.data.contenu)
        setSource(response.data.source)
        // setThumbnail(response.data.thumbnail)

      
    } catch (error) {
      console.log(error)
      
    }
  }
  getPost()

},[])


  return (
    <section className="create-post">
      <div className="container">
        <h2>Modifier  un poste</h2>
       {error &&  <p className="form__error-message">
          {error}
        </p>}
        <form className="form create-post__form" onSubmit={editPost}>
          <input type="text" placeholder="Le titre du poste"  value={title} onChange={(e) =>setTitle(e.target.value)} autoFocus/>
          
           <div className="thumbnail">
           <p>Voulez-vous remplacer  l'Image</p>
           <input
              onChange={(e) => setThumbnail(e.target.files[0])}
              type="file"
              accept=".png, .jpg, .jpeg, pdf"
              placeholder="Charger une image "
              
            />
           </div>

          <ReactQuil   modules={modules} formats={formats} value={contenu} onChange={setContenu} />
          <input
            type="text"
            placeholder="La source de la note  y compris nom du quartier et Ville"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
            }}
          />
            <button type="submit" className="btn primary">Mettre a jour  le post </button>
        </form>
      </div>

    </section>
  )
};

export default EditPost;
 
