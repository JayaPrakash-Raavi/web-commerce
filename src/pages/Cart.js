import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./CartPage.css"; // 🔗 We will create this CSS

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const customerId = user?.Customer_id;

  const fetchCart = async () => {
    try {
      const res = await API.get(`/cart/${customerId}`);
      setCartItems(res.data);
      setLoading(false);
    } catch (err) {
      alert("Could not load cart");
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, delta) => {
    try {
      const res = await API.put(`/cart`, { customerId, productId, delta });
      if (res.status === 200) {
        fetchCart();
      }
    } catch (err) {
      console.error("Quantity update failed:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, productId }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      await response.json();
      fetchCart();
    } catch (err) {
      console.error("Failed to remove:", err);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await API.post('/order/place', { customerId });
      if (response.status === 201) {
        alert('Order placed successfully!');
        fetchCart(); // Refresh after order
      }
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order.');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.Product_Price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty 😔</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={`${item.productId}-${item.Product_name}`}>
                <div className="cart-item-info">
                  <h4>{item.Product_name}</h4>
                  <p>${Number(item.Product_Price).toFixed(2)}</p>
                </div>

                <div className="cart-item-actions">
                  <button onClick={() => updateQuantity(item.productId, -1)} disabled={item.quantity <= 1}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                  <button className="remove-btn" onClick={() => handleRemove(item.productId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
