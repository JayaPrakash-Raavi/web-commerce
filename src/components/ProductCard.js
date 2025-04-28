import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h4>{product.Product_name}</h4>
      <p><strong>Category:</strong> {product.Product_Category}</p>
      <p><strong>Price:</strong> ${Number(product.Product_Price).toFixed(2)}</p>
      <p className="desc">{product.Product_Description}</p>
      <button onClick={() => onAddToCart(product.Product_id)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
