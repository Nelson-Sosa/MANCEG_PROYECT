import { Link } from 'react-router-dom';
import imgBackground from "../../Assets/BG.png";
import imgLogin from "../../Assets/Logo.png";

import "./home.css"

export const Home = () => {
  return (
    <div className="welcomeDesign">
        <img
          src={imgBackground}
          alt="Imagen de fondo"
          className="ImagenBackgroud"
        />
      <div className="homeContainer">
        <h1> WELCOME! </h1>
        <img src={imgLogin} alt="Imagen Login" className="logo" />
        <div className="homeButtons">
          <Link to="/login"><button> LOGIN </button></Link>
          <Link to="/register"><button> REGISTER </button></Link>
        </div>
      </div>
    </div>
  );
};