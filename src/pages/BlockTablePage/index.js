import { useQuery } from '@apollo/client'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Box, Flex, Heading, IconButton, Link, Spinner, Text } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlockTable from "../../components/BlockTable"
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import { SHARDED_ADDRESS } from "../../constants"
import { convertTimeString } from "../../utils"
import { GET_BLOCKS } from "../../utils/queries"



export default function BlockTablePage() {
    const navigateTo = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [blocks, setBlocks] = useState([]);
    const [blocksCountLocal, setBlocksCountLocal] = useState(0);
    const [firstBlockNumber, setFirstBlockNumber] = useState("");
    const [lastBlockNumber, setLastBlockNumber] = useState("");

    const spinnerLabel = "Loading the blocks table";

    const { loading, error, data, refetch: refetchBlocks } = useQuery(GET_BLOCKS, { variables: { fetchPolicy: "cache-and-network", num: limit, offset: (currentPage - 1) * limit } });

    // When this component mounts, grab a reference to all blocks, reformat the object, and set blocks in state
    useEffect(() => {
        refetchBlocks()
        if (data) {
            const tempBlocks = data?.blocks.map(block => {
                const miner = block.header.miner;
                let unix_timestamp = block.timestamp;
                let converted_unix_timestamp = convertTimeString(unix_timestamp)
                let differenceOfTime = moment.unix(unix_timestamp).fromNow();

                let transactions = block.header.transactions
                let uncles = block.header.uncles

                return {
                    ...block.header,
                    location: SHARDED_ADDRESS[block.location],
                    number: block.number,
                    miner,
                    age: differenceOfTime,
                    timestamp: converted_unix_timestamp,
                    gasLimit: block.gas_limit,
                    gasUsed: block.gas_used,
                    transactions,
                    uncles
                }
            });
            setBlocks(tempBlocks);
            setFirstBlockNumber(tempBlocks[0].number)
            setLastBlockNumber(tempBlocks[tempBlocks.length - 1].number)
            const blocksCount = data?.blocks_aggregate?.aggregate?.count;
            setBlocksCountLocal(blocksCount);
            setTotalPage(parseInt(blocksCount / limit) + 1);
        }
    }, [data])

    /**
   * Error handling in the event the GQL query fails
   * Shows an alert
   */
    if (error) {
        console.log(error)
        return (
            <>
                <Alert status='error' mt={5} >
                    <AlertIcon />
                    <Text fontSize='md'> Sorry! There seems to be a problem with loading this table. Please try to <Link bgColor="transparent" size="sm" textColor="blue.300" fontWeight="bold" onClick={() => window.location.reload()}> refresh the page. </Link></Text>
                </Alert>
            </>
        )
    }

    return (
        <>
            {!loading ?
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
                                <Heading as='h1' fontWeight={"bold"} > Blocks </Heading>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <BlockTable
                                blocks={blocks}
                                limit={limit}
                                totalPage={totalPage}
                                currentPage={currentPage}
                                blocksCountLocal={blocksCountLocal}
                                firstBlockNumber={firstBlockNumber}
                                lastBlockNumber={lastBlockNumber}
                                setCurrentPage={setCurrentPage}
                                setLimit={setLimit}
                            />
                        </CardBody>
                    </Card>
                </Flex> : <Spinner thickness='2px' speed='0.65s' emptyColor='gray.300' color='brand.300' size='md' ml={4} mt={2} label={spinnerLabel} />}
        </>
    )
}
