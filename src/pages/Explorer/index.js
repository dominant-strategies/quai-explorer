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

import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import IconBox from "../../components/Icons/IconBox";
import BlockTable from "../../components/BlockTable";
import TransactionTable from "../../components/TransactiontTable";

import { BsBox } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { FaHardHat } from "react-icons/fa";

export default function Explorer() {
  const [blocksCount, setBlocksCount] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);
  const [hashrateValue, setHashrateValue] = useState(0);
  const [difficultyValue, setDifficultyValue] = useState(0);

  const [block, setBlock] = useState();
  const [allValues, setAllValues] = useState([]);


  const quaiOrangeColor = useColorModeValue("brand.300", "brand.300");
  const textColor = useColorModeValue("gray.700", "white");

  const blocksCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Blocks </StatLabel>);
  const blocksIcon = (<IconBox h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={BsBox} w="24px" h="24px" color="white" /> </IconBox>);
  const blocksCountSpinner = (<Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='xs' label='Loading block count' />);
  const blocksCountDisplay = (
    <Flex>
      <StatNumber fontSize="lg" color={textColor}>
        {blocksCount !== 0 ? blocksCount : blocksCountSpinner}
      </StatNumber>
    </Flex>
  );

  const transactionsCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Transactions </StatLabel>);
  const transactionsIcon = (<IconBox h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={GiMoneyStack} w="24px" h="24px" color="white" /> </IconBox>);
  const transactionsCountSpinner = (<Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='xs' label='Loading transactions count' />);
  const transactionsCountDisplay = (
    <Flex>
      <StatNumber fontSize="lg" color={textColor}>
        {transactionsCount !== 0 ? transactionsCount : transactionsCountSpinner}
      </StatNumber>
    </Flex>
  );

  const difficultyCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Difficulty </StatLabel>);
  const difficultyIcon = (<IconBox h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={FaHardHat} w="24px" h="24px" color="white" /> </IconBox>);
  const difficultyValueDisplay = (<Flex> <StatNumber fontSize="lg" color={textColor}> {difficultyValue} </StatNumber> </Flex>);


  return (
    // Container
    <Flex flexDirection="column" pt={{ base: "120px", md: "100px" }}>

      {/* Stat Cards Grid */}
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">

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

        {/* Difficulty Card  */}
        {/* <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                {difficultyCardHeading}
                {difficultyValueDisplay}
              </Stat>
              {difficultyIcon}
            </Flex>
          </CardBody>
        </Card> */}

        {/* END OF Stat Cards Grid */}
      </SimpleGrid>

      {/* Space between Stats Grid Row and Table Grid Row */}
      <Box p={15}></Box>


      {/* Tables Grid */}
      <SimpleGrid columns={{ xl: 2 }} spacing="12px" templateColumns="1.37fr 1fr">

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
