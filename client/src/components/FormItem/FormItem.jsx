import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import classes from './FormItem.module.css';

const FormItem = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {};
  const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const emailRegister = register('email', {
    required: 'Обязательное поле',
    pattern: {
      value: emailRegexp,
      message: 'Email не соответствует формату электронной почты',
    },
  });

  const passwordRegister = register('password', {
    required: 'Обязательное поле',
    pattern: {
      value: passwordRegexp,
      message:
        'Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру',
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{props.title}</h1>
        <Input
          {...emailRegister}
          id="email"
          type="text"
          placeholder={props.input.email}
        />
        <div>
          {errors?.email && (
            <p className={classes.errorMessage}>{errors?.email?.message}</p>
          )}
        </div>

        {props.formType === 'reset_password' ? (
          ''
        ) : (
          <Input
            {...passwordRegister}
            id="password"
            type="password"
            placeholder={props.input.password}
          />
        )}

        {props.formType === 'reset_password' ? (
          ''
        ) : (
          <div>
            {errors?.password && (
              <p className={classes.errorMessage}>
                {errors?.password?.message}
              </p>
            )}
          </div>
        )}

        <Button type="submit" color="yellow">
          {props.button.submit}
        </Button>

        {props.formType === 'reset_password' ? (
          ''
        ) : (
          <Link to={props.link} style={{ textDecoration: 'none' }}>
            <Button type="button" color="white">
              {props.button.redirect}
            </Button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default FormItem;
