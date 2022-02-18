import React from "react";
import {
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { reduceString } from "../../utils";
import { BsThreeDots } from "react-icons/bs"
import { InfoOutlineIcon } from "@chakra-ui/icons";

import CopyToClipboardButton from "../CopyToClipboardButton/CopyToClipboardButton";

export default function BlockTableRow(props) {
  const { location, blockNumber, minerAddress, transactionCount, timestamp, hash } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const navigateTo = useNavigate(); 

  if(window.innerWidth > 768 ) {
    return (
      <Tr>
        
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
          <CopyToClipboardButton innerText={reduceString(minerAddress)} copyThisToClipboard={minerAddress} />
        </Td>
  
        
  
        <Td>
          <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
            {timestamp}
          </Text>
        </Td>
  
        <Td>
          <IconButton onClick={() => navigateTo(`/block/${hash}`)} cursor="pointer" icon={<Icon as={BsThreeDots} />} />
        </Td>
  
      </Tr>
    );
  }

  else {
    return (
      <Tr>

        <Td>
          <IconButton onClick={() => navigateTo(`/block/${hash}`)} cursor="pointer" icon={<InfoOutlineIcon />} />
        </Td>
        
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
          <CopyToClipboardButton innerText={reduceString(minerAddress)} copyThisToClipboard={minerAddress} />
        </Td>
  
       
  
        <Td>
          <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".5rem">
            {timestamp}
          </Text>
        </Td>
  
        
  
      </Tr>
    );
  }
  
}