import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeInputHandle = (event) => {
    setUserData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userData );
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Impossible de vous enregistrer");
      }

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };




  return (
    <section className="register">
      <div className="container">
        <h2>S'Inscrire</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && (
            <p className="form__error-message">{error}</p>
          )}{" "}
          <input
            type="text"
            placeholder="Nom complet"
            name="name"
            value={userData.name}
            onChange={changeInputHandle}
          />
          <input
            type="email"
            placeholder="Votre Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandle}
          />
          <input
            type="password"
            placeholder="Votre mot de passe"
            name="password"
            value={userData.password}
            onChange={changeInputHandle}
          />
          <input
            type="password"
            placeholder="Confirmer votre mot de passe"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandle}
          />
          <button type="submit" className="btn primary">
            S'inscrire
          </button>
        </form>
        <small>
          Avez-vous déjà un compte ?{" "}
          <Link to="/login" className="btn primary">
            Connexion
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Register;
 