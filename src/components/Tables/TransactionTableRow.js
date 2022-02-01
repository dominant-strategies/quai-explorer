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

export default function TransactionTableRow(props) {
  const { transactionHash, toThisMiner, fromThisMiner, blockNumber, quaiSent, timestamp } = props;
  const textColor = useColorModeValue("gray.700", "white");



  return (
    <Tr >

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
        {reduceString(transactionHash)}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
        {reduceString(toThisMiner)}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
        {reduceString(fromThisMiner)}
        </Text>
      </Td>

      
      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {blockNumber}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {quaiSent}
        </Text>
      </Td>

    </Tr>
  );
}