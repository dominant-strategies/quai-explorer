import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import { GET_BLOCK_WITH_HASH } from '../../utils/queries'
import { POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from '../../constants'
import {
    convertTimeString,
    numberWithCommas,
    reduceStringShowMediumLength,
} from '../../utils'
import {
    Spacer,
    Text,
    VStack,
    IconButton,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton'
import axios from 'axios'

import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'

import { CHAIN_SLUGS_2, PORTS, PREFIX } from '../../constants'



// converts hexadecimal string with a 0x PREFIX to a integer value
const hexToDec = (value) => {
    console.log(parseInt(value.substring(2), 16))
    return parseInt(value.substring(2), 16)
}

// chainPort returns the port number for a given chain
const chainPort = (chain) => {
    return PORTS[CHAIN_SLUGS_2.indexOf(chain)]
}

export default function Address() {
    const { hash } = useParams()
    const navigateTo = useNavigate()
    const [balance, setBalance] = useState(0)
    let buttonBackgroundColor = useColorModeValue("white", "gray.600");

    // checking if the address is 20 bytes
    if (hash.length != 42) {
        console.log('Invalid address')
    }

    const addressPrefix = hash.substring(0, 4)
    const numAddressPrefix = hexToDec(addressPrefix)

    const chain = (numAddressPrefix) => {
        var chainName = ''
        for (var key in PREFIX) {
            if (
                PREFIX[key].low <= numAddressPrefix &&
                numAddressPrefix <= PREFIX[key].high
            ) {
                chainName = key
            }
        }
        return chainName
    }

    useEffect(() => {
        const load = async () => {
            var data

            const payload = {
                jsonrpc: 2.0,
                method: 'eth_getBalance',
                params: [hash, 'latest'],
                id: 1,
            }

            try {
                data = await axios.post(
                    'http://45.76.19.78:' + chainPort(chain(numAddressPrefix)),
                    JSON.stringify(payload),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                console.log(balance)
            } catch (err) {
                console.log(err)
            }

            if (balance != null) {
                setBalance(parseInt(data.data.result), 10)
            }
        }
        load()
    })

    return (
        <>
            <Card pt={{ base: '120px', md: '100px' }}>
                <CardBody>
                    <VStack spacing="12px" align="left">
                        <IconButton
                            icon={<ArrowBackIcon />}
                            aria-label="Back to the Explorer home page"
                            h="50px"
                            w="50px"
                            onClick={() => navigateTo('/')}
                            bg={buttonBackgroundColor}
                            position="fixed"
                            variant="no-hover"
                            left="15px"
                            top="35px"
                            borderRadius="30px"
                            boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
                        />
                        <Spacer />
                        <Heading as="h1" size="lg">
                            Address
                        </Heading>{' '}

                        <CopyToClipboardButton innerText={hash} copyThisToClipboard={hash} />

                        <Heading as="h2" size="md">
                            {' '}
                            Balance:{' '}
                        </Heading>{' '}
                        <Text fontSize="lg"> {balance}</Text>
                    </VStack>


                </CardBody>
            </Card>
        </>
    )
}
