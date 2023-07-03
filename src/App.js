import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import Alert from './components/Alert/Alert';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNotRegister, setIsNotRegister] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(false);
    setShowAlert(true); // Mostrar la alerta después de un registro exitoso
  };

  const handleShowRegisterForm = () => {
    setIsNotRegister(true);
  };

  const handleShowLoginForm = () => {
    setIsNotRegister(false);
  };

  const dismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="app">
      <div className="login-container">
        {!isLoggedIn && !isNotRegister ? (
          <LoginForm onLogin={handleLogin} setIsNotRegister={handleShowRegisterForm} />
        ) : isNotRegister ? (
          <RegisterForm onRegister={handleRegister} setIsNotRegister={handleShowLoginForm} />
        ) : (
          <Dashboard />
        )}
      </div>
      {showAlert && <Alert message="Registro exitoso!." onDismiss={dismissAlert} />}
    </div>
  );
};

export default App;



