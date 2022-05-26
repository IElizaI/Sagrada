import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Main.module.css';
import img from '../../img/main-page/main.png';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setLobby } from '../../store/actions/lobby';

const Main = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const onPlayClick = async () => {
  //   const response = await axios.post(
  //     'http://localhost:3001/game/lobby/create',
  //     {},
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //   console.log(response);
  //   dispatch(setLobby(response.data));
  //   navigate('/lobby/' + response.data.id);
  // };

  const handleLogout = async (event) => {
    const toBack = await axios('http://localhost:3001/logout', {
      withCredentials: true,
    });

    if (toBack.status === 200) {
      dispatch({ type: 'SET_USER', payload: {} });
    }
  };

  return (
    <div className={classes.mainPage}>
      <div className={classes.mainImgDiv}>
        <img src={img} alt="sagrada-img" className={classes.mainImg} />
        <div className={classes.mainLinks}>
          <Link to="/rules" type="button" className={classes.mainLink}>
            Правила
          </Link>
          {user.login ? (
            <div type="button" className={classes.mainLink}>
              Привет, {user.login}!
            </div>
          ) : (
            <Link to="/login" type="button" className={classes.mainLink}>
              Логин
            </Link>
          )}
          {user.login ? (
            <Link
              to="/"
              type="button"
              onClick={handleLogout}
              className={classes.mainLink}
            >
              Выйти
            </Link>
          ) : (
            <Link to="/register" className={classes.mainLink}>
              Зарегистрироваться
            </Link>
          )}
          {user.login ? (
            <Link to="/lobbies" className={classes.mainLink}>
              Играть
            </Link>
          ) : (
            <Link to="/login" className={classes.mainLink}>
              Играть
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
