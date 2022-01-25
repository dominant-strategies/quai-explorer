import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_BLOCK_WITH_HASH } from "../../utils/queries";
import { POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { convertTimeString, numberWithCommas } from '../../utils';
import {
    Box,
    Heading,
    Text,
    Spinner,
    Grid,
    GridItem,
    HStack
} from '@chakra-ui/react';

function Block() {
    // Component state
    const [block, setBlock] = useState();
    const [position, setPosition] = useState();

    // GraphQL queries
    const { hash } = useParams();
    const { loading, error, data } = useQuery(GET_BLOCK_WITH_HASH, { variables: { hash } });

    // When this component mounts, grab a reference to the block 
    useEffect(() => {
        setBlock(data?.blocks[0]);
        setPosition(POSITIONS[CHAIN_SLUGS.findIndex((slug) => slug === data?.blocks[0]?.location)]);
    }, [data])

    // Block details to display
    const blockHeight = block?.header.number[position];
    const location = block?.header.number[position];
    const blockHash = block?.hash;
    const timestamp = convertTimeString(block?.timestamp);
    const gasUsed = block?.header?.gasUsed[position];
    const gasLimit = block?.header?.gasLimit[position];
    const difficulty = numberWithCommas(block?.header?.difficulty[position]);
    const networkDifficulty = numberWithCommas(block?.header?.networkDifficulty[position]);
    
    return (
        <Box p={12}>

            {/* Heading */}
            <Heading>Block Details</Heading>

            {/* Spacing */}
            <Box p={4}></Box>

            {/* Details */}
            <Box>
                {loading ? <Spinner size={"xl"} label='Loading the block details' /> :
                    <Grid
                        h='100px'
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(5, 1fr)'
                        gap={4}
                    >

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Block Height: </Text> 
                                <Text fontSize={'xl'}>{blockHeight}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Location: </Text> 
                                <Text fontSize={'xl'}>{location}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Hash: </Text> 
                                 {/*
                                    This value is truncated on smaller screens for now.
                                    In the future this will become a link which will take users to the page of 
                                    that address similar to etherscan.io/address/{hash} 
                                 */}
                                <Text fontSize={'xl'} isTruncated>{blockHash}</Text>
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
                                <Text fontSize={'xl'} fontWeight={'600'}>Gas Used: </Text> 
                                <Text fontSize={'xl'}>{gasUsed}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Gas Limit: </Text> 
                                <Text fontSize={'xl'}>{gasLimit}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Difficulty: </Text> 
                                <Text fontSize={'xl'}>{difficulty}</Text>
                            </HStack>
                        </GridItem>

                        <GridItem colSpan={4}>
                            <HStack>
                                <Text fontSize={'xl'} fontWeight={'600'}>Network Difficulty: </Text> 
                                <Text fontSize={'xl'}>{networkDifficulty}</Text>
                            </HStack>
                        </GridItem>
                    </Grid>
                }
            </Box>
        </Box>
    )
}

export default Block
