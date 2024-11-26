import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { HeadingBox } from '../../components/HeadingBox';
import { PortalTable } from '../../components/PortalTable'; // Assuming this component can accept orders as props
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config/config";
import { getAuth } from "firebase/auth";




export const Orders = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [username,setUsername] = useState("")
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0); // State for total orders
  const [loading, setLoading] = useState(true); // Loading state for fetching orders

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid); // Get user document reference
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            const userOrders = userData.orders || []; // Get orders from user data
            setOrders(userOrders);
            setUsername(userData.firstName)
            setTotalOrders(userOrders.length); // Set total orders count
          } else {
            console.log("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user orders: ", error);
        } finally {
          setLoading(false); // Set loading to false once done
        }
      }
    };

    fetchUserOrders();
  }, [user]);

  return (
    <div className='flex gap-2 sm:grid sm:pb-5'>
      <Sidebar pageName={"Orders"}/>
      <div className='w-[84%] lg:w-[80%] sm:w-full sm:px-2'>
        <HeadingBox pageName={"Orders"}/>
        {loading ? (
          <p>Loading orders...</p> // Display loading message while fetching
        ) : (
          <>
            <p className='text-sm font-bold text-black mt-4'>Total Orders: {totalOrders}</p>
            {orders.length > 0 ? (
              <PortalTable data={orders} username={username} /> // Pass orders to PortalTable
            ) : (
              <p>No orders found for this user.</p> // Message when no orders exist
            )}
          </>
        )}
      </div>
    </div>
  );
}
