import { Icon, Skeleton, Text, VStack } from '@chakra-ui/react'
import moment from 'moment'
import { BsBox } from 'react-icons/bs'
import Link from '../../components/Link'
import {
    BLOCK_COLORS_MAPPING_2,
    LINKS_PRESENT,
    QUAI_STATS_LINKS_MAPPING_2,
} from '../../constants'
import {
    convertTimeString,
    reduceStringShowMediumLength,
    toQuai,
} from '../../utils'

export const columns = [
    {
        header: 'TX Hash',
        accessor: ({ hash }) => {
            const transactionHashReduced = hash
                ? reduceStringShowMediumLength(hash)
                : ''
            return (
                <Text
                    fontSize="md"
                    color="blue.300"
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link to={`/tx/${hash}`}>{transactionHashReduced}</Link>
                </Text>
            )
        },
        wireframe: <Skeleton m="5px" h="10px" w="100%" />,
    },
    {
        header: 'Block Number',
        accessor: ({ blockHash, block_number: blockNumber }) => (
            <Text fontSize="md" color="blue.300" fontWeight="bold" pb=".5rem">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link to={`/block/${blockHash}`}>{blockNumber}</Link>
            </Text>
        ),
        wireframe: <Skeleton m="5px" h="10px" w="30%" />,
    },
    {
        header: 'Age',
        accessor: ({ tx_time: timestamp, textColor }) => {
            const differenceOfTime = moment.unix(timestamp).fromNow()

            return (
                <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {differenceOfTime} at {convertTimeString(timestamp)}
                </Text>
            )
        },
        wireframe: (
            <>
                <Skeleton m="5px" h="10px" w="80%" />
                <Skeleton m="5px" h="10px" w="20%" />
            </>
        ),
    },
    {
        header: 'From',
        accessor: ({
            from_location: fromLocation,
            from_addr: fromThisMiner,
            fromAddressPage,
        }) => {
            const fromLocationConverted =
                QUAI_STATS_LINKS_MAPPING_2[fromLocation]
            const linkToQuaiStatsFromLocation = `https://${fromLocationConverted}.quaistats.info/`
            const locationColorFromLocation =
                BLOCK_COLORS_MAPPING_2[fromLocationConverted]
            const fromHashReduced = fromThisMiner
                ? reduceStringShowMediumLength(fromThisMiner)
                : ''

            return (
                <VStack sapcing={2}>
                    {/* TODO need clearfy fromAddressPage this prop. */}
                    {!fromAddressPage && (
                        <Text
                            fontSize="md"
                            color="blue.300"
                            fontWeight="bold"
                            pb=".5rem"
                        >
                            <Link to={`/address/${fromThisMiner}`}>
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
                            <Link href={linkToQuaiStatsFromLocation}>
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
            )
        },
        wireframe: (
            <>
                <Skeleton m="5px" h="10px" w="80%" />
                <Skeleton m="5px" h="10px" w="20%" />
            </>
        ),
    },
    {
        header: 'To',
        accessor: ({ to_addr: toThisMiner, to_location: toLocation }) => {
            const toLocationConverted = QUAI_STATS_LINKS_MAPPING_2[toLocation]
            const locationColorToLocation =
                BLOCK_COLORS_MAPPING_2[toLocationConverted]
            const toHashReduced = toThisMiner
                ? reduceStringShowMediumLength(toThisMiner)
                : ''
            const linkToQuaiStatsToLocation = `https://${toLocationConverted}.quaistats.info/`

            return (
                <VStack spacing={2}>
                    <Text
                        fontSize="md"
                        color="blue.300"
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link to={`/address/${toThisMiner}`}>
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
            )
        },
        wireframe: (
            <>
                <Skeleton m="5px" h="10px" w="80%" />
                <Skeleton m="5px" h="10px" w="20%" />
            </>
        ),
    },
    {
        header: 'Value',
        accessor: ({ tx_value: txValue, textColor }) => {
            const value = toQuai(txValue).toPrecision(4)
            return (
                <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {value} QUAI
                </Text>
            )
        },
        wireframe: <Skeleton m="5px" h="10px" w="70%" />,
    },
]
