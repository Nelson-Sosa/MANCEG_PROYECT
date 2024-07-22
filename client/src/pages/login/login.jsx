import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgLogin from "../../Assets/Logo.png";
import imgBackground from "../../Assets/BG.png";
import Cookies from "universal-cookie";
import "./login.css";

const cookies = new Cookies();

export const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      cookies.set("token", res.data.token, { maxAge: 3600 });
      cookies.set("user", res.data.username, { maxAge: 3600 });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="loginDesing">
      <img
        src={imgBackground}
        alt="Imagen de fondo"
        className="ImagenBackgroud"
      />
      <div className="loginContainer">
        <img src={imgLogin} alt="Imagen Login" className="logo" />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputField"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputField"
          />
          <button type="submit" className="button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};
