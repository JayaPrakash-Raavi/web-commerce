import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('customer');
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const endpoint = role === 'customer' ? '/customers/login' : '/sellers/login';
      const res = await API.post(endpoint, {
        [role === 'customer' ? 'Customer_UserName' : 'Seller_UserName']: form.username,
        [role === 'customer' ? 'Customer_Password' : 'Seller_Password']: form.password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user || res.data.seller));
      localStorage.setItem('role', role);
      window.dispatchEvent(new Event('storage'));
      alert(`${role} login successful`);
      navigate('/', { replace: true });
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>

      <div className="login-box">
        <div className="role-toggle">
          <label className={role === 'customer' ? 'active' : ''}>
            <input
              type="radio"
              name="role"
              value="customer"
              checked={role === 'customer'}
              onChange={() => setRole('customer')}
            />
            Customer
          </label>
          <label className={role === 'seller' ? 'active' : ''}>
            <input
              type="radio"
              name="role"
              value="seller"
              checked={role === 'seller'}
              onChange={() => setRole('seller')}
            />
            Seller
          </label>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Username or Email or Phone number</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>

      <div className="bottom-register">
        <hr />
        <p>New to Web-Commerce?</p>
        <button className="register-btn" onClick={() => navigate('/register')}>
          Create your Web-Commerce account
        </button>
      </div>
    </div>
  );
};

export default Login;
