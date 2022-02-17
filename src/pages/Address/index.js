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
    Box,
    Spacer,
    Spinner,
    Text,
    VStack,
    IconButton,
    Heading,
    Button,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton'
import axios from 'axios'

import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'

const chainSlugs = [
    'prime',
    'region1',
    'region2',
    'region3',
    'zone11',
    'zone12',
    'zone13',
    'zone21',
    'zone22',
    'zone23',
    'zone31',
    'zone32',
    'zone33',
]

const ports = [
    '8546',
    '8578',
    '8580',
    '8582',
    '8610',
    '8642',
    '8674',
    '8612',
    '8644',
    '8676',
    '8614',
    '8646',
    '8678',
]

// prefix - low and high for a valid address in a given chain
const prefix = {
    prime: {
        low: 0x00,
        high: 0x09,
    },
    region1: {
        low: 0x0a,
        high: 0x13,
    },
    region2: {
        low: 0x14,
        high: 0x1d,
    },
    region3: {
        low: 0x1e,
        high: 0x27,
    },
    zone11: {
        low: 0x28,
        high: 0x31,
    },
    zone12: {
        low: 0x32,
        high: 0x3b,
    },
    zone13: {
        low: 0x3c,
        high: 0x45,
    },
    zone21: {
        low: 0x46,
        high: 0x4f,
    },
    zone22: {
        low: 0x50,
        high: 0x59,
    },
    zone23: {
        low: 0x5a,
        high: 0x63,
    },
    zone31: {
        low: 0x64,
        high: 0x6d,
    },
    zone32: {
        low: 0x6e,
        high: 0x77,
    },
    zone33: {
        low: 0x6e,
        high: 0x81,
    },
}

// converts hexadecimal string with a 0x prefix to a integer value
const hexToDec = (value) => {
    console.log(parseInt(value.substring(2), 16))
    return parseInt(value.substring(2), 16)
}

// chainPort returns the port number for a given chain
const chainPort = (chain) => {
    return ports[chainSlugs.indexOf(chain)]
}

export default function Address() {
    const { hash } = useParams()
    const navigateTo = useNavigate()
    const [balance, setBalance] = useState(0)

    // checking if the address is 20 bytes
    if (hash.length != 42) {
        console.log('Invalid address')
    }

    const addressPrefix = hash.substring(0, 4)
    console.log(addressPrefix)
    const numAddressPrefix = hexToDec(addressPrefix)

    const chain = (numAddressPrefix) => {
        var chainName
        for (const key in prefix) {
            console.log(prefix[key].low, prefix[key].high, numAddressPrefix)
            if (
                hexToDec(prefix[key].low) <=
                numAddressPrefix <=
                hexToDec(prefix[key].high)
            ) {
                chainName = key
            }
        }
        return chainName
    }
    console.log(chainPort(chain(numAddressPrefix)))

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
                            onClick={() => navigateTo('/')}
                            icon={<ArrowBackIcon />}
                            aria-label="Back to the Explorer home page"
                            w="24px"
                        />
                        <Spacer />
                        <Heading as="h2" size="md">
                            {' '}
                            Hash: {hash}{' '}
                        </Heading>
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
