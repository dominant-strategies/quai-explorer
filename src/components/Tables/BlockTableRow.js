import React from "react";
import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  Progress,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { reduceString} from "../../utils";
import BlockDetailsModal from "../BlockDetailsModal/BlockDetailsModal"

export default function BlockTableRow(props) {
  const { location, blockNumber, minerAddress, transactionCount, timestamp, hash} = props;
  const textColor = useColorModeValue("gray.700", "white");



  return (
    <Tr >

     <Td><BlockDetailsModal hash={hash}/></Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {location}
        </Text>
      </Td>

      
      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {blockNumber}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {reduceString(minerAddress)}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {transactionCount}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {timestamp}
        </Text>
      </Td>
      
    </Tr>
  );
}