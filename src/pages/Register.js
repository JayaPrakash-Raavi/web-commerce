import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Register.css';

const Register = () => {
  const [role, setRole] = useState('customer');
  const [form, setForm] = useState({
    First_Name: '', Last_Name: '', UserName: '', Password: '',
    Mobile: '', Email: '', City: '', State: '', Zip_Code: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const payload =
        role === 'customer'
          ? {
              Customer_First_Name: form.First_Name,
              Customer_Last_Name: form.Last_Name,
              Customer_UserName: form.UserName,
              Customer_Password: form.Password,
              Customer_Phone: form.Mobile,
              Customer_Email: form.Email,
              Customer_City: form.City,
              Customer_State: form.State,
              Customer_Zip_Code: form.Zip_Code
            }
          : {
              First_Name: form.First_Name,
              Last_Name: form.Last_Name,
              Seller_UserName: form.UserName,
              Seller_Password: form.Password,
              Mobile: form.Mobile,
              Email: form.Email,
              City: form.City,
              State: form.State,
              Zip_Code: form.Zip_Code
            };

      const endpoint = role === 'customer' ? '/customers/register' : '/sellers/register';
      await API.post(endpoint, payload);

      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create your Web-Commerce account</h1>

      <div className="register-box">
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

        <form className="register-form" onSubmit={handleRegister}>
          {['First_Name', 'Last_Name', 'UserName', 'Password', 'Mobile', 'Email', 'City', 'State', 'Zip_Code'].map(field => (
            <input
              key={field}
              name={field}
              type={field === 'Password' ? 'password' : 'text'}
              placeholder={field.replace('_', ' ')}
              onChange={handleChange}
              required
            />
          ))}
          <button type="submit" className="register-btn">Register as {role}</button>
        </form>

        <div className="login-redirect">
          Already a user? <span onClick={() => navigate('/login')}>Login here</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
