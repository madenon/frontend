import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../images/ci.jpeg";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/userContext";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );

  const { currentUser } = useContext(UserContext);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };
  return (
    <nav className="nav">
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <img src={logo} alt="Logo" />
        </Link>
        
              <Link to="/" onClick={closeNavHandler} className="accueil">
              Accueil
              </Link>
            
        {currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler} className="profil_name ">
                {currentUser?.name}
              </Link>
            </li>
            <li>
              <Link to="/creer" onClick={closeNavHandler}>
                Creer un post
              </Link>
            </li>
            <li>
              <Link to="/autheurs" onClick={closeNavHandler} >
                Les Auteurs
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>
                Deconnexion
              </Link>
            </li>
          </ul>
        )}

        {!currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/autheurs" onClick={closeNavHandler}>
                Les Auteurs
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavHandler}>
                connexion
              </Link>
            </li>
          </ul>
        )}

        <button
          className="nav_toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
 