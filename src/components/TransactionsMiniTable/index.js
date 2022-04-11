import { useSubscription } from '@apollo/client';
import {
  Alert,
  AlertIcon, Button, Link, Spinner,
  Table, Tbody, Text, useColorModeValue
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toQuai } from '../../utils';
import { GET_LATEST_TRANSACTIONS_SUBSCRIPTION } from "../../utils/queries";
import TransactionsMiniTableRow from "../TableRows/TransactionsMiniTableRow";


export default function TransactionsMiniTable() {
  // Component state
  const [transactions, setTransactions] = useState([]);
  const { data, error, loading } = useSubscription(GET_LATEST_TRANSACTIONS_SUBSCRIPTION);
  const navigateTo = useNavigate()

  const textColor = useColorModeValue("gray.700", "white");
  const spinnerLabel = "Loading the transactions table";


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
          <Text fontSize='md'> Sorry! There seems to be a problem with loading this table. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>
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
                const timeDisplay = moment.unix(transaction.tx_time).fromNow();
                const quaiValue = toQuai(transaction.tx_value)
                return (
                  <TransactionsMiniTableRow
                    value={quaiValue}
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

          <Button mt={5} alignContent="center" onClick={() => navigateTo("/transactions")}> View All </Button>

        </> : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
    </>
  )
}


