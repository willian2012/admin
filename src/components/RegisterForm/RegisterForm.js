import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = ({ onRegister, setIsNotRegister }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', 'member');

      try {
        const response = await axios.post('http://localhost/panel/api/index.php/users/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 201 || response.status === 200) {
          // La solicitud se completó exitosamente
          setShowAlert(true);
          onRegister(email, password);
        } else {
          // Ocurrió un error en la solicitud
          console.error('Error al crear el usuario');
        }
      } catch (error) {
        console.error('Error al conectarse a la API', error);
      }
    };

  useEffect(() => {
    let timeout;
    if (showAlert) {
      timeout = setTimeout(() => {
        setShowAlert(false);
        setIsNotRegister(false); // Redirige al formulario de inicio de sesión
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [showAlert, setIsNotRegister]);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-container__title">Registro de usuario</h1>
        <div className="register-form__field">
          <label htmlFor="fullName" className="register-form__label">Nombre completo</label>
          <input
            id="fullName"
            className="register-form__input"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="register-form__field">
          <label htmlFor="email" className="register-form__label">Correo electrónico</label>
          <input
            id="email"
            className="register-form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="register-form__field">
          <label htmlFor="password" className="register-form__label">Contraseña</label>
          <input
            id="password"
            className="register-form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="register-form__button" type="submit">Registrarse</button>
        <p className="register-container__message">
          ¿Ya tienes una cuenta?{' '}
          <a href="#" onClick={() => setIsNotRegister(false)}>
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
