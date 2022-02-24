import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import {
    GET_TRANSACTION_WITH_ADDRESS,
    GET_TRANSACTION_WITH_ADDRESS_2,
} from '../../utils/queries'
import { POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from '../../constants'
import {
    convertTimeString,
    numberWithCommas,
    reduceStringShowMediumLength,
} from '../../utils'
import {
    Spacer,
    Text,
    VStack,
    IconButton,
    Heading,
    useColorModeValue,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Spinner,
    Flex,
    Alert,
    AlertIcon,
    Box,
    Link,
    Icon,
    Divider
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton'
import axios from 'axios'

import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'

import { CHAIN_SLUGS_2, PORTS, PREFIX } from '../../constants'

import TransactionTableRow from '../../components/Tables/TransactionTableRow'

import Pagination from '../../components/Pagination'

const hexToDec = (value) => {
    return parseInt(value.substring(2), 16)
}

// chainPort returns the port number for a given chain
const chainPort = (chain) => {
    return PORTS[CHAIN_SLUGS_2.indexOf(chain)]
}

export default function Address() {
    const { hash } = useParams()
    const navigateTo = useNavigate()

    const [balance, setBalance] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalPage, setTotalPage] = useState(1)
    const [transactions, setTransactions] = useState([])
    const [transactionsCount, setTransactionsCount] = useState(0)

    const {
        loading,
        error,
        data,
        refetch: refetchTransactionData,
    } = useQuery(GET_TRANSACTION_WITH_ADDRESS_2, {
        variables: {
            fetchPolicy: 'cache-and-network',
            num: limit,
            offset: (currentPage - 1) * limit,
            hash: hash,
        },
    })

    const textColor = useColorModeValue('gray.700', 'white')
    const spinnerLabel = 'Loading the transactions table'

    const addressPrefix = hash.substring(0, 4)
    const numAddressPrefix = hexToDec(addressPrefix)

    const [errorWithHash, setShowErrorWithHash] = useState(false)

    const chain = (numAddressPrefix) => {
        var chainName = ''
        for (var key in PREFIX) {
            if (
                PREFIX[key].low <= numAddressPrefix &&
                numAddressPrefix <= PREFIX[key].high
            ) {
                chainName = key
            }
        }
        return chainName
    }

    useEffect(() => {
        //valid address
        if (hash.length === 42) {
            const load = async () => {
                var data

                const payload = {
                    jsonrpc: 2.0,
                    method: 'eth_getBalance',
                    params: [hash, 'latest'],
                    id: 1,
                }

                try {
                    data = await axios.post(
                        'http://45.76.19.78:' +
                        chainPort(chain(numAddressPrefix)),
                        JSON.stringify(payload),
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                } catch (err) {
                    console.log(err)
                    return (
                        <>
                            {window.innerWidth < 768 ? <Box p={4}></Box> : null}
                            <Box p={4}></Box>
                            <Alert status='error' mt={5} >
                                <AlertIcon />
                                <Text fontSize='md'> Sorry! There seems to be a problem with loading this page. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>
                            </Alert>
                        </>
                    )
                }

                if (balance != null) {
                    setBalance(parseInt(data.data.result), 10)
                }
            }
            load()
                .then(() => {
                    console.log('address data: ', data)
                    if (data) {
                        setTransactions(data?.transactions)
                        let transactionsCount =
                            data?.transactions_aggregate?.aggregate?.count
                        setTransactionsCount(transactionsCount)
                        setTotalPage(parseInt(transactionsCount / limit) + 1)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    return (
                        <>
                            {window.innerWidth < 768 ? <Box p={4}></Box> : null}
                            <Box p={4}></Box>
                            <Alert status='error' mt={5} >
                                <AlertIcon />
                                <Text fontSize='md'> Sorry! There seems to be a problem with loading this page. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>
                            </Alert>
                        </>
                    )
                })
        } else {
            setShowErrorWithHash(true)
        }
    })

    if (error || errorWithHash) {
        return (
            <>
                {window.innerWidth < 768 ? <Box p={4}></Box> : null}
                <Box p={10}></Box>
                <IconButton
                    onClick={() => navigateTo(-1)}
                    icon={<ArrowBackIcon />}
                    aria-label="Back to the previous page"
                    w="24px"
                />
                <Alert status='error' mt={5} >
                    <AlertIcon />
                    <Text fontSize='md'> Sorry! There seems to be a problem with loading this page. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>
                </Alert>
            </>
        )
    }

    if (loading) {

        return (
            <Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.300"
                color="brand.300"
                size="md"
                ml={4}
                mt={2}
                label={spinnerLabel}
            />

        )

    }

    else {
        return (
            <>
                <Card
                    mt={{ base: '120px', md: '75' }}
                    overflowX={{ sm: 'scroll', xl: 'hidden' }}
                >
                    <CardBody>
                        <Flex direction="column" pb=".8rem" pl="1rem">
                            <IconButton
                                onClick={() => navigateTo(-1)}
                                icon={<ArrowBackIcon />}
                                aria-label="Back to the previous page"
                                w="24px"
                            />

                            <Box p={3}> </Box>
                            <Heading as="h1">
                                Address{' '}
                            </Heading>{' '}
                            <Text fontSize="xl">  {hash} </Text>
                            <Box p={1}> </Box>
                            <Heading as="h2" fontSize="lg" >
                                {' '}
                                Balance{' '}
                            </Heading>{' '}
                            <Text fontSize="lg"> {balance}</Text>
                            <Box p={3}> </Box>
                            {transactions.length === 0 &&

                                <>
                                    <Divider />
                                    <Text fontSize='sm' mt={2} as="b"> There are no transactions for this address at this time.</Text>
                                </>

                            }
                        </Flex>
                    </CardBody>
                </Card>

                <Spacer />

                {transactions.length > 0 &&
                    <Card mt={5} overflowX={{ sm: 'scroll', xl: 'hidden' }}>
                        <CardHeader mb="20px" pl="22px" pt="10px">

                            <Flex direction="column" alignSelf="flex-start">
                                <Heading
                                    as="h1"
                                    fontSize="3xl"
                                    color={textColor}
                                    fontWeight="bold"
                                    mr={2}
                                >
                                    Transactions
                                </Heading>
                            </Flex>
                        </CardHeader>


                        <CardBody>
                            <Flex flexDirection="column">
                                <Table size="sm" variant="simple" color={textColor} ml={3}>
                                    <Thead>
                                        <Tr my=".8rem" ps="0px">
                                            <Th color="gray.400">TX Hash</Th>
                                            <Th color="gray.400">Block Number</Th>
                                            <Th color="gray.400">Age</Th>
                                            <Th color="gray.400">From</Th>
                                            <Th color="gray.400">To</Th>
                                            <Th color="gray.400"> Value</Th>
                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        {transactions?.map(
                                            (transaction, index) => {
                                                return (
                                                    <TransactionTableRow
                                                        transactionHash={transaction.hash}
                                                        toThisMiner={transaction.to_addr}
                                                        fromThisMiner={transaction.from_addr}
                                                        blockNumber={transaction.block_number}
                                                        blockHash={transaction.full_transaction.blockHash}
                                                        toLocation={transaction.to_location}
                                                        fromLocation={transaction.from_location}
                                                        value={transaction.tx_value}
                                                        timestamp={transaction.tx_time}
                                                        key={index}
                                                    />
                                                )
                                            }
                                        )}
                                    </Tbody>
                                </Table>

                                <Flex>
                                    {totalPage > 1 ? (
                                        <Pagination
                                            currentPage={currentPage}
                                            totalCount={
                                                transactionsCount != 0
                                                    ? transactionsCount
                                                    : 0
                                            }
                                            pageSize={limit}
                                            onPageChange={(page) =>
                                                setCurrentPage(page)
                                            }
                                            textColor={textColor}
                                        />
                                    ) : null}
                                </Flex>
                            </Flex>
                        </CardBody>

                    </Card>}

            </>
        )
    }
}
