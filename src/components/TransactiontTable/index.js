import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { TRANSACTION_TABLE_HEADER } from "../../constants";
import { GET_TRANSACTIONS } from "../../utils/queries";
import { convertTimeString } from "../../utils";
import TransactionTableRow from "../Tables/TransactionTableRow";

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue
} from '@chakra-ui/react';

export default function TransactionTable({ setTransactionsCount }) {
    // Component state
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [transactions, setTransactions] = useState([]);

    // GraphQL queries
    const { loading, error, data } = useQuery(GET_TRANSACTIONS, { variables: { num: limit, offset: (currentPage - 1) * limit } });

    // Other hooks
    // const navigateTo = useNavigate();

    const textColor = useColorModeValue("gray.700", "white");

    // When this component mounts, grab a reference to all transactions, set the transaction count, and set the totalPageCount to allow for pagination
    useEffect(() => {
        if (data) {
            setTransactions(data?.transactions);
            const transactionsCount = data?.transactions_aggregate?.aggregate?.count;
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
            <Alert
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='400px'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Unexpected Error
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    We sincerely apologize for any inconvenience this may cause
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <>
        {!loading ?
        <Table variant="simple" color={textColor}>
           
            <Thead>
              
              <Tr my=".8rem" ps="0px">
                <Th color="gray.400">Tx Hash</Th>
                <Th color="gray.400">To</Th>
                <Th color="gray.400">From</Th>
                <Th color="gray.400" isNumeric>Block</Th>
                <Th color="gray.400" isNumeric>$QUAI Sent</Th>
                
              </Tr>

            </Thead>
            
            
            <Tbody>
              {transactions?.map((transaction) => {
                return (
                  <TransactionTableRow
                    transactionHash={transaction.hash}
                    toThisMiner={transaction.to}
                    fromThisMiner={transaction.from}
                    blockNumber={transaction.block_number}
                    quaiSent={transaction.value}
                    timestamp={transaction.timestamp}
                  />
                );
              })}
            </Tbody>
          </Table>
          : <Spinner size={"sm"} label='Loading the transactions table' /> }
        </>
    )
}

