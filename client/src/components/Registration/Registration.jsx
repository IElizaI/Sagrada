import React from 'react';
import './Registration.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormItem from '../FormItem/FormItem';
import { getApiUrl } from '../../constans/constans';

export default function Registration() {
  const inputs = useSelector((store) => store.registrationInputs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrationHandler = async (e) => {
    e.preventDefault();

    const toBack = await fetch(getApiUrl('/register'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    const fromBack = await toBack.json();
    dispatch({ type: 'SET_USER', payload: fromBack });
    dispatch({ type: 'CLEAR_DATA', payload: {} });
    navigate('/', { fromBack });
  };

  return (
    <div className="container">
      <form onSubmit={registrationHandler} className="register-form">
        <h1 className="register-text">Регистрация</h1>
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
        <div className="mb-3">
          <label htmlFor="exampleInputLogin" className="form-label">
            Логин
          </label>
          <input
            placeholder="Введите логин"
            type="login"
            name="login"
            className="form-control"
            id="inputLogin"
            value={inputs.login ?? ''}
            onChange={(e) =>
              dispatch({
                type: 'USER_TYPING',
                payload: { [e.target.name]: e.target.value },
              })
            }
          />
        </div>
        <div className="register-btn-div">
          <button type="submit" className="register-btn">
            <div>Зарегистрироваться</div>
          </button>
        </div>
      </form>
    </div>
  );
}
