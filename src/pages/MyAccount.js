import React, { useEffect, useState } from 'react';
import API from '../services/api';
import './MyAccount.css';

const MyAccount = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role');
  const id = role === 'customer' ? user?.Customer_id : user?.Seller_id;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await API.get(`/${role === 'customer' ? 'customers' : 'sellers'}/${id}`);

        if (role === 'customer') {
          setFormData({
            firstName: res.data.Customer_First_Name,
            lastName: res.data.Customer_Last_Name,
            email: res.data.Customer_Email,
            phone: res.data.Customer_Phone,
          });
        } else if (role === 'seller') {
          setFormData({
            firstName: res.data.First_Name,
            lastName: res.data.Last_Name,
            email: res.data.Email,
            phone: res.data.Mobile,
          });
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        alert('Failed to load account details');
      }
    };

    if (id) fetchDetails();
  }, [id, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (role === 'customer') {
        await API.put(`/customers/${id}`, {
          Customer_First_Name: formData.firstName,
          Customer_Last_Name: formData.lastName,
          Customer_Email: formData.email,
          Customer_Phone: formData.phone,
        });
      } else if (role === 'seller') {
        await API.put(`/sellers/${id}`, {
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email: formData.email,
          Mobile: formData.phone,
        });
      }

      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="account-container">
      <h2>My Account</h2>

      <div className="form-group">
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      <button className="save-btn" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default MyAccount;
