import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({ message, onDismiss }) => {
  useEffect(() => {
    const timeout = setTimeout(onDismiss, 4000);

    return () => clearTimeout(timeout);
  }, [onDismiss]);

  return (
    <div className="alert">
      <p className="alert__message">{message}</p>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Alert;

