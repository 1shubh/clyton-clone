// ProductList.js
import React from "react";
import { ProductItem } from "./ProductItem";
import { db } from "../firebase-config/config";
import { doc, deleteDoc } from "firebase/firestore"; // Firestore methods
import { useDispatch } from "react-redux";

const ProductList = ({ properties, deleteProduct, editProduct }) => {
  return (
    <div>
      {properties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        properties.map((product) => (
          <ProductItem
            key={product.id}
            product={product.propertyDetails}
            deleteProduct={() => deleteProduct(product.id)} // Call deleteProduct passed from AdminDashboard
            editProduct={editProduct}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
