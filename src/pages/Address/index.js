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

export default function Address() {

  const { hash } = useParams();
  const navigateTo = useNavigate();
   
  const balance = 10000;  

    return (
        <>
      
        
        <Card pt={{ base: "120px", md: "100px" }}>
            <CardBody>
                <VStack spacing="12px" align="left">
                    <IconButton onClick={() => navigateTo('/')} icon={ <ArrowBackIcon />} aria-label="Back to the Explorer home page" w="24px"/> 
                    <Spacer />

                    
                    <Heading as='h2' size='md'> Hash: </Heading> 
                    

                    <Heading as='h2' size='md'> Balance: </Heading> <Text fontSize="lg"> {balance}</Text>
                  
                </VStack>
            </CardBody>
        </Card>
        
        </>
    )
}


