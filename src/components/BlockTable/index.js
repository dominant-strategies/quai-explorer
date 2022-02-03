import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Pagination from "../Pagination";
import { POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { GET_BLOCKS } from "../../utils/queries";
import { convertTimeString } from "../../utils";
import BlockTableRow from "../Tables/BlockTableRow"

import {
    Alert,
    AlertIcon,
    Spinner,
    Table,
    Text,
    Thead,
    Tbody,
    Tr,
    Th,
    useColorModeValue
  } from '@chakra-ui/react';

export default function BlockTable({ setBlocksCount }) {
    // Component state
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [blocks, setBlocks] = useState([]);

    // GraphQL queries
    const { loading, error, data } = useQuery(GET_BLOCKS, { variables: { num: limit, offset: (currentPage - 1) * limit } });

    // Other hooks
    // const navigateTo = useNavigate();

    const textColor = useColorModeValue("gray.700", "white");
    const spinnerLabel = "Loading the blocks table";

    // When this component mounts, grab a reference to all blocks, reformat the object, and set blocks in state
    useEffect(() => {
        if (data) {
            const tempBlocks = data?.blocks.map(block => {
                const miner = block.header.miner[POSITIONS[CHAIN_SLUGS.findIndex((slug) => slug === block.location)]]
                let unix_timestamp = block.header.timestamp;
                const formattedTime = convertTimeString(unix_timestamp);
                return {
                    ...block.header,
                    location: SHARDED_ADDRESS[block.location],
                    number: block.header.number[POSITIONS[CHAIN_SLUGS.findIndex((slug) => slug === block.location)]],
                    miner,
                    timestamp: formattedTime
                }
            });
            setBlocks(tempBlocks);
            const blocksCount = data?.blocks_aggregate?.aggregate?.count;
            setBlocksCount(blocksCount);
            setTotalPage(parseInt(blocksCount / limit) + 1);
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
        <Alert status='error' mt={5} > 
          <AlertIcon /> 
          <Text fontSize='sm'>There was a problem loading this table. We sincerely apologize for any inconvenience this may cause.</Text>
        </Alert>
      </>
    )
  }

    return (
        <>
        {!loading ?
        <Table variant="simple" color={textColor}>
           
            <Thead>
              
              <Tr my=".8rem" ps="0px">
                <Th color="gray.400">Location</Th>
                <Th color="gray.400" isNumeric>Number</Th>
                <Th color="gray.400">Miner Address</Th>
                <Th color="gray.400">Transactions</Th>
                <Th color="gray.400">Timestamp</Th>
              </Tr>

            </Thead>
            
            
            <Tbody>
              {blocks?.map((block) => {
                return (
                  <BlockTableRow
                    location={block.location}
                    blockNumber={block.number}
                    minerAddress={block.miner}
                    transactionCount={0}
                    timestamp={block.timestamp}
                  />
                );
              })}
            </Tbody>
          </Table>
          : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md'ml={4} mt={2} label={spinnerLabel} /> }
        </>
    )
}


