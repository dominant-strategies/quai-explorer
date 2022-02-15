import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { GET_TRANSACTIONS } from "../../utils/queries";
import TransactionTableRow from "../Tables/TransactionTableRow";

import {
  Alert,
  AlertIcon,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  useColorModeValue
} from '@chakra-ui/react';

export default function TransactionTable({ setTransactionsCount }) {
  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [transactions, setTransactions] = useState([]);

  // GraphQL queries
  const { loading, error, data, refetch: refetchTransactionData } = useQuery(GET_TRANSACTIONS, { variables: {  fetchPolicy: "cache-and-network", num: limit, offset: (currentPage - 1) * limit } });

  // Other hooks
  // const navigateTo = useNavigate();

  const textColor = useColorModeValue("gray.700", "white");
  const spinnerLabel = "Loading the transactions table";


  // When this component mounts, grab a reference to all transactions, set the transaction count, and set the totalPageCount to allow for pagination
  useEffect(() => {
    if (data) {
      setTransactions(data?.transactions);
      let transactionsCount = data?.transactions_aggregate?.aggregate?.count;
      setTransactionsCount(transactionsCount);
      setTotalPage(parseInt(transactionsCount / limit) + 1);
    }
  }, [data])

  /**
   * Error handling in the event the GQL query fails
   * Shows an alert
   */
  if (error) {
    console.log(error)
    return (
      <>
        <Alert status='error' mt={5} >
          <AlertIcon />
          <Text fontSize='sm'>There was a problem loading this table. We sincerely apologize for any inconvenience this may cause.</Text>
        </Alert>
      </>
    )
  }

  return (
    <>
      {!loading ?
        <>
          <Table variant="simple" color={textColor}>

            { window.innerWidth > 768 ?
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th color="gray.400">TX Hash</Th>
                <Th color="gray.400" isNumeric>Block</Th>
                <Th color="gray.400" isNumeric> Value</Th>
                <Th color="gray.400"></Th>
              </Tr>
            </Thead>
            :
            <Thead>
            <Tr my=".8rem" ps="0px">
              <Th color="gray.400"></Th>
              <Th color="gray.400">TX Hash</Th>
              <Th color="gray.400" isNumeric>Block</Th>
              <Th color="gray.400" isNumeric> Value</Th>
            </Tr>
          </Thead>

            }

            


            <Tbody>
              {transactions?.map((transaction, index) => {
                return (
                  <TransactionTableRow
                    transactionHash={transaction.hash}
                    toThisMiner={transaction.to}
                    fromThisMiner={transaction.from}
                    blockNumber={transaction.block_number}
                    quaiSent={transaction.value}
                    timestamp={transaction.timestamp}
                    key={index}
                  />
                );
              })}
            </Tbody>

          </Table>
          {totalPage > 1 ?
          <Pagination
           refetchData={refetchTransactionData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit} setLimit={setLimit}
            totalPage={totalPage}
            dimensions={{
              sm: "59%",
              md: "59%",
              lg: "90%",
              xl: "90%"
            }} /> : null}
        </>
        : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
    </>
  )
}

