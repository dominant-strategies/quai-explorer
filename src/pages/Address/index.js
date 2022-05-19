import { useQuery } from '@apollo/client'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Alert,
    AlertIcon,
    Box,
    Divider,
    Flex,
    Heading,
    IconButton,
    Link,
    Spacer,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import { CHAIN_SLUGS_2, PORTS, PREFIX } from '../../constants'
import { toQuai } from '../../utils'
import { GET_TRANSACTIONS_FOR_FROM_ADDRESS } from '../../utils/queries'
import { columns } from '../TransactionTablePage/constants'
import ChakraTable from '../../components/ChakraTable'

const hexToDec = (value) => parseInt(value.substring(2), 16)

// chainPort returns the port number for a given chain
const chainPort = (chain) => PORTS[CHAIN_SLUGS_2.indexOf(chain)]

export default function Address() {
    const { hash } = useParams()
    const navigateTo = useNavigate()

    const [balance, setBalance] = useState(0)
    const [quaiBalance, setQuaiBalance] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const limit = 10
    const [totalPage, setTotalPage] = useState(1)
    const [transactions, setTransactions] = useState([])
    const [transactionsCount, setTransactionsCount] = useState(0)
    const [errorWithHash, setShowErrorWithHash] = useState(false)

    const { loading, error, data } = useQuery(
        GET_TRANSACTIONS_FOR_FROM_ADDRESS,
        {
            variables: {
                fetchPolicy: 'cache-and-network',
                num: limit,
                offset: (currentPage - 1) * limit,
                hash,
            },
        },
    )

    const textColor = useColorModeValue('gray.700', 'white')

    const addressPrefix = hash.substring(0, 4)
    const numAddressPrefix = hexToDec(addressPrefix)

    const chain = (addr) => {
        let chainName = ''
        for (const key in PREFIX) {
            if (PREFIX[key].low <= addr && addr <= PREFIX[key].high) {
                chainName = key
            }
        }
        return chainName
    }

    const payload = {
        jsonrpc: 2.0,
        method: 'eth_getBalance',
        params: [hash, 'latest'],
        id: 1,
    }

    const jsonPayload = JSON.stringify(payload)

    const url = `http://45.76.19.78:${chainPort(chain(numAddressPrefix))}`

    useEffect(() => {
        // valid address
        if (hash.length === 42) {
            const load = async () => {
                let fetchData

                try {
                    fetchData = await axios.post(url, jsonPayload, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                } catch (err) {
                    return (
                        <>
                            {window.innerWidth < 768 ? <Box p={4} /> : null}
                            <Box p={4} />
                            <Alert status="error" mt={5}>
                                <AlertIcon />
                                <Text fontSize="md">
                                    {' '}
                                    Sorry! There seems to be a problem with
                                    loading this page. Please try to{' '}
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
                        </>
                    )
                }

                if (balance != null) {
                    const parsedBalance = parseInt(fetchData.data.result, 10)
                    setBalance(parsedBalance)
                    setQuaiBalance(toQuai(fetchData.data.result))
                }

                return fetchData
            }
            load()
                .then(() => {
                    if (data) {
                        console.log(data)
                        setTransactions(data?.transactions)
                        const count =
                            data?.transactions_aggregate?.aggregate?.count
                        setTransactionsCount(count)
                        setTotalPage(parseInt(count / limit, 10) + 1)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    return (
                        <>
                            {window.innerWidth < 768 ? <Box p={4} /> : null}
                            <Box p={4} />
                            <Alert status="error" mt={5}>
                                <AlertIcon />
                                <Text fontSize="md">
                                    {' '}
                                    Sorry! There seems to be a problem with
                                    loading this page. Please try to{' '}
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
                        </>
                    )
                })
        } else {
            setShowErrorWithHash(true)
        }
    }, [hash.length, balance, url, jsonPayload, data, limit])

    if (error || errorWithHash) {
        return (
            <>
                {window.innerWidth < 768 ? <Box p={4} /> : null}
                <Box p={10} />
                <IconButton
                    onClick={() => navigateTo(-1)}
                    icon={<ArrowBackIcon />}
                    aria-label="Back to the previous page"
                    w="24px"
                />
                <Alert status="error" mt={5}>
                    <AlertIcon />
                    <Text fontSize="md">
                        {' '}
                        Sorry! There was a problem loading the page. The hash
                        may be invalid.
                    </Text>
                </Alert>
            </>
        )
    }

    if (transactions.length === 0) {
        return (
            <Card
                mt={{ base: '120px', md: '75px' }}
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
                        <Heading as="h1">Address </Heading>{' '}
                        <Text fontSize="xl"> {hash} </Text>
                        <Box p={1}> </Box>
                        <Heading as="h2" fontSize="lg">
                            {' '}
                            Balance{' '}
                        </Heading>{' '}
                        <Text fontSize="lg"> {quaiBalance} QUAI </Text>
                        <Box p={3}> </Box>
                        <Divider />
                        <Text fontSize="sm" mt={2} as="b">
                            {' '}
                            There are no transactions for this address at this
                            time.
                        </Text>
                    </Flex>
                </CardBody>
            </Card>
        )
    }

    return (
        <>
            <Card
                mt={{ base: '120px', md: '75px' }}
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
                        <Heading as="h1">Address </Heading>{' '}
                        <Text fontSize="xl"> {hash} </Text>
                        <Box p={1}> </Box>
                        <Heading as="h2" fontSize="lg">
                            {' '}
                            Balance{' '}
                        </Heading>{' '}
                        <Text fontSize="lg">
                            {' '}
                            {quaiBalance.toPrecision(4)} QUAI
                        </Text>
                        <Box p={3}> </Box>
                    </Flex>
                </CardBody>
            </Card>

            <Spacer />

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
                        <ChakraTable
                            headerText={`${transactionsCount} total transactions`}
                            tableColor={textColor}
                            columns={columns}
                            data={transactions}
                            rowProps={{ textColor }}
                            currentPage={currentPage}
                            totalCount={
                                transactionsCount !== 0 ? transactionsCount : 0
                            }
                            pageSize={limit}
                            onPageChange={(page) => setCurrentPage(page)}
                            totalPage={totalPage}
                            wireframe={loading}
                            wireframeRows={10}
                        />
                    </Flex>
                </CardBody>
            </Card>
        </>
    )
}
