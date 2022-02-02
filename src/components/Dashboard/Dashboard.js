import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Portal,
  SimpleGrid,
  Spacer,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import IconBox from "../Icons/IconBox";
import BlockTable from "../BlockTable";
import TransactionTable from "../TransactiontTable";

import { BsBox } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { VscGraph } from "react-icons/vsc";
import { FaHardHat } from "react-icons/fa";

import { useQuery } from '@apollo/client';
import { GET_BLOCK_WITH_HASH, GET_TRANSACTION_WITH_HASH } from "../../utils/queries";

export default function Dashboard() {
  const [blocksCount, setBlocksCount] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);
  const [hashrateValue, setHashrateValue] = useState(0);
  const [difficultyValue, setDifficultyValue] = useState(0);
  const [searchHash, setSearchHash] = useState("");

  const { data: BlockData, refetch: refetchBlockData } = useQuery(GET_BLOCK_WITH_HASH, { variables: { hash: searchHash } });
  const { data: TransactionData, refetch: refetchTransactionData } = useQuery(GET_TRANSACTION_WITH_HASH, { variables: { hash: searchHash } });

  const quaiOrangeColor = useColorModeValue("orange.300", "orange.300");
  const textColor = useColorModeValue("gray.700", "white");
  const overlayRef = React.useRef();

  const blocksCardHeading = ( <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Blocks </StatLabel> );
  const blocksIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={BsBox} w="24px" h="24px" color="white"/> </IconBox>);
  const blocksCountSpinner = ( <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='orange.300' size='xs' label='Loading block count' /> );
  const blocksCountDisplay = ( 
    <Flex> 
      <StatNumber fontSize="lg" color={textColor}> 
        {blocksCount !== 0 ? blocksCount : blocksCountSpinner } 
      </StatNumber> 
    </Flex> 
  );

  const transactionsCardHeading = ( <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Transactions </StatLabel> );
  const transactionsIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={GiMoneyStack} w="24px" h="24px" color="white"/> </IconBox>);
  const transactionsCountSpinner = ( <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='orange.300' size='xs' label='Loading transactions count' /> );
  const transactionsCountDisplay = ( 
    <Flex> 
      <StatNumber fontSize="lg" color={textColor}> 
        {transactionsCount !== 0 ? transactionsCount : transactionsCountSpinner } 
      </StatNumber> 
    </Flex> 
  );

  const hashrateCardHeading = ( <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Hashrate </StatLabel> );
  const hashrateIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={VscGraph} w="24px" h="24px" color="white"/> </IconBox>);
  const hashrateValueDisplay = ( <Flex> <StatNumber fontSize="lg" color={textColor}> {hashrateValue} </StatNumber> </Flex> );
    
  const difficultyCardHeading = ( <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Difficulty </StatLabel> );
  const difficultyIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={FaHardHat} w="24px" h="24px" color="white"/> </IconBox>);
  const difficultyValueDisplay = ( <Flex> <StatNumber fontSize="lg" color={textColor}> {difficultyValue} </StatNumber> </Flex> );
  
  
  return (
    // Container
    <Flex flexDirection="column" pt={{ base: "120px", md: "5px" }}>
      
      {/* Stat Cards Grid */}
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        
        {/* Blocks Card */}
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                {blocksCardHeading}
                {blocksCountDisplay}
              </Stat>
              {blocksIcon}
            </Flex>
          </CardBody>
        </Card>

        {/* Transactions Card */}
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                {transactionsCardHeading}
                {transactionsCountDisplay}
              </Stat>
              {transactionsIcon}
            </Flex>
          </CardBody>
        </Card>

        {/* Hashrate Card -- TODO: Get actual hashrate, hard-coded to 0 for now  */}
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                {hashrateCardHeading}
                {hashrateValueDisplay}
              </Stat>
             {hashrateIcon}
            </Flex>
          </CardBody>
        </Card>

        {/* Difficulty Card -- TODO: Get actual hashrate, hard-coded to 0 for now  */}
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                {difficultyCardHeading}
                {difficultyValueDisplay}
              </Stat>
              {difficultyIcon}
            </Flex>
          </CardBody>
        </Card>

      {/* END OF Stat Cards Grid */}
      </SimpleGrid>

      {/* Space between Stats Grid Row and Table Grid Row */}
      <Box p={15}></Box>


      {/* Tables Grid */}
      <SimpleGrid columns={{ xl: 2 }} spacing="12px">

      <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }} overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader mb="20px" pl="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="xl" color={textColor} fontWeight="bold" ml="20px" mb="6px">
                Blocks
              </Text>
              
              <BlockTable setBlocksCount={setBlocksCount} />
            </Flex>
          </CardHeader>
        </Card>

      <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }} overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader mb="20px" pl="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="xl" color={textColor} fontWeight="bold" ml="20px" mb="6px">
                Transactions
              </Text>
              <TransactionTable setTransactionsCount={setTransactionsCount} />
            </Flex>
          </CardHeader>
        </Card>
      
      { /* END OF Tables Grid */}
    </SimpleGrid>

 

      {/* END OF Container */}
    </Flex>
  );
}
 