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

import { BsArrowRight, BsBox } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { VscGraph } from "react-icons/vsc";
import { FaHardHat } from "react-icons/fa";
import leavesImage from "../../assets/images/leaves.png";

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

  // Build UI

  // Blocks Card Assets 
  const blocksCardHeading = ( <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Blocks </StatLabel> );
  const blocksIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={BsBox} w="24px" h="24px" color="white"/> </IconBox>);
  const loadingBlockCountA11yLabel = 'Loading block count';
  const blocksCountDisplay = ( 
    <Flex> 
      <StatNumber fontSize="lg" color={textColor}> 
        {blocksCount !== 0 ? blocksCount : <Spinner m={'2'} size={'xs'} label={loadingBlockCountA11yLabel} />} 
      </StatNumber> 
    </Flex> 
  );

  // Transactions Card Assets
  const transactionsCardHeading = ( <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Transactions </StatLabel> );
  const transactionsIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={GiMoneyStack} w="24px" h="24px" color="white"/> </IconBox>);
  const loadingTransactionsCountA11yLabel = 'Loading transactions count';
  const transactionsCountDisplay = ( 
    <Flex> 
      <StatNumber fontSize="lg" color={textColor}> 
        {transactionsCount !== 0 ? transactionsCount : <Spinner m={'2'} size={'xs'} label={loadingTransactionsCountA11yLabel} />} 
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
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        
        {/* Blocks Table */}
        <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
          <CardHeader mb="20px" pl="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                Table can go here
              </Text>
              <Text fontSize="md" fontWeight="medium" color="gray.400">
                This can be the place for the blocks table
              </Text>
              <BlockTable setBlocksCount={setBlocksCount} />
            </Flex>
          </CardHeader>
          <Box w="100%" h={{ sm: "300px" }} ps="8px">

          </Box>
        </Card>

        {/* Transactions Table */}
        <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
          <CardHeader mb="20px" pl="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                Table can go here
              </Text>
              <Text fontSize="md" fontWeight="medium" color="gray.400">
                This can be the place for the transactions table
              </Text>
              <TransactionTable setTransactionsCount={setTransactionsCount} />
            </Flex>
          </CardHeader>
          <Box w="100%" h={{ sm: "300px" }} ps="8px">

          </Box>
        </Card>

      {/* END OF Tables Grid */}
      </Grid>

      {/* Next Row Grid with Dummy Cards */}
      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <Card minHeight="290.5px" p="1.2rem">
          <CardBody w="100%">
            <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%">
              <Flex
                flexDirection="column"
                h="100%"
                lineHeight="1.6"
                width={{ lg: "45%" }}
              >
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  Built for Quai Network
                </Text>
                <Text
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                  pb=".5rem"
                >
                  Explorer Dashboard
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  This explorer dashboard interface will provide network details.
                </Text>
                <Spacer />
                
              </Flex>
              <Spacer />
              <Flex
                bg="orange.300"
                align="center"
                justify="center"
                borderRadius="15px"
                width={{ lg: "40%" }}
                minHeight={{ sm: "250px" }}
              >
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card maxHeight="290.5px" p="1rem">
          <CardBody
            p="0px"
            backgroundImage={leavesImage}
            bgPosition="center"
            bgRepeat="no-repeat"
            w="100%"
            h={{ sm: "200px", lg: "100%" }}
            bgSize="cover"
            position="relative"
            borderRadius="15px"
          >
            <Box
              bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
              w="100%"
              position="absolute"
              h="inherit"
              borderRadius="inherit"
              ref={overlayRef}
            ></Box>
            <Portal containerRef={overlayRef}>
              <Flex
                flexDirection="column"
                color="white"
                p="1.5rem 1.2rem 0.3rem 1.2rem"
                lineHeight="1.6"
              >
                <Text fontSize="xl" fontWeight="bold" pb=".3rem">
                  Card Info
                </Text>
                <Text fontSize="sm" fontWeight="normal" w={{ lg: "92%" }}>
                  This card can be used to display some information for the Quai Explorer.
                </Text>
                <Spacer />
                
              </Flex>
            </Portal>
          </CardBody>
        </Card>

        {/* END OF Dummy Row Card Grid */}
      </Grid>

      {/* END OF Container */}
    </Flex>
  );
}
