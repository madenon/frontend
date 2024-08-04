import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import axios from "axios";
const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPasword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setConfirmNewPassword] = useState("");
  const [isAvatar, setIsAvatar] = useState(false);
  const [error, setError] = useState("");

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  // rediriger vers la page de connexion pour tout utilisateur qui n'est pas connecté

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
useEffect(() =>{
  const  getUtilisateur = async () =>{
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`, {withCredentials:true, headers:{Authorization: `Baerer ${token}`}})
    const {name, email, avatar} = response.data
    setName(name)
    setEmail(email)
    setAvatar(avatar)

  }
  getUtilisateur()

},[])


  const changeProfileAvatar = async() =>{
    setIsAvatar(false);
    try {
      const postData = new FormData();
       postData.set('avatar', avatar)
      
       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData,
        {withCredentials:true, headers:{Authorization: `Bearer ${token} `}}
       )


       setAvatar(response?.data.avatar)
    } catch (error) {
      console.log(error)
      
    }
    


  }


  const udpateProfileUser = async(e) =>{
    e.preventDefault()
   try {
    
    const userData = new FormData();
    userData.set('name', name)
    userData.set('email', email)
    userData.set('avatar', avatar)
    userData.set('currentPasword', currentPasword)
    userData.set('newPassword', newPassword)
    userData.set('newConfirmPassword', newConfirmPassword)
    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {withCredentials:true, headers:{Authorization: `Bearer ${token}`}})
    if(response.status == 200){
      // l utilisateur se sera deconnecter pour pouvoir se connecter avec les nouveaux identifiants
      navigate("/login")
    }
   } catch (error) {
    setError(error.response.data.message)
    
   }


  }

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          cliquer ici pour voir tout mes posts
        </Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>
              <h1>Telecharger un avatar</h1>
            <form className="avatar__form">
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg"
                name="avatar"
                id="avatar"
              />
              <label htmlFor="avatar" >
                <FaEdit onClick={() =>setIsAvatar(true)} />
              </label>
            </form>

            {isAvatar && (
              <button className="profile__avatar-btn" onClick={changeProfileAvatar}>
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{currentUser.name}</h1>
          {/* section modification */}

          <form className="form profile__form" onSubmit={udpateProfileUser}>
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Votre Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Votre mot de passe actuel"
              value={currentPasword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmer Nouveau mot de passe"
              value={newConfirmPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Mettre A Jour
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
 