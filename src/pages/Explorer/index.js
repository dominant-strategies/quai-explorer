import React, { useEffect, useState } from "react";
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

import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import IconBox from "../../components/Icons/IconBox";
import BlockTable from "../../components/BlockTable";
import TransactionTable from "../../components/TransactiontTable";

import { BsBox } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { VscGraph } from "react-icons/vsc";
import { FaHardHat } from "react-icons/fa";

import { useQuery } from '@apollo/client';

import { CHAIN_SLUGS, POSITIONS  } from "../../constants";

import { GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN } from '../../utils/queries'

export default function Explorer() {
  const [blocksCount, setBlocksCount] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);
  const [hashrateValue, setHashrateValue] = useState(0);
  const [difficultyValue, setDifficultyValue] = useState(0);

  const [primeDifficultyValue, setPrimeDifficultyValue] = useState(0);

  const [region1DifficultyValue, setRegion1DifficultyValue] = useState(0);
  const [region2DifficultyValue, setRegion2DifficultyValue] = useState(0);
  const [region3DifficultyValue, setRegion3DifficultyValue] = useState(0);

  const [zone11DifficultyValue, setZone11DifficultyValue] = useState(0);
  const [zone12DifficultyValue, setZone12DifficultyValue] = useState(0);
  const [zone13DifficultyValue, setZone13DifficultyValue] = useState(0);

  const [block, setBlock] = useState();
  const [allValues, setAllValues] = useState([]);


  const quaiOrangeColor = useColorModeValue("brand.300", "brand.300");
  const textColor = useColorModeValue("gray.700", "white");

  const blocksCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Blocks </StatLabel>);
  const blocksIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={BsBox} w="24px" h="24px" color="white" /> </IconBox>);
  const blocksCountSpinner = (<Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='xs' label='Loading block count' />);
  const blocksCountDisplay = (
    <Flex>
      <StatNumber fontSize="lg" color={textColor}>
        {blocksCount !== 0 ? blocksCount : blocksCountSpinner}
      </StatNumber>
    </Flex>
  );

  const transactionsCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Transactions </StatLabel>);
  const transactionsIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={GiMoneyStack} w="24px" h="24px" color="white" /> </IconBox>);
  const transactionsCountSpinner = (<Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='xs' label='Loading transactions count' />);
  const transactionsCountDisplay = (
    <Flex>
      <StatNumber fontSize="lg" color={textColor}>
        {transactionsCount !== 0 ? transactionsCount : transactionsCountSpinner}
      </StatNumber>
    </Flex>
  );

  const hashrateCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Hashrate </StatLabel>);
  const hashrateIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={VscGraph} w="24px" h="24px" color="white" /> </IconBox>);
  const hashrateValueDisplay = (<Flex> <StatNumber fontSize="lg" color={textColor}> {hashrateValue} </StatNumber> </Flex>);

  const difficultyCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Difficulty </StatLabel>);
  const difficultyIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={FaHardHat} w="24px" h="24px" color="white" /> </IconBox>);
  const difficultyValueDisplay = (<Flex> <StatNumber fontSize="lg" color={textColor}> {difficultyValue} </StatNumber> </Flex>);
  
  const { loading: primeLoading, data: primeData } = useQuery(GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN, { variables: { location: "prime" } });

  const { loading: region1Loading, data: region1Data } = useQuery(GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN, { variables: { location: "region-1" } });
  const { loading: region2Loading, data: region2Data } = useQuery(GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN, { variables: { location: "region-2" } });
  const { loading: region3Loading, data: region3Data } = useQuery(GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN, { variables: { location: "region-3" } });

  const { loading: zone11Loading, data: zone11Data } = useQuery(GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN, { variables: { location: "zone-1-1" } });
  const { loading: zone12Loading, data: zone12Data } = useQuery(GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN, { variables: { location: "zone-1-2" } });
  const { loading: zone13Loading, data: zone13Data } = useQuery(GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN, { variables: { location: "zone-1-3" } });

  useEffect(() => {
    //console.log(primeData?.blocks[0]) 
    if(primeData?.blocks[0]){
      var difficultyArray = primeData?.blocks[0].difficulty.split(',');
      let difficultyToAdd = parseInt(difficultyArray[0]);
      setPrimeDifficultyValue( difficultyToAdd);
    }
  } ,[primeData] )

  useEffect(() => {
    //console.log(region1Data?.blocks[0]) 
    if(region1Data?.blocks[0]){
      var difficultyArray = region1Data?.blocks[0].difficulty.split(',');
      let difficultyToAdd = parseInt(difficultyArray[1]);
      setRegion1DifficultyValue( difficultyToAdd);
    }
  } ,[region1Data] )

  useEffect(() => {
    //console.log(region2Data?.blocks[0]) 
    if(region2Data?.blocks[0]){
      var difficultyArray = region2Data?.blocks[0].difficulty.split(',');
      let difficultyToAdd = parseInt(difficultyArray[1]);
      setRegion2DifficultyValue( difficultyToAdd);
    }
  } ,[region2Data] )

  useEffect(() => {
    //console.log(region3Data?.blocks[0]) 
    if(region3Data?.blocks[0]){
      var difficultyArray = region3Data?.blocks[0].difficulty.split(',');
      let difficultyToAdd = parseInt(difficultyArray[1]);
      setRegion3DifficultyValue( difficultyToAdd);
    }
  } ,[region3Data] )

  useEffect(() => {
    console.log("zone11: ", zone11Data?.blocks[0]) 
    if(zone11Data?.blocks[0]){
      var difficultyArray = zone11Data?.blocks[0].difficulty.split(',');
      let difficultyToAdd = parseInt(difficultyArray[2]);
      setZone11DifficultyValue( difficultyToAdd);
    }
  } ,[zone11Data] )

  useEffect(() => {
    console.log("zone12: ",zone12Data?.blocks[0]) 
    if(zone12Data?.blocks[0]){
      var difficultyArray = zone12Data?.blocks[0].difficulty.split(',');
      let difficultyToAdd = parseInt(difficultyArray[2]);
      setZone12DifficultyValue( difficultyToAdd);
    }
  } ,[zone12Data] )

  useEffect(() => {
    console.log("zone13: ",zone13Data?.blocks[0]) 
    if(zone13Data?.blocks[0]){
      var difficultyArray = zone13Data?.blocks[0].difficulty.split(',');
      let difficultyToAdd = parseInt(difficultyArray[2]);
      setZone13DifficultyValue( difficultyToAdd);
    }
  } ,[zone13Data] )
  

  




  return (
    // Container
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>

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
              <Stat me="auto" fontWeight="bold">
                {difficultyCardHeading}
                { primeDifficultyValue + 
                  region1DifficultyValue + region2DifficultyValue + region3DifficultyValue +
                  zone11DifficultyValue + zone12DifficultyValue + zone13DifficultyValue
                }
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
      <SimpleGrid columns={{ xl: 2 }} spacing="12px" templateColumns="1.5fr 1fr">

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
