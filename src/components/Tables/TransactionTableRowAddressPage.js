import React from "react";
import {
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { reduceString, reduceStringShowMediumLength } from "../../utils";
import { BsThreeDots } from "react-icons/bs"
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CopyToClipboardButton from "../CopyToClipboardButton/CopyToClipboardButton";

// converts hexadecimal string with a 0x PREFIX to a integer value
const hexToDec = (value) => {
  return parseInt(value.substring(2), 16)
}

export default function TransactionTableRowAddressPage(props) {
  const { transactionHash, blockNumber, quaiSent, fromThisMiner, toThisMiner, gas, w } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const navigateTo = useNavigate();

  let from_addr = fromThisMiner
  let fromHashReduced
  let to_addr = toThisMiner;
  let toHashReduced
  if (from_addr) { fromHashReduced = reduceStringShowMediumLength(from_addr); }
  if (to_addr) { toHashReduced = reduceStringShowMediumLength(to_addr); }


  return (
    <Tr maxWidth='50%'>
      <Td>
        <CopyToClipboardButton innerText={reduceString(transactionHash)} copyThisToClipboard={transactionHash} />
      </Td>

      {blockNumber != null && <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {blockNumber}
        </Text>
      </Td> }

      {to_addr !== null ? <Td>
        <CopyToClipboardButton innerText={fromHashReduced} copyThisToClipboard={to_addr} />
      </Td> : null}

      {quaiSent != null && <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {quaiSent}
        </Text>
      </Td> }

      {gas != null && <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {hexToDec(gas)}
        </Text>
      </Td> }



    </Tr>
  )
}