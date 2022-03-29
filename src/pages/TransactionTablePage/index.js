import { useQuery } from '@apollo/client';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, Box, Flex, Heading, IconButton, Link, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import TransactionsTable from "../../components/TransactionsTable";
import { GET_TRANSACTIONS } from "../../utils/queries";

export default function TransactionTablePage() {
    const navigateTo = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [txCountLocal, setTxCountLocal] = useState(0);
    const { loading, error, data, refetch: refetchTransactionData } = useQuery(GET_TRANSACTIONS, { variables: { fetchPolicy: "cache-and-network", num: limit, offset: (currentPage - 1) * limit } });
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
                <Alert status='error' mt={20}>

                    <IconButton
                        onClick={() => navigateTo(-1)}
                        icon={<ArrowBackIcon />}
                        aria-label="Back to the previous page"
                        w="24px"
                        mr={2}
                    />
                    <AlertIcon />
                    <Text fontSize='md'> Sorry! There seems to be a problem with loading this table. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>
                </Alert>
            </>
        )
    }


    return (
        <>
            {!loading ?
                <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                    <Card
                        overflowX={{ sm: "scroll", xl: "hidden" }}
                    >
                        <CardHeader p="6px 0px 22px 0px">
                            <Flex direction="column" pb=".8rem" pl="1rem">
                                <IconButton
                                    onClick={() => navigateTo(-1)}
                                    icon={<ArrowBackIcon />}
                                    aria-label="Back to the previous page"
                                    w="24px"
                                />
                                <Box p={3}> </Box>
                                <Heading as='h1' fontWeight={"bold"} > Transactions </Heading>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <TransactionsTable
                                transactions={transactions}
                                txCountLocal={txCountLocal}
                                totalPage={totalPage}
                                currentPage={currentPage}
                                limit={limit}
                                setCurrentPage={setCurrentPage}
                                setLimit={setLimit} />
                        </CardBody>
                    </Card>
                </Flex>
                : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
        </>
    )
}
