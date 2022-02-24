import React from "react";
import {
  Link,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { convertTimeString, reduceStringShowMediumLength } from "../../utils";
import { BsThreeDots } from "react-icons/bs"
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CopyToClipboardButton from "../CopyToClipboardButton/CopyToClipboardButton";

import { BsBox } from "react-icons/bs";

import moment from 'moment';

import { QUAI_STATS_BLOCKS_LINKS, BLOCK_COLORS, QUAI_STATS_LINKS_MAPPING_2, BLOCK_COLORS_MAPPING_2, LINKS_PRESENT } from '../../constants'

export default function TransactionTableRow(props) {
  const { transactionHash, value, toThisMiner, fromThisMiner, 
    blockNumber, timestamp, blockHash, toLocation, fromLocation } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const navigateTo = useNavigate();

  let toLocationConverted = QUAI_STATS_LINKS_MAPPING_2[toLocation]
  let fromLocationConverted = QUAI_STATS_LINKS_MAPPING_2[fromLocation]

  let linkToQuaiStatsToLocation = `https://${QUAI_STATS_BLOCKS_LINKS[toLocationConverted]}.quaistats.info/`
  let locationColorToLocation = BLOCK_COLORS_MAPPING_2[toLocationConverted];

  let linkToQuaiStatsFromLocation = `https://${QUAI_STATS_BLOCKS_LINKS[fromLocationConverted]}.quaistats.info/`
  let locationColorFromLocation = BLOCK_COLORS_MAPPING_2[fromLocationConverted];



    let transactionHashReduced
    if (transactionHash) {
        transactionHashReduced = reduceStringShowMediumLength(transactionHash)
    }


    let from_addr = fromThisMiner
    let fromHashReduced
    let to_addr = toThisMiner
    let toHashReduced
    if (from_addr) {
        fromHashReduced = reduceStringShowMediumLength(from_addr)
    }
    if (to_addr) {
        toHashReduced = reduceStringShowMediumLength(to_addr)
    }

    let differenceOfTime = moment.unix(timestamp).fromNow();



    return (
      <Tr>

        <Td>
          <Text fontSize="md" color={"blue.300"} fontWeight="bold" pb=".5rem">
            <Link onClick={() => navigateTo(`/tx/${transactionHash}`)}>
              {transactionHashReduced}
            </Link>
          </Text>
        </Td>
  

        <Td>
          <Text fontSize="md" color={"blue.300"} fontWeight="bold" pb=".5rem">
            <Link onClick={() => navigateTo(`/block/${blockHash}`)}>
            {blockNumber}
            </Link>
          </Text>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
           {differenceOfTime} at {convertTimeString(timestamp)} 
          </Text>
        </Td>

        <Td>
            <VStack sapcing={2}>
          <Text fontSize="md" color={"blue.300"} fontWeight="bold" pb=".5rem">
            
            <Link onClick={() => navigateTo(`/address/${fromThisMiner}`)}>
             {fromHashReduced}
            </Link>
          
          </Text>
          <Text fontSize="md" color={locationColorFromLocation} fontWeight="bold" pb=".5rem">
              <Link href={linkToQuaiStatsFromLocation} isExternal> <Icon pt={1} as={BsBox} color={locationColorFromLocation} />  {LINKS_PRESENT[fromLocationConverted]} </Link>
          </Text>
          </VStack>
        </Td>

        <Td>
          <VStack spacing={2}>
          <Text fontSize="md" color={"blue.300"} fontWeight="bold" pb=".5rem">
            
            <Link onClick={() => navigateTo(`/address/${toThisMiner}`)}>
             {toHashReduced}
            </Link>
            
          </Text>
          <Text fontSize="md" color={locationColorToLocation} fontWeight="bold" pb=".5rem">
              <Link href={linkToQuaiStatsToLocation} isExternal>  <Icon pt={1} as={BsBox} color={locationColorToLocation} />  {LINKS_PRESENT[toLocationConverted]} </Link>
          </Text>
          </VStack>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {value}
          </Text>
        </Td>

      </Tr>
    );
}