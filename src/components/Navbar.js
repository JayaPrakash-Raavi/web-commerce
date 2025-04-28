import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({role}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // const role = localStorage.getItem('role'); // 'customer' or 'seller'
  const isLoggedIn = !!localStorage.getItem('token');

  let user = {};
  try {
    const stored = localStorage.getItem('user');
    user = stored && stored !== 'undefined' ? JSON.parse(stored) : {};
  } catch (err) {
    console.error('Invalid user JSON in localStorage:', err);
  }

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">Web-Commerce</Link>
        </div>

        <div className="navbar-center">
          <input
            type="text"
            placeholder="Search for products, categories and more"
            className="navbar-search"
          />
        </div>

        <div className="navbar-right" ref={dropdownRef}>
          {isLoggedIn ? (
            <>
              <span onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
                👤 {user?.Customer_First_Name || user?.First_Name || 'User'}
              </span>

              {showDropdown && (
                <div className="navbar-dropdown">
                  <div onClick={() => navigate('/account')}>My Account</div>
                  {/* Seller will have "My Products" and "Deliveries" instead of "My Orders" */}
                  {role === 'seller' ? (
                    <>
                      <div onClick={() => navigate('/my-products')}>My Products</div>
                      <div onClick={() => navigate('/deliveries')}>My Deliveries</div>
                    </>
                  ) : (
                    <div onClick={() => navigate('/orders')}>My Orders</div>
                  )}
                  <div onClick={handleLogout} style={{ color: 'red' }}>Logout</div>
                </div>
              )}

              {/* Cart & Wishlist only for Customer */}
              {role === 'customer' && (
                <>
                  <span className="wishlist-icon" onClick={() => navigate('/wishlist')}>🖤</span>
                  <span className="cart-icon" onClick={() => navigate('/cart')}>🛒</span>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Menu Items only for customers */}
      {role === 'customer' && (
        <div className="navbar-menu">
          {[
            'Today Deals',
            "Best Seller's",
            'Home & Decor',
            'Beauty',
            'New Releases',
            'MediCare',
            'Whole Foods',
            'Electronics',
          ].map((item, i) => (
            <span className="navbar-menu-item" key={i}>
              {item}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
