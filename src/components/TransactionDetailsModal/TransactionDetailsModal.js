import { useQuery } from '@apollo/client';
import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button, Heading, IconButton, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import { GET_TRANSACTION_WITH_HASH } from "../../utils/queries";


export default function TransactionDetailsModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hash } = props;
  const [transaction, setTransaction] = useState();

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
    <>
      <IconButton onClick={onOpen} cursor="pointer" icon={<InfoOutlineIcon />} />
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={true} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <VStack spacing="10px" align="left">
              <Heading as='h2' size='xs'> Transaction Hash: </Heading> <Text> {transactionHash} </Text>
              <Heading as='h2' size='xs'> Block: </Heading> <Text> {blockNumber}</Text>
              <Heading as='h2' size='xs'> Timestamp: </Heading> <Text> {timestamp} </Text>
              <Heading as='h2' size='xs'> From: </Heading> <Text> {from} </Text>
              <Heading as='h2' size='xs'> To: </Heading> <Text> {to} </Text>
              <Heading as='h2' size='xs'> $QUAI Sent: </Heading> <Text> {value} </Text>
            </VStack>

          </ModalBody>
          <ModalFooter>
            <Button bgColor='brand.300' textColor='white' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
