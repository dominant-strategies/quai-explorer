import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { GET_BLOCK_WITH_HASH } from "../../utils/queries";
import { POSITIONS, CHAIN_SLUGS } from "../../constants";
import { convertTimeString, numberWithCommas } from '../../utils';
import {
  Button,
  ButtonGroup,
  Box,
  IconButton,
  VStack,
  useColorModeValue,
  useDisclosure,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from "@chakra-ui/icons";


export default function BlockDetailsModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hash } = props;
  
  // Component state
  const [block, setBlock] = useState();
  const [position, setPosition] = useState();
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
    <>
    <IconButton onClick={onOpen} cursor="pointer" icon={ <InfoOutlineIcon /> } />
    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={true} size="xl" scrollBehavior="inside">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Block Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      
        <VStack spacing="10px" align="left">
          <Heading as='h2' size='xs'> Block Height: </Heading> <Text> {blockHeight} </Text>
          <Heading as='h2' size='xs'> Location: </Heading> <Text> {location} </Text>
          <Heading as='h2' size='xs'> Hash: </Heading> <Text> {blockHash} </Text>
          <Heading as='h2' size='xs'> Timestamp: </Heading> <Text> {timestamp}</Text>
          <Heading as='h2' size='xs'> Gas Used: </Heading> <Text> {gasUsed} </Text>
          <Heading as='h2' size='xs'> Gas Limit: </Heading> <Text> {gasLimit} </Text>
          <Heading as='h2' size='xs'> Difficulty: </Heading> <Text> {difficulty} </Text>
          <Heading as='h2' size='xs'> Newtork Difficulty: </Heading> <Text> {networkDifficulty} </Text>
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
