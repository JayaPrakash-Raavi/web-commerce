// src/pages/AddProduct.js
import React, { useState } from 'react';
import './AddProduct.css';
import API from '../services/api';

const AddProduct = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const seller = JSON.parse(localStorage.getItem('user'));
      await API.post('/sellers/add-product', {
        Product_name: formData.name,
        Product_Description: formData.description,
        Product_Price: parseFloat(formData.price),
        Product_Category: formData.category,
        Seller_id: seller?.Seller_id
      });
      alert('Product added successfully!');
      onClose(); // close dialog after success
    } catch (error) {
      console.error('Add product error:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit} className="add-product-form">
          <input name="name" placeholder="Product Name" onChange={handleChange} required />
          <textarea name="description" placeholder="Product Description" onChange={handleChange} required />
          <input name="price" type="number" step="0.01" placeholder="Price" onChange={handleChange} required />
          <input name="category" placeholder="Category" onChange={handleChange} required />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
