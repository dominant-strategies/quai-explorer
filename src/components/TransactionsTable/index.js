import { useQuery } from '@apollo/client';
import {
  Alert,
  AlertIcon, Flex,
  Link, Spinner, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GET_TRANSACTIONS } from "../../utils/queries";
import Pagination from "../Pagination";
import TransactionTableRow from "../TableRows/TransactionTableRow";



export default function TransactionsTable() {
  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [txCountLocal, setTxCountLocal] = useState(0);

  function toQuai(gweiValue) {
    return gweiValue / Math.pow(10, 18)
  }

  function toGwei(quaiValue) {
    return quaiValue * Math.pow(10, 18)
  }


  // GraphQL queries
  const { loading, error, data, refetch: refetchTransactionData } = useQuery(GET_TRANSACTIONS, { variables: { fetchPolicy: "cache-and-network", num: limit, offset: (currentPage - 1) * limit } });

  // Other hooks
  // const navigateTo = useNavigate();

  const textColor = useColorModeValue("gray.700", "white");
  const spinnerLabel = "Loading the transactions table";


  // When this component mounts, grab a reference to all transactions, set the transaction count, and set the totalPageCount to allow for pagination
  useEffect(() => {
    refetchTransactionData();

    if (data) {
      setTransactions(data?.transactions);
      let transactionsCount = data?.transactions_aggregate?.aggregate?.count;
      setTxCountLocal(transactionsCount);
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
          <Text fontSize='md'> Sorry! There seems to be a problem with loading this table. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>
        </Alert>
      </>
    )
  }

  return (
    <>
      {!loading ?
        <>
          <Flex flexDir="column">
            <Text size="md" fontWeight="bold" ml={5} pb={5} color="gray.400"> {txCountLocal} total transactions </Text>
            <Table variant="simple" color={textColor} mb={6}>


              <Thead>
                <Tr my=".8rem" ps="0px">
                  <Th color="gray.400">TX Hash</Th>
                  <Th color="gray.400">Block Number</Th>
                  <Th color="gray.400">Age</Th>
                  <Th color="gray.400">From</Th>
                  <Th color="gray.400">To</Th>
                  <Th color="gray.400"> Value (QUAI) </Th>
                  <Th color="gray.400"> Value (GWEI) </Th>
                </Tr>
              </Thead>






              <Tbody>
                {transactions?.map((transaction, index) => {
                  let value = toQuai(transaction.tx_value)
                  return (
                    <TransactionTableRow
                      transactionHash={transaction.hash}
                      toThisMiner={transaction.to_addr}
                      fromThisMiner={transaction.from_addr}
                      blockNumber={transaction.block_number}
                      blockHash={transaction.full_transaction.blockHash}
                      toLocation={transaction.to_location}
                      fromLocation={transaction.from_location}
                      value={value}
                      gweiValue={transaction.tx_value}
                      timestamp={transaction.tx_time}
                      key={index}
                    />
                  );
                })}
              </Tbody>

            </Table>
            {totalPage > 1 ?
              <Pagination
                currentPage={currentPage}
                totalCount={txCountLocal !== 0 ? txCountLocal : 0}
                pageSize={limit}
                onPageChange={page => setCurrentPage(page)}
                textColor={textColor}
              /> : null}
          </Flex>
        </>
        : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
    </>
  )
}

