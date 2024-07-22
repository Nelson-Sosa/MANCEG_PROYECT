import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imgLogin from "../../Assets/Logo.png";
import imgBackground from "../../Assets/BG.png";

import "./register.css"

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) { 
      newErrors.username = 'Username can only contain alphanumeric characters';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    /* if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
      newErrors.password = 'Password must contain at least uppercase letter, lowercase letter, number, and special character';
    } */

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post('http://localhost:8000/api/register', { username, email, password, confirmPassword });
        navigate('/login');
      } catch (err) {
        console.error(err);
        alert('Error registering user');
      }
    }
  };

  return (
    <div className="registerDesing">
      <img
        src={imgBackground}
        alt="Imagen de fondo"
        className="ImagenBackgroud"
      />
      <div className="registerContainer">
        <img src={imgLogin} alt="Imagen Login" className="logo" />
        <form onSubmit={handleSubmit} className="formContainer" >
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            {errors.username && <div className="error"> {errors.username} </div>}
          </div>
          <div className="inputContainer">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <div className="error"> {errors.email} </div>}
          </div>
          <div className="inputContainer">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <div className="error"> {errors.password} </div>}
          </div>
          <div className="inputContainer">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            {errors.confirmPassword && <div className="error"> {errors.confirmPassword} </div>}
          </div>
          <div className="buttonContainer">
            <button type="submit" className="register"> REGISTER </button>
          </div>
        </form>
      </div>
    </div>
  );
};