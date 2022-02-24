import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import { GET_TRANSACTION_WITH_HASH } from '../../utils/queries'
import {
    Box,
    Heading,
    Text,
    Spinner,
    IconButton,
    VStack,
    Spacer,
    Alert,
    AlertIcon,
    Link,
} from '@chakra-ui/react'
import { reduceStringShowMediumLength, convertTimeString } from '../../utils'

import { ArrowBackIcon } from '@chakra-ui/icons'
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton'

import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'

export default function Transaction() {
    // Component state
    const [transaction, setTransaction] = useState()
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    // GraphQL queries
    const { hash } = useParams()
    const navigateTo = useNavigate()
    const { loading, error, data } = useQuery(GET_TRANSACTION_WITH_HASH, {
        variables: { hash },
    })

    // When this component mounts, grab a reference to the transaction
    useEffect(() => {
        if (hash.length === 66) {
            setTransaction(data?.transactions[0])
        } else {
            setShowErrorAlert(true)
        }
    }, [data])

    // Transaction details to display
    let transactionHash = transaction?.hash
    let transactionHashReduced
    if (transactionHash) {
        transactionHashReduced = reduceStringShowMediumLength(transactionHash)
    }

    const blockNumber = transaction?.block_number
    const timestamp = transaction?.tx_time

    let from_addr = transaction?.from_addr
    let fromHashReduced
    let to_addr = transaction?.to_addr
    let toHashReduced
    if (from_addr) {
        fromHashReduced = reduceStringShowMediumLength(from_addr)
    }
    if (to_addr) {
        toHashReduced = reduceStringShowMediumLength(to_addr)
    }

    const value = transaction?.tx_value

    /**
     * Error handling in the event the GQL query fails
     */
    if (error || showErrorAlert) {
        console.log(error)
        return (
            <>
                {window.innerWidth < 768 ? <Box p={4}></Box> : null}
                <Box p={10}></Box>
                <IconButton
                    onClick={() => navigateTo(-1)}
                    icon={<ArrowBackIcon />}
                    aria-label="Back to the previous page"
                    w="24px"
                />
                <Alert status="error" mt={7}>
                    <AlertIcon />
                    <Text fontSize="xl">Sorry! There was a problem loading the page. The hash may be invalid.</Text>
                </Alert>
            </>
        )
    }
    return (
        <>
            {loading ? (
                <>
                    <Box p={5}></Box>
                    <Spinner
                        thickness="2px"
                        speed="0.65s"
                        emptyColor="gray.300"
                        color="brand.300"
                        size="xl"
                        ml={5}
                        mt={20}
                        label="Loading details for this transaction"
                    />
                </>
            ) : (
                <Card mt={{ base: '120px', md: '100px' }}>
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
                                Tx Hash:{' '}
                            </Heading>
                            <CopyToClipboardButton
                                innerText={transactionHashReduced}
                                copyThisToClipboard={transactionHash}
                            />
                            {blockNumber != null ? (
                                <>
                                    {' '}
                                    <Heading as="h2" size="md">
                                        {' '}
                                        Block:{' '}
                                    </Heading>{' '}
                                    <Text fontSize="lg">
                                        {' '}
                                        {blockNumber}{' '}
                                    </Text>{' '}
                                </>
                            ) : null}
                            {timestamp !== null ? (
                                <>
                                    {' '}
                                    <Heading as="h2" size="md">
                                        {' '}
                                        Timestamp:{' '}
                                    </Heading>{' '}
                                    <Text fontSize="lg"> {convertTimeString(timestamp)}</Text>{' '}
                                </>
                            ) : null}
                            {from_addr !== null ? (
                                <>
                                    <Heading as="h2" size="md">
                                        {' '}
                                        From:{' '}
                                    </Heading>

                                    <Text fontSize="md" color={"blue.300"} fontWeight="bold" pb=".5rem">

                                        <Link onClick={() => navigateTo(`/address/${from_addr}`)}>
                                            {fromHashReduced}
                                        </Link>
                                    </Text>
                                </>
                            ) : null}
                            {from_addr !== null ? (
                                <>
                                    <Heading as="h2" size="md">
                                        {' '}
                                        To:{' '}
                                    </Heading>
                                    <Text fontSize="md" color={"blue.300"} fontWeight="bold" pb=".5rem">

                                        <Link onClick={() => navigateTo(`/address/${to_addr}`)}>
                                            {toHashReduced}
                                        </Link>

                                    </Text>
                                </>
                            ) : null}
                            <Heading as="h2" size="md">
                                {' '}
                                Value:{' '}
                            </Heading>{' '}
                            <Text fontSize="lg"> {value} </Text>
                        </VStack>
                    </CardBody>
                </Card>
            )}
        </>
    )
}
