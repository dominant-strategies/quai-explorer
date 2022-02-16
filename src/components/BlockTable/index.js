import React, { useState, useEffect, useContext } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { GET_BLOCKS, SUBSCRIBE_BLOCK_CHANGES } from "../../utils/queries";
import { convertTimeString, numberWithCommas } from "../../utils";
import BlockTableRow from "../Tables/BlockTableRow";
import Pagination from '../Pagination';

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
  useColorModeValue,
  Flex,
  Heading
} from '@chakra-ui/react';

import AppContext from '../AppContext/AppContext';

export default function BlockTable({ setBlocksCount }) {
  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [blocks, setBlocks] = useState([]);

  // GraphQL queries
  const { loading, error, data, refetch: refetchBlockData, subscribeToMore } = useQuery(GET_BLOCKS, { variables: { fetchPolicy: "cache-and-network", num: limit, offset: (currentPage - 1) * limit } });
  
  const globalState = useContext(AppContext);
  globalState.setBlocksCountisLoading(loading);

  const textColor = useColorModeValue("gray.700", "white");
  const spinnerLabel = "Loading the blocks table";

  // When this component mounts, grab a reference to all blocks, reformat the object, and set blocks in state
  useEffect(() => {
    if (data) {
      const tempBlocks = data?.blocks.map(block => {
        const miner = block.header.miner;
        let unix_timestamp = block.timestamp;
        const formattedTime = convertTimeString(unix_timestamp);
        return {
          ...block.header,
          location: SHARDED_ADDRESS[block.location],
          number: block.number,
          miner,
          timestamp: formattedTime
        }
      });
      setBlocks(tempBlocks);
      const blocksCount = data?.blocks_aggregate?.aggregate?.count;
      setBlocksCount(blocksCount);
      setTotalPage(parseInt(blocksCount / limit) + 1);
    }

    subscribeToMore({
      document: SUBSCRIBE_BLOCK_CHANGES,
      variables: { fetchPolicy: "cache-and-network", num: limit, offset: (currentPage - 1) * limit },
      updateQuery: (prev, { newData }) => {
        if (!newData) return prev;
        const newBlock = newData.blocks[0]
        return Object.assign({}, prev, {
          blocks: [newBlock, ...prev.blocks]
        });
      }
    })
    
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
        <>
          <Table variant="simple" color={textColor}>

            <Thead>

              {/* if its a mobile screen, the icon to show more details is on the left in each row */}
              {window.innerWidth > 768 ?

                <Tr my=".8rem" ps="0px">
                  <Th color="gray.400">Location</Th>
                  <Th color="gray.400" isNumeric>Block</Th>
                  <Th color="gray.400">Miner</Th>
                  <Th color="gray.400">TX Count</Th>
                  <Th color="gray.400">Timestamp</Th>
                  <Th color="gray.400"></Th>
                </Tr>

                :

                <Tr my=".8rem" ps="0px">
                  <Th color="gray.400"></Th>
                  <Th color="gray.400">Location</Th>
                  <Th color="gray.400" isNumeric>Block</Th>
                  <Th color="gray.400">Miner</Th>
                  <Th color="gray.400">TX Count</Th>
                  <Th color="gray.400">Timestamp</Th>

                </Tr>
              }

            </Thead>


            <Tbody>
              {blocks?.map((block, index) => {
                return (
                  <BlockTableRow
                    location={block.location}
                    blockNumber={block.number}
                    minerAddress={block.miner}
                    transactionCount={0}
                    timestamp={block.timestamp}
                    hash={block.hash}
                    key={index}
                  />
                );
              })}
            </Tbody>
          </Table>
          {totalPage > 1 ?
          <Pagination
            refetchData={refetchBlockData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit} setLimit={setLimit}
            totalPage={totalPage}
            dimensions={{
              sm: "40%",
              md: "55%",
              lg: "75%",
              xl: "93%"
            }} />
            : null
          }
        </> : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
    </>
  )
}


