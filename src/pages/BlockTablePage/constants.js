import { Skeleton, Text } from '@chakra-ui/react'
import Link from '../../components/Link'
import { BLOCK_COLORS, QUAI_STATS_BLOCKS_LINKS } from '../../constants'

export const columns = [
    {
        header: 'Block',
        accessor: ({ hash, number }) => (
            <Text fontSize="md" color="blue.300" fontWeight="bold" pb=".5rem">
                <Link to={`/block/${hash}`}>{number}</Link>
            </Text>
        ),
        wireframe: <Skeleton m="5px" h="10px" w="20%" />,
    },
    {
        header: 'Location',
        accessor: ({ location }) => {
            const locationColor = BLOCK_COLORS[location]
            const linkToQuaiStats = `https://${QUAI_STATS_BLOCKS_LINKS[location]}.quaistats.info/`

            return (
                <Text
                    fontSize="md"
                    color={locationColor}
                    fontWeight="bold"
                    pb=".5rem"
                >
                    <Link href={linkToQuaiStats} isExternal>
                        {' '}
                        {location}{' '}
                    </Link>
                </Text>
            )
        },
        wireframe: <Skeleton m="5px" h="10px" w="30%" />,
    },
    {
        header: 'Age',
        accessor: ({ age, timestamp, textColor }) => (
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                {age} at {timestamp}
            </Text>
        ),
        wireframe: <Skeleton m="5px" h="10px" w="50%" />,
    },
    {
        header: 'Txs',
        accessor: ({ transactions, textColor }) => {
            const txCount = transactions ? transactions.length : 0
            return (
                <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {txCount}
                </Text>
            )
        },
        wireframe: <Skeleton m="5px" h="10px" w="10%" />,
    },
    {
        header: 'Uncles',
        accessor: ({ uncles, textColor }) => {
            const uncleCount = uncles ? uncles.length : 0
            return (
                <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    pb=".5rem"
                >
                    {uncleCount}
                </Text>
            )
        },
        wireframe: <Skeleton m="5px" h="10px" w="10%" />,
    },
    {
        header: 'Miner',
        accessor: ({ miner }) => (
            <Text fontSize="md" color="blue.300" fontWeight="bold" pb=".5rem">
                <Link to={`/address/${miner}`}>{miner}</Link>
            </Text>
        ),
        wireframe: <Skeleton m="5px" h="10px" w="100%" />,
    },
    {
        header: 'Gas Used',
        accessor: ({ gasUsed, textColor }) => (
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                {gasUsed}
            </Text>
        ),
        wireframe: <Skeleton m="5px" h="10px" w="10%" />,
    },
    {
        header: 'Gas Limit',
        accessor: ({ gasLimit, textColor }) => (
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                {gasLimit}
            </Text>
        ),
        wireframe: <Skeleton m="5px" h="10px" w="30%" />,
    },
]
