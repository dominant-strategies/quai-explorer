import {
    Icon,
    Link,
    Td,
    Text,
    Tr,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import moment from 'moment'
import { BsBox } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import {
    BLOCK_COLORS_MAPPING_2,
    LINKS_PRESENT,
    QUAI_STATS_LINKS_MAPPING_2,
} from '../../constants'
import { convertTimeString, reduceStringShowMediumLength } from '../../utils'

export default function TransactionTableRow(props) {
    const {
        transactionHash,
        value,
        // eslint-disable-next-line no-unused-vars
        gweiValue,
        toThisMiner,
        fromThisMiner,
        blockNumber,
        timestamp,
        blockHash,
        toLocation,
        fromLocation,
        fromAddressPage,
    } = props
    const textColor = useColorModeValue('gray.700', 'white')
    const navigateTo = useNavigate()

    const toLocationConverted = QUAI_STATS_LINKS_MAPPING_2[toLocation]
    const fromLocationConverted = QUAI_STATS_LINKS_MAPPING_2[fromLocation]

    const linkToQuaiStatsToLocation = `https://${toLocationConverted}.quaistats.info/`
    const locationColorToLocation = BLOCK_COLORS_MAPPING_2[toLocationConverted]

    const linkToQuaiStatsFromLocation = `https://${fromLocationConverted}.quaistats.info/`
    const locationColorFromLocation =
        BLOCK_COLORS_MAPPING_2[fromLocationConverted]

    let transactionHashReduced
    if (transactionHash) {
        transactionHashReduced = reduceStringShowMediumLength(transactionHash)
    }

    const fromAddr = fromThisMiner
    let fromHashReduced
    const toAddr = toThisMiner
    let toHashReduced
    if (fromAddr) {
        fromHashReduced = reduceStringShowMediumLength(fromAddr)
    }
    if (toAddr) {
        toHashReduced = reduceStringShowMediumLength(toAddr)
    }

    const differenceOfTime = moment.unix(timestamp).fromNow()

    return (
        <Tr>
            <Td>
                <Text
                    fontSize="md"
                    color="blue.300"
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link onClick={() => navigateTo(`/tx/${transactionHash}`)}>
                        {transactionHashReduced}
                    </Link>
                </Text>
            </Td>

            <Td>
                <Text
                    fontSize="md"
                    color="blue.300"
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link onClick={() => navigateTo(`/block/${blockHash}`)}>
                        {blockNumber}
                    </Link>
                </Text>
            </Td>

            <Td>
                <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {differenceOfTime} at {convertTimeString(timestamp)}
                </Text>
            </Td>

            <Td>
                <VStack sapcing={2}>
                    {!fromAddressPage && (
                        <Text
                            fontSize="md"
                            color="blue.300"
                            fontWeight="bold"
                            pb=".5rem"
                        >
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <Link
                                onClick={() =>
                                    navigateTo(`/address/${fromThisMiner}`)
                                }
                            >
                                {fromHashReduced}
                            </Link>
                        </Text>
                    )}

                    {fromLocation !== null && (
                        <Text
                            fontSize="md"
                            color={locationColorFromLocation}
                            fontWeight="bold"
                            pb=".5rem"
                        >
                            <Link href={linkToQuaiStatsFromLocation} isExternal>
                                {' '}
                                <Icon
                                    pt={1}
                                    as={BsBox}
                                    color={locationColorFromLocation}
                                />{' '}
                                {LINKS_PRESENT[fromLocationConverted]}{' '}
                            </Link>
                        </Text>
                    )}
                </VStack>
            </Td>

            <Td>
                <VStack spacing={2}>
                    <Text
                        fontSize="md"
                        color="blue.300"
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            onClick={() =>
                                navigateTo(`/address/${toThisMiner}`)
                            }
                        >
                            {toHashReduced}
                        </Link>
                    </Text>

                    {toLocation !== null && (
                        <Text
                            fontSize="md"
                            color={locationColorToLocation}
                            fontWeight="bold"
                            pb=".5rem"
                        >
                            <Link href={linkToQuaiStatsToLocation} isExternal>
                                {' '}
                                <Icon
                                    pt={1}
                                    as={BsBox}
                                    color={locationColorToLocation}
                                />{' '}
                                {LINKS_PRESENT[toLocationConverted]}{' '}
                            </Link>
                        </Text>
                    )}
                </VStack>
            </Td>

            <Td>
                <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {value} QUAI
                </Text>
            </Td>
        </Tr>
    )
}
