import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import { GET_TRANSACTION_WITH_ADDRESS, GET_TRANSACTION_WITH_ADDRESS_2 } from '../../utils/queries'
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
    Box
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton'
import axios from 'axios'

import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'

import { CHAIN_SLUGS_2, PORTS, PREFIX } from '../../constants'

import TransactionTableRowAddressPage from "../../components/Tables/TransactionTableRowAddressPage";

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

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [transactionsCount, setTransactionsCount] = useState(0)

    const { loading, error, data, refetch: refetchTransactionData } = useQuery(GET_TRANSACTION_WITH_ADDRESS_2, { variables: { fetchPolicy: "cache-and-network", num: limit, offset: (currentPage - 1) * limit, hash: hash } });

    const textColor = useColorModeValue("gray.700", "white");
    const spinnerLabel = "Loading the transactions table";

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
                        'http://45.76.19.78:' + chainPort(chain(numAddressPrefix)),
                        JSON.stringify(payload),
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                    console.log("balance: ", balance)
                } catch (err) {
                    console.log(err)
                    return (
                        <>
                            {window.innerWidth < 768 ? <Box p={4}></Box> : null}
                            <Box p={4}></Box>
                            <Alert status='error' mt={20} >
                                <AlertIcon />
                                <Text fontSize='sm'>There was a problem. We sincerely apologize for any inconvenience this may cause.</Text>
                            </Alert>
                        </>
                    )
                }

                if (balance != null) {
                    setBalance(parseInt(data.data.result), 10)
                }
            }
            load().then(() => {
                if (data) {
                    setTransactions(data?.transactions);
                    let transactionsCount = data?.transactions_aggregate?.aggregate?.count;
                    setTransactionsCount(transactionsCount);
                    setTotalPage(parseInt(transactionsCount / limit) + 1);
                }
            }).catch((error) => {
                console.log(error)
                return (
                    <>
                        {window.innerWidth < 768 ? <Box p={4}></Box> : null}
                        <Box p={4}></Box>
                        <Alert status='error' mt={20} >
                            <AlertIcon />
                            <Text fontSize='sm'>There was a problem. We sincerely apologize for any inconvenience this may cause.</Text>
                        </Alert>
                    </>
                )
            })
        }
        else { setShowErrorWithHash(true) }
    })

    if ( error || errorWithHash) {
        return (
            <>
                {window.innerWidth < 768 ? <Box p={4}></Box> : null}
                <Box p={10}></Box>
                <IconButton onClick={() => navigateTo('/')} icon={<ArrowBackIcon />} aria-label="Back to the Explorer home page" w="24px" />
                <Alert status='error' mt={7} >
                    <AlertIcon />
                    <Text fontSize='xl'>This hash is invalid.</Text>
                </Alert>
            </>
        )
    }

    else {



        return (
            <>




                <Card pt={{ base: '120px', md: '100px' }} overflowX={{ sm: "scroll", xl: "hidden" }}>

                    <CardBody>
                        <VStack spacing="12px" align="left">
                            <IconButton onClick={() => navigateTo('/')} icon={<ArrowBackIcon />} aria-label="Back to the Explorer home page" w="24px" />
                            <Spacer />
                            <Heading as="h1" size="lg">
                                Address <CopyToClipboardButton innerText={hash} copyThisToClipboard={hash} />
                            </Heading>{' '}



                            <Heading as="h2" size="md">
                                {' '}
                                Balance:{' '}
                            </Heading>{' '}
                            <Text fontSize="lg"> {balance}</Text>


                        </VStack>
                    </CardBody>
                </Card>

                <Spacer />

                <Card mt={5} overflowX={{ sm: "scroll", xl: "hidden" }}>

                    <CardHeader mb="20px" pl="22px" pt="10px">
                        <Flex direction="column" alignSelf="flex-start">
                            <Heading as="h1" fontSize="3xl" color={textColor} fontWeight="bold">
                                Transactions
                            </Heading>
                        </Flex>
                    </CardHeader>


                    {!loading ?
                        <CardBody >
                            <Table variant="simple" color={textColor}>

                                <Thead>
                                    <Tr my=".8rem" ps="0px">
                                        <Th color="gray.400">Hash</Th>
                                        <Th color="gray.400" >Block</Th>
                                        <Th color="gray.400">To</Th>
                                        <Th color="gray.400"> Value</Th>
                                        <Th color="gray.400">Gas</Th>
                                    </Tr>
                                </Thead>



                                <Tbody>
                                    {transactions?.map((transaction, index) => {
                                        return (
                                            <TransactionTableRowAddressPage
                                                transactionHash={transaction.hash}
                                                toThisMiner={transaction.to_addr}
                                                fromThisMiner={transaction.from_addr}
                                                blockNumber={transaction.block_number}
                                                quaiSent={transaction.tx_value}
                                                timestamp={transaction.tx_time}
                                                gas={transaction.full_transaction.gas}
                                                key={index}
                                            />
                                        );
                                    })}
                                    {totalPage > 1 ?
                                        <Pagination
                                            refetchData={refetchTransactionData}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            limit={limit} setLimit={setLimit}
                                            totalPage={totalPage}
                                            dimensions={{
                                                sm: '100%',
                                                md: '100%',
                                                lg: '100%',
                                                xl: "100%"
                                            }} /> : null}
                                </Tbody>



                            </Table>

                        </CardBody>


                        :

                        <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />

                    }

                </Card>



            </>
        )
    }
}
