import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './NavBar.module.css';

export default function NavBar() {
  const lobby = useSelector((state) => state.lobby);
  const user = useSelector((state) => state.user);

  return (
    <div className={classes.topnav}>
      <Link to="/">На главную</Link>
      <p>{lobby.id ? `Игра: ${lobby.id}` : ''}</p>
      <p>{user.login}</p>
    </div>
  );
}
