import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import './CustomerHome.css'; // 🔗 We will create this CSS

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const user = useMemo(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored && stored !== 'undefined' ? JSON.parse(stored) : null;
    } catch (err) {
      console.error('Invalid user JSON in localStorage:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error('Error loading products:', err);
        alert('Failed to load products');
      });
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user?.Customer_id || role !== 'customer') {
      alert('Please log in as a customer to add to cart');
      navigate('/login');
      return;
    }

    try {
      await API.post('/cart', {
        customerId: user.Customer_id,
        productId,
        quantity: 1,
      });
      alert('Product added to cart');
    } catch (err) {
      console.error('Add to Cart Error:', err.response?.data || err.message);
      alert('Error adding to cart');
    }
  };

  return (
    <div className="home-container">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <h2>Welcome, {user?.Customer_First_Name || 'Guest'}!</h2>
        <p>Discover our latest products and amazing deals 🔥</p>
      </section>

      {/* Browse Products */}
      <section className="products-section">
        <h3>Browse Products</h3>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.Product_id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
