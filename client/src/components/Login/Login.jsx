import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../constans/constans';
import FormItem from '../FormItem/FormItem';
import classes from './Login.module.css';

export default function Login() {
  const inputs = useSelector((store) => store.loginInputs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const Login = () => {
  //   return (
  //     <div>
  //       Вход
  //       <FormItem
  //         title="Вход"
  //         input={{ email: 'email', password: 'Пароль' }}
  //         button={{ submit: 'Войти', redirect: 'Регистрация' }}
  //         link="/register"
  //         formType="login"
  //       />
  //     </div>
  //   );
  // };

  const loginHandler = async (e) => {
    e.preventDefault();

    const toBack = await fetch(getApiUrl('/login'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    const fromBack = await toBack.json();
    dispatch({ type: 'SET_USER', payload: fromBack });
    navigate('/');
  };
  return (
    <div className={classes.container}>
      <form className={classes.loginForm} onSubmit={loginHandler}>
        <h1 className={classes.loginText}>Вход</h1>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            placeholder="Введите email"
            type="email"
            name="email"
            className="form-control"
            id="inputEmail"
            value={inputs.email ?? ''}
            onChange={(e) =>
              dispatch({
                type: 'USER_TYPING',
                payload: { [e.target.name]: e.target.value },
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Пароль
          </label>
          <input
            placeholder="Введите пароль"
            type="password"
            name="password"
            className="form-control"
            id="inputPassword"
            value={inputs.password ?? ''}
            onChange={(e) =>
              dispatch({
                type: 'USER_TYPING',
                payload: { [e.target.name]: e.target.value },
              })
            }
          />
        </div>
        <div className={classes.btnDiv}>
          <button type="submit" className={classes.btn}>
            <div>Войти</div>
          </button>
        </div>
      </form>
    </div>
  );
}
