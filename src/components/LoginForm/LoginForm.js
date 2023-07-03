import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import axios from 'axios';

const LoginForm = ({ onLogin, setIsNotRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar si hay una sesión activa al cargar la página
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      onLogin();
    }
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('emailVerify', email); // Agregar campo 'emailVerify' con el valor del email
    formData.append('passwordVerify', password); // Agregar campo 'passwordVerify' con el valor del password
  
    // Realizar la petición HTTP para autenticar al usuario
    axios
      .post('http://localhost/panel/api/index.php/users/verify', formData)
      .then((response) => {
        const { status, data } = response.data;
        if (status === 200) {
          const { success } = data;
          if (success) {
            // Almacenar los datos de la sesión en localStorage
            localStorage.setItem('user', email);
            onLogin();
          } else {
            setError('Error de autenticación');
          }
        } else {
          setError('Error de autenticación');
        }
      })
      .catch((error) => {
        setError('Error en la petición HTTP');
      });
  };
  
  
  
  

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-container__title">Inicio de sesión</h1>
      <fieldset className="login-input-fieldset">
        <div className="login-input-container">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            className="login-form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-input-container">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            className="login-form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </fieldset>
      <button className="login-form__button" type="submit">
        Entrar
      </button>
      <p className="login-container__message">
        ¿No tienes una cuenta?{' '}
        <a href="#" onClick={() => setIsNotRegister(true)}>
          Regístrate aquí
        </a>
      </p>
      {error && <p className="login-container__error">{error}</p>}
    </form>
  );
};

export default LoginForm;
