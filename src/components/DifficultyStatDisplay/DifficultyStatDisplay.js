import React, { useEffect } from "react";
import {  
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Icon,
  Button,
  useColorModeValue 
} from "@chakra-ui/react";
import IconBox from "../../components/Icons/IconBox";
import { FaHardHat } from "react-icons/fa";
import { useQuery, useQueries } from "react-query";
import { GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN } from '../../utils/queries'

import { CHAIN_SLUGS } from "../../constants";

export default function DifficultyStatDisplay(props) {

  const quaiOrangeColor = useColorModeValue("brand.300", "brand.300");
  const textColor = useColorModeValue("gray.700", "white");

  const difficultyValue = 100000;

  const difficultyCardHeading = (<StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem" > Difficulty </StatLabel>);
  const difficultyIcon = (<IconBox as="box" h={"45px"} w={"45px"} bg={quaiOrangeColor}> <Icon as={FaHardHat} w="24px" h="24px" color="white" /> </IconBox>);
  const difficultyValueDisplay = (<Flex> <StatNumber fontSize="lg" color={textColor}> {difficultyValue} </StatNumber> </Flex>);





  const getAllDifficulties = useQueries(
    CHAIN_SLUGS.map((slug, index) => {
      return {
        queryKey: ["slug", `slug-${index}`],
        queryFn: () => async (slug) => {
          const request = await fetch("https://quainetworktest.hasura.app/v1/graphql", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ 
            query: GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN,
            location: slug 
          })
        });
        const result = await request.json();
        console.log( parseInt(result.data?.blocks[0].difficulty[0]) )
        },
      };
    })
  );
  
  

  return (
    <>
      <Flex flexDirection="row" align="center" justify="center" w="100%">
        <Stat me="auto">
          {difficultyCardHeading}
          {difficultyValueDisplay}
        </Stat>
        {difficultyIcon}
        <Button onClick={getAllDifficulties}></Button>
      </Flex>
    </>
  );
}
