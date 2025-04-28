import React, { useEffect, useState } from 'react';
import API from '../services/api';
import './MyProducts.css';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await API.get(`/sellers/my-products?sellerId=${user?.Seller_id}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to load your products');
      }
    };

    if (user?.Seller_id) {
      fetchMyProducts();
    }
  }, [user?.Seller_id]);

  return (
    <div className="my-products-container">
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products found. Start adding some!</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product.Product_id}>
              <h3>{product.Product_name}</h3>
              <p><strong>Category:</strong> {product.Product_Category}</p>
              <p><strong>Price:</strong> ${product.Product_Price}</p>
              <p><strong>Description:</strong> {product.Product_Description}</p>
              <p><strong>Inventory:</strong> {product.Product_quantity} units</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
