import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { SHARDED_ADDRESS } from "../../constants";
import { GET_BLOCKS, GET_LATEST_BLOCKS_SUBSCRIPTION } from "../../utils/queries";
import { convertTimeString } from "../../utils";
import BlocksMiniTableRow from "../Tables/BlocksMiniTableRow";
import Pagination from '../Pagination';
import { useNavigate } from 'react-router-dom'
import AppContext from '../AppContext/AppContext'

import {
  Alert,
  AlertIcon,
  Spinner,
  Table,
  Text,
  Button,
  Tbody,
  Tr,
  Th,
  useColorModeValue,
  VStack,
  Box,
  Flex,
  Link
} from '@chakra-ui/react';

import moment from 'moment'
import { RepeatIcon } from '@chakra-ui/icons';

export default function BlocksMiniTable() {
  // Component state
  const [blocks, setBlocks] = useState([]);
  const { data, error, loading } = useSubscription(GET_LATEST_BLOCKS_SUBSCRIPTION);
  const navigateTo = useNavigate();

  const textColor = useColorModeValue("gray.700", "white");
  const spinnerLabel = "Loading the blocks table";

  // When this component mounts, grab a reference to all blocks, reformat the object, and set blocks in state
  useEffect(() => {
    if (data) {
      const tempBlocks = data?.blocks.map(block => {
        const miner = block.header.miner;
        let unix_timestamp = block.timestamp;
        let differenceOfTime = moment.unix(unix_timestamp).fromNow();

        return {
          ...block.header,
          location: SHARDED_ADDRESS[block.location],
          number: block.number,
          miner,
          timestamp: differenceOfTime,
          hash: block.hash
        }
      });
      setBlocks(tempBlocks);
    }
  }, [data])


  /**
     * Error handling in the event the GQL query fails
     * Shows an alert
     */
  if (error) {
    console.log(error)
    return (
      <Alert status='error' mt={5} >
        <AlertIcon />
        <Text fontSize='md'> Sorry! There seems to be a problem with loading this table. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>   
      </Alert>
    )
  }

  return (
    <>
      {!loading ?
        <>
          <Table variant="simple" color={textColor}>
            <Tbody>
              {blocks?.map((block, index) => {
                return (
                  <BlocksMiniTableRow
                    location={block.location}
                    blockNumber={block.number}
                    minerAddress={block.miner}
                    timestamp={block.timestamp}
                    hash={block.hash}
                    numberOfTxs={Math.round(100*Math.random())}
                    key={index}
                  />
                );
              })}
           
            </Tbody>
           
          </Table>
          <Button mt={2} alignContent="center" onClick={() => navigateTo("/blocks")}> View All </Button> 

        </> : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
    </>
  )
}


