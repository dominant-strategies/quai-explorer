import { useQuery } from '@apollo/client'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Alert,
    AlertIcon,
    Box,
    Heading,
    IconButton,
    Link,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton'
import {
    BLOCK_COLORS,
    QUAI_STATS_LINKS,
    SHARDED_ADDRESS,
} from '../../constants'
import { convertTimeString, reduceStringShowMediumLength } from '../../utils'
import { GET_BLOCK_WITH_HASH } from '../../utils/queries'
import Loader from '../../components/Loader'

export default function Block() {
    // Component state
    const [block, setBlock] = useState()
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    // GraphQL queries
    const { hash } = useParams()
    const navigateTo = useNavigate()
    const { loading, error, data } = useQuery(GET_BLOCK_WITH_HASH, {
        variables: { hash },
    })

    // When this component mounts, grab a reference to the block
    useEffect(() => {
        if (hash.length === 66) {
            setBlock(data?.blocks[0])
        } else {
            setShowErrorAlert(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const blockHash = block?.hash
    let blockHashReduced
    if (blockHash) {
        // eslint-disable-next-line no-unused-vars
        blockHashReduced = reduceStringShowMediumLength(blockHash)
    }

    let location = block?.location
    const linkToQuaiStats = `https://${QUAI_STATS_LINKS[location]}.quaistats.info/`

    if (location) {
        location = SHARDED_ADDRESS[location]
    }

    const locationColor = BLOCK_COLORS[location]

    let timestamp = block?.timestamp
    if (timestamp) {
        timestamp = convertTimeString(timestamp)
    }

    const blockNumber = block?.number
    const gasLimit = block?.gas_limit
    const gasUsed = block?.gas_used
    const difficulty = block?.difficulty

    let networkDifficulty = block?.network_difficulty
    if (networkDifficulty) {
        networkDifficulty = parseInt(networkDifficulty, 16)
    }

    const txCount = block?.header.transactions.length
    const uncleCount = block?.header.uncles.length

    const minerAddress = block?.header.miner
    let minerAddressReduced
    if (minerAddress) {
        // eslint-disable-next-line no-unused-vars
        minerAddressReduced = reduceStringShowMediumLength(minerAddress)
    }

    /**
     * Error handling in the event the GQL query fails
     */
    if (error || showErrorAlert) {
        return (
            <>
                {window.innerWidth < 768 ? <Box p={4} /> : null}
                <Box p={10} />
                <IconButton
                    onClick={() => navigateTo(-1)}
                    icon={<ArrowBackIcon />}
                    aria-label="Back to the previous page"
                    w="24px"
                />
                <Alert status="error" mt={7}>
                    <AlertIcon />
                    <Text fontSize="xl">
                        Sorry! There was a problem loading the page. The hash
                        may be invalid.
                    </Text>
                </Alert>
            </>
        )
    }

    return loading ? (
        <Loader label="Loading details for this block" />
    ) : (
        <Card
            mt={{ base: '120px', md: '75px' }}
            overflowX={{ sm: 'scroll', xl: 'hidden' }}
        >
            <CardBody>
                <VStack spacing="12px" align="left">
                    <IconButton
                        onClick={() => navigateTo(-1)}
                        icon={<ArrowBackIcon />}
                        aria-label="Back to the previous page"
                        w="24px"
                    />
                    <Spacer />
                    <Heading as="h2" size="md">
                        {' '}
                        Block Number:{' '}
                    </Heading>{' '}
                    <Text fontSize="lg"> {blockNumber} </Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Location:{' '}
                    </Heading>{' '}
                    <Text
                        fontSize="lg"
                        textColor={locationColor}
                        fontWeight="bold"
                    >
                        {' '}
                        <Link href={linkToQuaiStats} isExternal>
                            {' '}
                            {location}{' '}
                        </Link>{' '}
                    </Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Miner:{' '}
                    </Heading>{' '}
                    <Text
                        fontSize="lg"
                        color="blue.300"
                        fontWeight="bold"
                        pb=".5rem"
                    >
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            onClick={() =>
                                navigateTo(`/address/${minerAddress}`)
                            }
                        >
                            {minerAddress}
                        </Link>
                    </Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Hash:{' '}
                    </Heading>
                    <Text fontSize="lg">
                        {' '}
                        {blockHash}{' '}
                        <CopyToClipboardButton
                            copyThisToClipboard={blockHash}
                            size="xs"
                        />{' '}
                    </Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Number of Txs:{' '}
                    </Heading>
                    <Text fontSize="lg"> {txCount}</Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Number of Uncles:{' '}
                    </Heading>
                    <Text fontSize="lg"> {uncleCount}</Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Timestamp:{' '}
                    </Heading>{' '}
                    <Text fontSize="lg"> {timestamp}</Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Gas Used:{' '}
                    </Heading>{' '}
                    <Text fontSize="lg"> {gasUsed} </Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Gas Limit:{' '}
                    </Heading>{' '}
                    <Text fontSize="lg"> {gasLimit} </Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Difficulty:{' '}
                    </Heading>{' '}
                    <Text fontSize="lg"> {difficulty} </Text>
                    <Heading as="h2" size="md">
                        {' '}
                        Network Difficulty:{' '}
                    </Heading>{' '}
                    <Text fontSize="lg"> {networkDifficulty} </Text>
                </VStack>
            </CardBody>
        </Card>
    )
}
