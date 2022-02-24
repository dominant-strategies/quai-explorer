import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import {
    GET_TRANSACTION_WITH_ADDRESS,
    GET_TRANSACTION_WITH_ADDRESS_2,
} from '../../utils/queries'
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
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Spinner,
    Flex,
    Alert,
    AlertIcon,
    Box,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton'


import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'

import TransactionsTable from "../../components/TransactionsTable"

import Pagination from '../../components/Pagination'


export default function TransactionTablePage() {
    const navigateTo = useNavigate()
    return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
            <Card
                overflowX={{ sm: "scroll", xl: "hidden" }}
            >
                <CardHeader p="6px 0px 22px 0px">
                    <Flex direction="column" pb=".8rem" pl="1rem">
                        <IconButton
                            onClick={() => navigateTo(-1)}
                            icon={<ArrowBackIcon />}
                            aria-label="Back to the previous page"
                            w="24px"
                        />
                        <Box p={3}> </Box>
                        <Heading as='h1' fontWeight={"bold"} > Transactions </Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                     <TransactionsTable />
                </CardBody>
            </Card>
        </Flex>
    )
}
