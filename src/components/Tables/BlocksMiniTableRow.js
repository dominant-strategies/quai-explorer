import React from 'react'
import {
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Button,
  Link,
  VStack,
  Stack,
  HStack

} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { reduceString, reduceStringShowMediumLength } from '../../utils'
import { BsBox } from "react-icons/bs";
import { BLOCK_COLORS } from "../../constants"

export default function BlocksMiniTableRow(props) {

  const {
    blockNumber, minerAddress, timestamp,
    hash, location, numberOfTxs, txHash,
    fromAddy, toAddy, value
  } = props

  const textColor = useColorModeValue('gray.700', 'white')
  let locationColor = BLOCK_COLORS[location];


  const navigateTo = useNavigate()

  let hashReduced
  if (hash) {
    hashReduced = reduceStringShowMediumLength(hash)
  }

  let minerAddressReduced
  if (minerAddress) {
    minerAddressReduced = reduceString(minerAddress)
  }




  return (
    <Tr>

      <Td>
        <HStack>
          <Icon as={BsBox} color={locationColor} />
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
          >
            {location}
          </Text>
        </HStack>

      </Td>


      <Td>
    
        <VStack alignItems="left" spacing={0}>
        <Link onClick={() => navigateTo(`/block/${hash}`)}>
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"

            >
              {blockNumber} 
            </Text>
            </Link>

        


          <Text
            fontSize="sm"
            color={'gray.500'}

          >
            {timestamp}
          </Text>
        </VStack>

      </Td>

      <Td>
        <VStack alignItems="left" spacing={0}>
          <Link onClick={() => navigateTo(`/block/${hash}`)}>
            <Text
              fontSize="md"
              color={"blue.300"}
              fontWeight="bold"
              as="u"


            >
              {hashReduced}
            </Text>
          </Link>



        </VStack>

      </Td>

    </Tr>
  )

}
