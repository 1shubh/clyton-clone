import React from 'react';
import { ProductItem } from './ProductItem';

const ProductList = ({ properties, deleteProduct, editProduct }) => {
  return (
    <div>
      {properties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        properties.map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
            deleteProduct={deleteProduct} 
            editProduct={editProduct}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
