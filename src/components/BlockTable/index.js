import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { SHARDED_ADDRESS } from "../../constants";
import { GET_BLOCKS } from "../../utils/queries";
import { convertTimeString } from "../../utils";
import BlockTableRow from "../Tables/BlockTableRow";
import Pagination from '../Pagination';

import { useNavigate } from 'react-router-dom';

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
  Container,
  VStack,
  Flex,
  Link
} from '@chakra-ui/react';

import moment from 'moment'

export default function BlockTable() {

  const navigateTo = useNavigate()
  // Component state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [blocks, setBlocks] = useState([]);
  const [blocksCountLocal, setBlocksCountLocal] = useState(0);
  const [firstBlockNumber, setFirstBlockNumber] = useState("");
  const [lastBlockNumber, setLastBlockNumber] = useState("");

  // GraphQL queries
  const { loading, error, data, refetch: refetchBlocks } = useQuery(GET_BLOCKS, { variables: { num: limit, offset: (currentPage - 1) * limit } });

  const textColor = useColorModeValue("gray.700", "white");
  const spinnerLabel = "Loading the blocks table";

  // When this component mounts, grab a reference to all blocks, reformat the object, and set blocks in state
  useEffect(() => {
    refetchBlocks()
    if (data) {
      const tempBlocks = data?.blocks.map(block => {
        const miner = block.header.miner;
        let unix_timestamp = block.timestamp;
        let converted_unix_timestamp = convertTimeString(unix_timestamp)
        let differenceOfTime = moment.unix(unix_timestamp).fromNow();

        let transactions = block.header.transactions
        let uncles = block.header.uncles

        return {
          ...block.header,
          location: SHARDED_ADDRESS[block.location],
          number: block.number,
          miner,
          age: differenceOfTime,
          timestamp: converted_unix_timestamp,
          gasLimit: block.gas_limit,
          gasUsed: block.gas_used,
          transactions,
          uncles
        }
      });
      setBlocks(tempBlocks);
      setFirstBlockNumber(tempBlocks[0].number)
      setLastBlockNumber(tempBlocks[tempBlocks.length-1].number)
      const blocksCount = data?.blocks_aggregate?.aggregate?.count;
      setBlocksCountLocal(blocksCount);
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
          <Text fontSize='md'> Sorry! There seems to be a problem with loading this table. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>
        </Alert>
      </>
    )
  }

  return (
    <>
      {!loading ?
        <>
          <Flex flexDir="column">
           
            <Text size="md" fontWeight="bold" ml={5} pb={5} color="gray.400"> Block {firstBlockNumber} to Block {lastBlockNumber} of {blocksCountLocal} blocks </Text>
          
            <Table variant="simple" color={textColor}>

              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400">
                  <Th color="gray.400">Block</Th>
                  <Th color="gray.400">Location</Th>
                  <Th color="gray.400">Age</Th>
                  <Th color="gray.400">Txs</Th>
                  <Th color="gray.400">Uncles</Th>
                  <Th color="gray.400">Miner</Th>
                  <Th color="gray.400">Gas Used</Th>
                  <Th color="gray.400">Gas Limit</Th>
                </Tr>
              </Thead>


              <Tbody>
                {blocks?.map((block, index) => {
                  return (
                    <BlockTableRow
                      location={block.location}
                      blockNumber={block.number}
                      minerAddress={block.miner}
                      timestamp={block.timestamp}
                      hash={block.hash}
                      gasUsed={block.gasUsed}
                      gasLimit={block.gasLimit}
                      age={block.age}
                      transactions={block.transactions}
                      uncles={block.uncles}
                      key={index}
                    />
                  );
                })}
              </Tbody>
            </Table>


            {totalPage > 1 ? (
              <Pagination
                currentPage={currentPage}
                totalCount={
                  blocksCountLocal != 0
                    ? blocksCountLocal
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
        </> : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
    </>
  )
}


