import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { TRANSACTION_TABLE_HEADER } from "../../constants";
import { GET_TRANSACTIONS } from "../../utils/queries";
import { reduceString } from "../../utils";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Spinner
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

    // empty table
    // new table will be written using chakra ui
    return (
        <div>

            
        </div>
    )
}

