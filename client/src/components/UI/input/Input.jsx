import React, { forwardRef } from 'react';
import classes from './Input.module.css';

const Input = forwardRef((props, ref) => (
  <input ref={ref} className={classes.input} {...props} />
));

export default Input;
