import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { SHARDED_ADDRESS } from "../../constants";
import { GET_LATEST_TRANSACTIONS_SUBSCRIPTION } from "../../utils/queries";
import TransactionsMiniTableRow from "../Tables/TransactionsMiniTableRow";
import { RepeatIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom'

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
  Flex
} from '@chakra-ui/react';

import moment from 'moment'

export default function TransactionsMiniTable() {
  // Component state
  const [transactions, setTransactions] = useState([]);

  const { data, error, loading } = useSubscription(GET_LATEST_TRANSACTIONS_SUBSCRIPTION);

  const textColor = useColorModeValue("gray.700", "white");
  const spinnerLabel = "Loading the transactions table";

  const navigateTo = useNavigate()

  // When this component mounts, grab a reference to all transactions and set transactions in state
  useEffect(() => {
    if (data) {
      setTransactions(data?.transactions);
  
      
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
            <Text fontSize='sm'> Sorry! There seems to be a problem with loading this table. </Text>
            <Button bgColor="transparent" leftIcon={<RepeatIcon  />} onClick={() => navigateTo('/')}> Refresh </Button>
        </Alert>
      </>
    )
  }

  return (
    <>
      {!loading ?
        <>
          <Table size="sm" variant="simple" color={textColor}>
            <Tbody>
              {transactions?.map((transaction, index) => {
                const timeDisplay =  moment.unix(transaction.tx_time).fromNow();
                return (
                  <TransactionsMiniTableRow
                    value={transaction.tx_value}
                    blockNumber={transaction.block_number}
                    fromAddress={transaction.from_addr}
                    toAddress={transaction.to_addr}
                    hash={transaction.hash}
                    timestamp={timeDisplay}
                    key={index}
                  />
                );
              })}
             
            </Tbody>

         
          </Table>

          <Button mt={5} alignContent="center"> View All </Button> 
          
        </> : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
    </>
  )
}


