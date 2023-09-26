import { useState } from 'react';
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if(username) {
      onLogin(username);
      setUsername('');
    }
  }

  return (
      <div className="login-page">
      <img
        className="logo-pic"
        src="https://unsplash.com/photos/PEJtZfT6C1Q/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjgyMzI4NDc1&force=true"
        alt="main chat logo picture on login page"
        />
        <form className="login-form" action="#/login" onSubmit={onSubmit}>
          <label>
            <span className= "span-username">Username:</span></label>
            <input className="login-username" value={username} onChange={onChange} placeholder="Enter username" required/>
          <button className="login-button" type="submit" disabled={!username || !username.trim()}>Login</button>
        </form>
      </div>
  );

}

export default LoginForm;