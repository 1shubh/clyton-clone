import React from 'react'
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

export const RetailersTable = ({data}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr className="bg-[#e9ecef]">
            <Th>Retailers #</Th>
            <Th>Name</Th>
            <Th>Location</Th>
            <Th>Plant Lines</Th>
            <Th>Type</Th>
            <Th>Users</Th>
            <Th>Orders</Th>
            <Th>Quotes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((ele, i) => (
            <Tr>
              <Td>{ele.retailer}</Td>
              <Td>{ele.name}</Td>
              <Td>{ele.location}</Td>
              <Td>{ele.plantLines}</Td>
              <Td>{ele.type}</Td>
              <Td>{ele.users}</Td>
              <Td>{ele.orders}</Td>
              <Td>{ele.quotes}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
