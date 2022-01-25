import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_TRANSACTION_WITH_HASH } from "../../utils/queries";
import {
    Box,
    Heading,
    Text,
    Spinner,
    Grid,
    GridItem,
    HStack
} from '@chakra-ui/react';

function Transaction() {
    // Component state
    const [transaction, setTransaction] = useState();

    // GraphQL queries
    const { hash } = useParams();
    const { loading, error, data } = useQuery(GET_TRANSACTION_WITH_HASH, { variables: { hash } });

    // When this component mounts, grab a reference to the transaction 
    useEffect(() => {
        setTransaction(data?.transactions[0]);
    }, [data])

    // Transaction details to display
    const transactionHash = transaction?.hash;
    const blockNumber = transaction?.block_number;
    const timestamp = transaction?.timestamp;
    const from = transaction?.from;
    const to = transaction?.to;
    const value = transaction?.value;

    return (
        <Box p={12}>

            {/* Heading */}
            <Heading>Transaction Details</Heading>

            {/* Spacing */}
            <Box p={4}></Box>

            {/* Details */}
            <Box>
                {loading ? <Spinner size={"xl"} label='Loading the transactions details' /> :
                    <Grid
                        h='100px'
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(5, 1fr)'
                        gap={4}
                    >
                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Transaction Hash: </Text>
                                {/*
                                    This value is truncated on smaller screens for now.
                                    In the future this will become a link which will take users to the page of 
                                    that address similar to etherscan.io/address/{hash} 
                                 */}
                                <Text fontSize={'xl'} isTruncated>{transactionHash}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Block: </Text>
                                <Text fontSize={'xl'}>{blockNumber}</Text>
                            </HStack>
                        </GridItem>

                        
                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Timestamp: </Text>
                                <Text fontSize={'xl'}>{timestamp}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>From: </Text>
                                {/*
                                    This value is truncated on smaller screens for now.
                                    In the future this will become a link which will take users to the page of 
                                    that address similar to etherscan.io/address/{hash} 
                                 */}
                                <Text fontSize={'xl'} isTruncated>{from}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>To: </Text>
                                {/*
                                    This value is truncated on smaller screens for now.
                                    In the future this will become a link which will take users to the page of 
                                    that address similar to etherscan.io/address/{hash} 
                                 */}
                                <Text fontSize={'xl'}>{to}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Value: </Text>
                                <Text fontSize={'xl'}>{value}</Text>
                            </HStack>
                        </GridItem>

                    </Grid>
                }
            </Box>
        </Box>
    )
}

export default Transaction
