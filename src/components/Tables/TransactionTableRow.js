import React from "react";
import {
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { reduceString } from "../../utils";
import { BsThreeDots } from "react-icons/bs"
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CopyToClipboardButton from "../CopyToClipboardButton/CopyToClipboardButton";

export default function TransactionTableRow(props) {
  const { transactionHash, blockNumber, quaiSent } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const navigateTo = useNavigate();

  if (window.innerWidth > 768) {
    return (
      <Tr>

        <Td>
          <CopyToClipboardButton innerText={reduceString(transactionHash)} copyThisToClipboard={transactionHash} />
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

        <Td>
          <IconButton onClick={() => navigateTo(`/tx/${transactionHash}`)} cursor="pointer" icon={<Icon as={BsThreeDots} />} />
        </Td>

      </Tr>
    );
  }
  else {
    return (
      <Tr>

        <Td>
          <IconButton onClick={() => navigateTo(`/tx/${transactionHash}`)} cursor="pointer" icon={<InfoOutlineIcon />} />
        </Td>

        <Td>
          <CopyToClipboardButton innerText={reduceString(transactionHash)} copyThisToClipboard={transactionHash} />
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
}