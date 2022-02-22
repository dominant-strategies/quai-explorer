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

import BlockTable from "../../components/BlockTable"

import Pagination from '../../components/Pagination'


export default function BlockTablePage() {

    const navigateTo = useNavigate()


    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalPage, setTotalPage] = useState(1)
    const [blocks, setblocks] = useState([])
    const [blocksCount, setblocksCount] = useState(0)

    const textColor = useColorModeValue('gray.700', 'white')



    return (
        <>
            <Card
                mt={{ base: '120px', md: '100px' }}
                overflowX={{ sm: 'scroll', xl: 'hidden' }}
            >
                <CardBody>
                        <IconButton
                            onClick={() => navigateTo('/')}
                            icon={<ArrowBackIcon />}
                            aria-label="Back to the Explorer home page"
                            w="24px"
                        />

                </CardBody>
            </Card>

            <Spacer />

            <Card mt={35} pt={10} overflowX={{ sm: 'scroll', xl: 'hidden' }}>
                <CardHeader mb="20px" pl="2px" pt="10px">
                        <Heading
                            as="h1"
                            fontSize="3xl"
                            color={textColor}
                            fontWeight="bold"
                        >
                            Blocks
                        </Heading>
                </CardHeader>


                <CardBody>
                    <Flex flexDirection="column">
                        <BlockTable />

                        <Flex>
                            {totalPage > 1 ? (
                                <Pagination
                                    currentPage={currentPage}
                                    totalCount={
                                        blocksCount != 0
                                            ? blocksCount
                                            : 0
                                    }
                                    pageSize={limit}
                                    onPageChange={(page) =>
                                        setCurrentPage(page)
                                    }
                                    textColor={textColor}
                                />
                            ) : null}
                        </Flex>
                    </Flex>
                </CardBody>

            </Card>
        </>
    )

}
