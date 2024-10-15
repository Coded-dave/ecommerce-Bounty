import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../properties/productSlice';

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-list">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.inStock ? `In Stock (${product.quantity} available)` : 'Out of Stock'}</p>
            {product.inStock && (
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
