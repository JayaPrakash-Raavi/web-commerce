import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOrders.css'; // Updated CSS will handle design

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const customerId = user?.Customer_id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/customers/orders/${customerId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (customerId) fetchOrders();
  }, [customerId]);

  const groupByOrderId = () => {
    const grouped = {};
    orders.forEach(order => {
      if (!grouped[order.Order_id]) {
        grouped[order.Order_id] = {
          order_date: order.order_date,
          delivery_status: order.Delivery_code,
          items: [],
        };
      }
      grouped[order.Order_id].items.push({
        name: order.Product_name,
        price: order.Product_Price,
        quantity: order.quantity,
      });
    });
    return grouped;
  };

  const groupedOrders = groupByOrderId();

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {Object.entries(groupedOrders).length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        Object.entries(groupedOrders).map(([orderId, order]) => {
          const totalPrice = order.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );

          return (
            <div key={orderId} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{orderId}</h3>
                  <p className="order-date">Placed on: {new Date(order.order_date).toLocaleDateString()}</p>
                </div>
                <div className={`badge ${order.delivery_status.toLowerCase()}`}>
                  {order.delivery_status}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">× {item.quantity}</span>
                    <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <strong>Total: ₹{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;
