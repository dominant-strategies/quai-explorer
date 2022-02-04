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
  IconButton,
  Spacer,
  useClipboard
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons"
import { reduceStringShowMore} from "../../utils";
import TransactionDetailsModal from "../TransactionDetailsModal/TransactionDetailsModal";

export default function TransactionTableRow(props) {
  const { transactionHash, blockNumber, quaiSent } = props;
  const textColor = useColorModeValue("gray.700", "white");
  

  return (
    <Tr>
      <Td><TransactionDetailsModal hash={transactionHash} /></Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {reduceStringShowMore(transactionHash)}
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