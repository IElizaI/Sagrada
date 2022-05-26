import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Main.module.css';
import img from '../../img/main-page/main.png';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getApiUrl } from '../../constans/constans';

const Main = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async (event) => {
    const toBack = await axios(getApiUrl('/logout'), {
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
          {user.login ? (
            <div type="button" className={classes.mainLink}>
              Привет, {user.login}!
            </div>
          ) : (
            <Link to="/login" type="button" className={classes.mainLink}>
              Войти
            </Link>
          )}

          {user.login && (
            <Link to="/lobbies" className={classes.mainLink}>
              Играть
            </Link>
          )}
          <Link to="/rules" type="button" className={classes.mainLink}>
            Правила
          </Link>
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
              Регистрация
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
