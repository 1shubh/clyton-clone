// AdminDashboard.js
import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProperties,
  addProperty,
  updateProperty,
  deleteProperty,
} from "../../Redux/PropertySlice";
import { IconButton } from "@chakra-ui/react";
import ProductForm from "../../components/ProductForm";
import ProductList from "../../components/ProductList";
import { AdminSidebar } from "../../components/AdminSidebar";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../../hoc/AuthContext";
import { BeatLoader } from "react-spinners";
import { FaRegBell } from "react-icons/fa";
import { db } from "../../firebase-config/config"; // Import Firestore instance
import { doc, deleteDoc } from "firebase/firestore"; // Firestore methods

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector(
    (state) => state.properties
  );
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentView, setCurrentView] = useState("properties");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { logoutAdmin } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleAddProduct = (product) => {
    dispatch(addProperty({ id: Date.now(), ...product }));
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch(updateProperty(updatedProduct));
  };

  const handleDeleteProduct = async (id) => {
    setIsLoading(true); // Set loading state to true
    try {
      await deleteDoc(doc(db, "properties", id)); // Delete from Firestore
      dispatch(deleteProperty(id)); // Delete from Redux store
      await dispatch(fetchProperties()); // Fetch properties again
    } catch (error) {
      console.error("Error deleting product: ", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    logoutAdmin();
  };

  return (
    <>
      <div className="bg-[#e9e2e4] w-full py-5 px-20 lg:px-5 sm:px-5 flex justify-between items-center">
        <div className="w-[10%] lg:w-[20%] sm:w-[35%] cursor-pointer">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="flex gap-5 items-center">
          <p>Welcome Admin</p>
          <div className="cursor-pointer flex items-center justify-center">
            <IconButton
              icon={<FaRegBell fontSize={"20px"} />}
              isRound={true}
              variant="solid"
            />
          </div>
          <Button colorScheme="orange" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="flex">
        <AdminSidebar currentView={currentView} onNavigate={handleNavigate} />
        {isLoading ? ( // Show loading state here
          <div className="flex items-center justify-center w-[80%]">
            <BeatLoader color="red" />
          </div>
        ) : (
          <div className="flex-1 p-6">
            {currentView === "properties" && (
              <>
                {loading && <p>Loading properties...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (
                  <ProductList
                    properties={properties}
                    deleteProduct={handleDeleteProduct}
                    editProduct={handleEditProduct}
                  />
                )}
              </>
            )}
            {currentView === "addProduct" && (
              <ProductForm
                addProduct={handleAddProduct}
                updateProduct={handleUpdateProduct}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
