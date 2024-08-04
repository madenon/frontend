import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandle = (event) => {
    setUserData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        userData
      );
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2>Se Connecter</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}

          <input
            type="email"
            placeholder="Votre Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandle}
            autoFocus
          />

          <input
            type="password"
            placeholder="Votre mot de passe"
            name="password"
            value={userData.password}
            onChange={changeInputHandle}
          />

          <button type="submit" className="btn primary">
            Se Connecter
          </button>
        </form>
        <small>
          Vous n'avez pas de compte ?{" "}
          <Link to="/register" className="btn primary">
            S'inscrire
          </Link>
        </small>
      </div>
    </section>
  );
};

export default Login;
 