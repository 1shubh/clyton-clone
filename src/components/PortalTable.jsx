import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";

export const PortalTable = ({ data, username }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  function formatFirestoreTimestamp(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== "number") {
      return "N/A";
    }
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
    return date.toLocaleString();
  }

  return (
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
          {data?.map((ele, i) => (
            <Tr key={i}>
              <Td>{ele.orderId}</Td>
              <Td>{ele.propertyDetails.name}</Td>
              <Td>{ele.propertyDetails.modelNum}</Td>
              <Td>{ele.retailer || "Scenic Homes"}</Td>
              <Td>{username}</Td>
              <Td>
                ${parseFloat(ele.totalUpgrades) + parseFloat(ele.propertyDetails.price)}
              </Td>
              <Td>{formatFirestoreTimestamp(ele.timestamp)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
