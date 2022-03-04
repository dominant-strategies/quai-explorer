import {
  HStack, Icon, Link, Td,
  Text,
  Tr,
  useColorModeValue, VStack
} from '@chakra-ui/react';
import React from 'react';
import { BsBox } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BLOCK_COLORS } from "../../constants";
import { reduceStringShowMediumLength } from '../../utils';

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
    minerAddressReduced = reduceStringShowMediumLength(minerAddress)
  }

  return (
    <Tr>



      <Td>

        <VStack alignItems="left" spacing={0}>
          <Link onClick={() => navigateTo(`/block/${hash}`)}>
            <Text
              fontSize="md"
              color={"blue.300"}
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
        <HStack>
          <Icon as={BsBox} color={locationColor} />
          <Text
            fontSize="md"
            color={locationColor}
            fontWeight="bold"
          >
            {location}
          </Text>
        </HStack>

      </Td>


      <Td>
        <VStack alignItems="left" spacing={0}>

          <Text
            fontSize="sm"
            color={'gray.500'}

          >
            Miner:
          </Text>

          <Text
            fontSize="md"
            color={"blue.300"}
            fontWeight="bold"

          >
            <Link onClick={() => navigateTo(`/address/${minerAddress}`)}>
              {minerAddressReduced}
            </Link>
          </Text>



        </VStack>

      </Td>

    </Tr>
  )

}
