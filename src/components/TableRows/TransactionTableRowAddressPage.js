import {
  Td,
  Text,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { reduceStringShowMediumLength } from "../../utils";
import CopyToClipboardButton from "../CopyToClipboardButton/CopyToClipboardButton";

// converts hexadecimal string with a 0x PREFIX to a integer value
const hexToDec = (value) => {
  return parseInt(value.substring(2), 16)
}

export default function TransactionTableRowAddressPage(props) {
  const { transactionHash, blockNumber, quaiSent, fromThisMiner, toThisMiner, gas, blockHash } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const navigateTo = useNavigate();


  let to_addr = toThisMiner;
  let toHashReduced
  if (to_addr) { toHashReduced = reduceStringShowMediumLength(to_addr); }


  return (
    <Tr>

      {transactionHash !== null ? <Td>
        <CopyToClipboardButton innerText={reduceStringShowMediumLength(transactionHash)} copyThisToClipboard={transactionHash} />
      </Td> : null}

      {to_addr !== null ? <Td>
        <CopyToClipboardButton innerText={toHashReduced} copyThisToClipboard={to_addr} />
      </Td> : null}

      {quaiSent != null && <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {quaiSent}
        </Text>
      </Td>}

      {gas != null && <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {hexToDec(gas)}
        </Text>
      </Td>}


      {blockNumber != null && <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
          {blockNumber}
        </Text>
      </Td>}

      {blockHash !== null ? <Td>
        <CopyToClipboardButton innerText={reduceStringShowMediumLength(blockHash)} copyThisToClipboard={blockHash} />
      </Td> : null}






    </Tr>
  )
}