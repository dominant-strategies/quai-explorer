import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_TRANSACTION_WITH_HASH } from "../../utils/queries";
import {
    Box,
    Heading,
    Text,
    Spinner,
    IconButton,
    VStack,
    Button,
    Spacer
} from '@chakra-ui/react';
import { reduceStringShowMediumLength } from '../../utils';

import { ArrowBackIcon } from '@chakra-ui/icons';
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton';

import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';

export default function Transaction() {
    // Component state
    const [transaction, setTransaction] = useState();

    // GraphQL queries
    const { hash } = useParams();
    const navigateTo = useNavigate();
    const { loading, error, data } = useQuery(GET_TRANSACTION_WITH_HASH, { variables: { hash } });

    // When this component mounts, grab a reference to the transaction 
    useEffect(() => {
        setTransaction(data?.transactions[0]);
    }, [data])

    // Transaction details to display
    let transactionHash = transaction?.hash;
    let transactionHashReduced
    if (transactionHash) { transactionHashReduced = reduceStringShowMediumLength(transactionHash); }


    const blockNumber = transaction?.block_number;
    const timestamp = transaction?.timestamp;

    let from = transaction?.from;
    let fromHashReduced
    let to = transaction?.to;
    let toHashReduced
    if (from) { fromHashReduced = reduceStringShowMediumLength(from); }
    if (to) { toHashReduced = reduceStringShowMediumLength(to); }

    const value = transaction?.value;

    return (
        <>
            {loading ?
                <>
                    <Box p={5}></Box>
                    <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='xl' ml={5} mt={20} label="Loading details for this transaction" />
                </>
                :
                <Card pt={{ base: "120px", md: "100px" }}>
                    <CardBody>
                        <VStack spacing="12px" align="left">
                            <IconButton onClick={() => navigateTo('/')} icon={<ArrowBackIcon />} aria-label="Back to the Explorer home page" w="24px" />
                            <Spacer />
                            <Heading as='h2' size='md'> Tx Hash: </Heading>
                            <CopyToClipboardButton innerText={transactionHashReduced} copyThisToClipboard={transactionHash} />

                            <Heading as='h2' size='md'> Block: </Heading> <Text fontSize="lg"> {blockNumber} </Text>
                            <Heading as='h2' size='md'> Timestamp: </Heading> <Text fontSize="lg"> {timestamp}</Text>
                            <Heading as='h2' size='md'> From: </Heading>
                            <CopyToClipboardButton innerText={fromHashReduced} copyThisToClipboard={from} />
                            <Heading as='h2' size='md'> To: </Heading>
                            <CopyToClipboardButton innerText={toHashReduced} copyThisToClipboard={to} />
                            <Heading as='h2' size='md'> Value: </Heading> <Text fontSize="lg"> {value} </Text>
                        </VStack>
                    </CardBody>
                </Card>
            }
        </>
    )
}
