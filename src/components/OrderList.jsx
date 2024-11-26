import React, { useEffect, useState } from "react";
import { PortalTable } from "./PortalTable";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config/config";
import { getAuth } from "firebase/auth";
import { Skeleton, Spinner } from "@chakra-ui/react"; // Optional loading spinner component
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching orders
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      if (user) {
        try {
          const ordersRef = doc(db, "orders", "allOrders"); // Reference to orders collection
          const ordersDoc = await getDoc(ordersRef);
          if (ordersDoc.exists()) {
            const allOrders = ordersDoc.data().orders || [];

            setOrders(allOrders); // Update state with user's orders
          } else {
            console.log("No orders found.");
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
  function formatFirestoreTimestamp(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== "number") {
      return "N/A";
    }
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6
    );
    return date.toLocaleString();
  }
  return (
    <div>
      <p className="font-bold text-xl">Orders</p>
      <p className="text-sm font-bold text-black mt-4 mb-4">
        Total Orders: {orders.length}
      </p>
      {loading ? (
        <Skeleton w={"full"} />
      ) : (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr className="bg-[#e9ecef]">
                <Th>Order #</Th>
                <Th>Property Name</Th>
                <Th>Model</Th>
                <Th>Retailer</Th>
                <Th>User</Th>
                <Th>Total</Th>
                <Th>Date and time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.map((ele, i) => (
                <Tr key={i}>
                  <Td>{ele.orderId}</Td>
                  <Td>{ele.propertyDetails.name}</Td>
                  <Td>{ele.propertyDetails.modelNum}</Td>
                  <Td>{ele.retailer || "Scenic Homes"}</Td>
                  <Td>{ele.userDetails.name}</Td>
                  <Td>
                    $
                    {parseFloat(ele.totalUpgrades) +
                      parseFloat(ele.propertyDetails.price)}
                  </Td>
                  <Td>{formatFirestoreTimestamp(ele.timestamp)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
