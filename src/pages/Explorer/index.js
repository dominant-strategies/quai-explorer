import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  HStack,
  SimpleGrid,
  Spacer,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery, useSubscription } from '@apollo/client';

import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import IconBox from "../../components/Icons/IconBox";

import BlocksMiniTable from "../../components/BlocksMiniTable/index.js";
import TransactionsMiniTable from "../../components/TransactionsMiniTable/index.js";

import { BsBox } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";

import { GET_TOTAL_NUMBER_OF_BLOCKS_AND_TRANSACTIONS, GET_TOTAL_NUMBER_OF_BLOCKS_SUBSCRIPTION } from "../../utils/queries.js";

export default function Explorer() {

  const { loading: loadingCounts, error: errorCounts, data: dataCounts } = useQuery(GET_TOTAL_NUMBER_OF_BLOCKS_AND_TRANSACTIONS);
  const { loading: loadingBlockCount, error: errorBlockCount, data: dataBlockCount } = useSubscription(GET_TOTAL_NUMBER_OF_BLOCKS_SUBSCRIPTION)

  const [blocksCount, setBlocksCount] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);

  useEffect(() => {

    if (dataCounts && dataBlockCount) {

      const totalBlockCount = dataBlockCount?.blocks_aggregate?.aggregate?.count;
      const totalTransactionCount = dataCounts?.transactions_aggregate?.aggregate?.count;

      setBlocksCount(totalBlockCount)
      setTransactionsCount(totalTransactionCount)

    }


  }, [dataCounts, dataBlockCount])


  const quaiOrangeColor = useColorModeValue("brand.300", "brand.300");
  const textColor = useColorModeValue("gray.700", "white");

  const blocksCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Blocks </StatLabel>);
  const blocksIcon = (<IconBox h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={BsBox} w="24px" h="24px" color="white" /> </IconBox>);
  const blocksCountSpinner = (<Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='xs' label='Loading block count' />);
  const blocksCountDisplay = (
    <Flex>
      <StatNumber fontSize="lg" color={textColor}>
        {loadingBlockCount ? blocksCountSpinner : blocksCount}
      </StatNumber>
    </Flex>
  );

  const transactionsCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Transactions </StatLabel>);
  const transactionsIcon = (<IconBox h={"45px"} w={"45px"} bg={"green.400"}> <Icon as={GiMoneyStack} w="24px" h="24px" color="white" /> </IconBox>);
  const transactionsCountSpinner = (<Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='xs' label='Loading transactions count' />);
  const transactionsCountDisplay = (
    <Flex>
      <StatNumber fontSize="lg" color={textColor}>
        {loadingCounts ? transactionsCountSpinner : transactionsCount}
      </StatNumber>
    </Flex>
  );

  if (window.innerWidth < 768) {
    return (
      // Container
      <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>

        {/* Stat Cards Grid */}
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">

          {/* Blocks Card */}
          <Card minH="60px">
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
          <Card minH="60px">
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

          {/* END OF Stat Cards Grid */}
        </SimpleGrid>

        {/* Space between Stats Grid Row and Table Grid Row */}
        <Box p={3}></Box>


        {/* Tables Grid */}
        <SimpleGrid spacing="24px" templateRows="1fr 1fr">

          <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }} overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader mb="20px" pl="22px">
              <Flex direction="column" alignSelf="flex-start">
                <BlocksMiniTable />
              </Flex>
            </CardHeader>
          </Card>

          <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }} overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader mb="20px" pl="22px">
              <Flex direction="column" alignSelf="flex-start">
                <TransactionsMiniTable />
              </Flex>
            </CardHeader>
          </Card>

          { /* END OF Tables Grid */}
        </SimpleGrid>

        {/* END OF Container */}
      </Flex>
    );
  }


  return (
    // Container
    <Flex flexDirection="column" pt={{ base: "80px", md: "70px" }}>
      {/* Tables Grid */}
      <SimpleGrid columns={{ xl: 2 }} spacing="12px" templateColumns="1fr 1fr">

        <Card mb={{ sm: "26px", lg: "0px" }} maxH="700px">
          <CardHeader mb="20px" pl="22px">
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              {blocksIcon}
              <Box p={2}></Box>
              <Stat me="auto">
                {blocksCountDisplay}
                {blocksCardHeading}
              </Stat>

            </Flex>
          </CardHeader>

          <CardBody pl={2}>
            <Flex direction="column" alignSelf="flex-start">

              <BlocksMiniTable />
            </Flex>
          </CardBody>
        </Card>

        <Card mb={{ sm: "26px", lg: "0px" }} maxH="700px">
          <CardHeader mb="20px" pl="22px">
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              {transactionsIcon}
              <Box p={2}></Box>
              <Stat me="auto">
                {transactionsCountDisplay}
                {transactionsCardHeading}
              </Stat>
            </Flex>
          </CardHeader>

          <CardBody pl={2}>
            <Flex direction="column" alignSelf="flex-start">

              <TransactionsMiniTable />
            </Flex>
          </CardBody>
        </Card>

        { /* END OF Tables Grid */}
      </SimpleGrid>
      {/* END OF Container */}
    </Flex>
  );
}
