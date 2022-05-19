import { useQuery } from '@apollo/client'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    Heading,
    IconButton,
    Link,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import { GET_TRANSACTIONS } from '../../utils/queries'
import { columns } from './constants'
import ChakraTable from '../../components/ChakraTable'

export default function TransactionTablePage() {
    const navigateTo = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const limit = 10
    const [totalPage, setTotalPage] = useState(1)
    const [transactions, setTransactions] = useState([])
    const [txCountLocal, setTxCountLocal] = useState(0)
    const tableColor = useColorModeValue('gray.700', 'white')
    const {
        loading,
        error,
        data,
        refetch: refetchTransactionData,
    } = useQuery(GET_TRANSACTIONS, {
        variables: {
            fetchPolicy: 'cache-and-network',
            num: limit,
            offset: (currentPage - 1) * limit,
        },
    })

    // When this component mounts, grab a reference to all transactions, set the transaction count, and set the totalPageCount to allow for pagination
    useEffect(() => {
        refetchTransactionData()

        if (data) {
            setTransactions(data?.transactions)
            const transactionsCount =
                data?.transactions_aggregate?.aggregate?.count
            setTxCountLocal(transactionsCount)
            setTotalPage(parseInt(transactionsCount / limit, 10) + 1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    /**
     * Error handling in the event the GQL query fails
     * Shows an alert
     */
    if (error) {
        console.log(error)
        return (
            <Alert status="error" mt={20}>
                <IconButton
                    onClick={() => navigateTo(-1)}
                    icon={<ArrowBackIcon />}
                    aria-label="Back to the previous page"
                    w="24px"
                    mr={2}
                />
                <AlertIcon />
                <Text fontSize="md">
                    {' '}
                    Sorry! There seems to be a problem with loading this table.
                    Please try to{' '}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        bgColor="transparent"
                        size="sm"
                        textColor="blue.300"
                        fontWeight="bold"
                        onClick={() => window.location.reload()}
                    >
                        {' '}
                        refresh the page.{' '}
                    </Link>
                </Text>
            </Alert>
        )
    }

    return (
        <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
            <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
                <CardHeader p="6px 0px 22px 0px">
                    <Flex direction="column" pb=".8rem" pl="1rem">
                        <IconButton
                            onClick={() => navigateTo(-1)}
                            icon={<ArrowBackIcon />}
                            aria-label="Back to the previous page"
                            w="24px"
                        />
                        <Box p={3}> </Box>
                        <Heading as="h1" fontWeight="bold">
                            {' '}
                            Transactions{' '}
                        </Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <ChakraTable
                        headerText={`${txCountLocal} total transactions`}
                        tableColor={tableColor}
                        columns={columns}
                        data={transactions}
                        rowProps={{ textColor: tableColor }}
                        currentPage={currentPage}
                        totalCount={txCountLocal !== 0 ? txCountLocal : 0}
                        pageSize={limit}
                        onPageChange={(page) => setCurrentPage(page)}
                        totalPage={totalPage}
                        wireframe={loading}
                        wireframeRows={10}
                    />
                </CardBody>
            </Card>
        </Flex>
    )
}
