import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_BLOCK_WITH_HASH } from "../../utils/queries";
import { POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { convertTimeString, numberWithCommas, reduceStringShowMediumLength } from '../../utils';
import {
    Box,
    Spacer,
    Spinner,
    Text,
    VStack,
    IconButton,
    Heading,
    Button
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton';


import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';

export default function Block() {
    // Component state
    const [block, setBlock] = useState();

    // GraphQL queries
    const { hash } = useParams();
    const navigateTo = useNavigate();
    const { loading, error, data } = useQuery(GET_BLOCK_WITH_HASH, { variables: { hash } });

    // When this component mounts, grab a reference to the block 
    useEffect(() => {
        setBlock(data?.blocks[0]);
    }, [data])

    let blockHash = block?.hash;
    let blockHashReduced;
    if ( blockHash ) { blockHashReduced = reduceStringShowMediumLength(blockHash); }

    let location = block?.location;
    if ( location ) { location = SHARDED_ADDRESS[location]; }

    let timestamp = block?.timestamp;
    if ( timestamp ) { timestamp = convertTimeString(timestamp); }

    const blockNumber = block?.number;
    const gasLimit = block?.gas_limit;
    const gasUsed = block?.gas_used;
    const difficulty = block?.difficulty;

    let networkDifficulty = block?.network_difficulty;
    if( networkDifficulty ) { networkDifficulty = parseInt(networkDifficulty, 16); }
    
    /**
     * Error handling in the event the GQL query fails
     */
  if (error) {
    console.log(error)
    return null
  }

    return (
        <>
        {loading ?  
        <>
            <Box p={5}></Box> 
            <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='xl' ml={5} mt={20} label="Loading details for this block" /> 
        </>
        :
        <Card pt={{ base: "120px", md: "100px" }}>
            <CardBody>
                <VStack spacing="12px" align="left">
                    <IconButton onClick={() => navigateTo('/')} icon={ <ArrowBackIcon />} aria-label="Back to the Explorer home page" w="24px"/> 
                    <Spacer />
                    <Heading as='h2' size='md'> Block Number: </Heading> <Text fontSize="lg"> {blockNumber} </Text>
                    <Heading as='h2' size='md'> Location: </Heading> <Text fontSize="lg"> {location} </Text>
                    
                    <Heading as='h2' size='md'> Hash: </Heading> 
                    <CopyToClipboardButton innerText={blockHashReduced} copyThisToClipboard={blockHash} />

                    <Heading as='h2' size='md'> Timestamp: </Heading> <Text fontSize="lg"> {timestamp}</Text>
                    <Heading as='h2' size='md'> Gas Used: </Heading> <Text fontSize="lg"> {gasUsed} </Text>
                    <Heading as='h2' size='md'> Gas Limit: </Heading> <Text fontSize="lg"> {gasLimit} </Text>
                    <Heading as='h2' size='md'> Difficulty: </Heading> <Text fontSize="lg"> {difficulty} </Text>
                    <Heading as='h2' size='md'> Network Difficulty: </Heading> <Text fontSize="lg"> {networkDifficulty} </Text>
                </VStack>
            </CardBody>
        </Card>
        }
        </>
    )
}


