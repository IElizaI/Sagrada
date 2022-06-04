import React from 'react';
import classes from './Button.module.css';

function Button({ children, color, ...props }) {
  return (
    <button {...props} className={`${classes.btn} ${classes[color]}`}>
      {children}
    </button>
  );
}

export default Button;
