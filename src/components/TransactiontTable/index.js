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
    const navigateTo = useNavigate();

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
        <div>
            {!loading ?
                <div className="flex flex-col">

                    {/* Heading */}
                    <div className="border border-b-0 rounded-t-lg text-2xl font-bold border-t px-6 py-4 bg-white text-black">
                        <h1>Transactions</h1>
                    </div>

                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-transaction min-w-full sm:px-6 lg:px-8">
                            
                                <Table className="border">
                                     {/* Table Header */}
                                    <Thead className="bg-transparent border-b">
                                        <Tr>
                                            {TRANSACTION_TABLE_HEADER?.map(header =>
                                                <Th key={header} scope="col" className="text-sm font-semibold px-6 py-4 text-left">
                                                    {header}
                                                </Th>
                                            )}
                                        </Tr>
                                    </Thead>
                                    
                                     {/* Table Body */}
                                    <Tbody>
                                        {transactions?.map((transaction, index) => (
                                            <Tr key={index} className="bg-transparent cursor-pointer border-b transition duration-300 ease-in-out hover:bg-gray-300" onClick={() => navigateTo(`/tx/${transaction.hash}`)}>
                                                <Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{reduceString(transaction.hash)}</Td>
                                                <Td className="text-sm font-medium px-6 py-4 whitespace-nowrap">
                                                    {transaction.block_number}
                                                </Td>
                                                <Td className="text-sm font-medium px-6 py-4 whitespace-nowrap">
                                                    {transaction.value}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                        
                        </div>
                    </div>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} setLimit={setLimit} totalPage={totalPage} />
                </div> : <Spinner size={"xl"} label='Loading the transactions table' />}
        </div>
    )
}
