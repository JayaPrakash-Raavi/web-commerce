import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerHome from './pages/CustomerHome';
import SellerHome from './pages/SellerHome';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import MyAccount from './pages/MyAccount';
import MyOrders from './pages/MyOrders';
import MyProducts from './pages/MyProducts';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || 'customer');

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role') || 'customer');
    };

    window.addEventListener('storage', handleStorageChange); 
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={role === 'seller' ? <SellerHome /> : <CustomerHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/orders" element={<MyOrders />} />
        {/* Add MyProducts, Deliveries later */}
        <Route path="/my-products" element={<MyProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
