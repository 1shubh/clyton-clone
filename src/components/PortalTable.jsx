import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export const PortalTable = ({ data }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr className="bg-[#e9ecef]">
            <Th>Order #</Th>
            <Th>Name / Customer</Th>
            <Th>Model</Th>
            <Th>Retailer</Th>
            <Th>User</Th>
            <Th>Total</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((ele, i) => (
            <Tr>
              <Td>{ele.order}</Td>
              <Td>{ele.name}</Td>
              <Td>{ele.model}</Td>
              <Td>{ele.retailer}</Td>
              <Td>{ele.user}</Td>
              <Td>{ele.total}</Td>
              <Td>{ele.date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
