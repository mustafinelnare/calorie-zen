import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../auth.js';
import './styles/Login.css';

const Login = ({handleLogin}) => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.username || !formValue.password){
      return;
    }
    auth.authorize(formValue.username, formValue.password)
      .then((data) => {
        if (data.jwt){
          setFormValue({username: '', password: ''});
          handleLogin();
          navigate('/diary', {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <p className="login__welcome">
        Добро пожаловать!
      </p>
      <form onSubmit={handleSubmit} className="login__form">
        <label htmlFor="username">
          Логин:
        </label>
        <input required id="username" name="username" type="text" value={formValue.username} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
        </label>
        <input required id="password" name="password" type="password" value={formValue.password} onChange={handleChange} />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>
      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div>
    </div>
  )
}

export default Login;