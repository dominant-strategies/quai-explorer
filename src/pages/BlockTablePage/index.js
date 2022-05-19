import { useQuery } from '@apollo/client'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    Heading,
    IconButton,
    Link,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import { SHARDED_ADDRESS } from '../../constants'
import { convertTimeString } from '../../utils'
import { GET_BLOCKS } from '../../utils/queries'
import ChakraTable from '../../components/ChakraTable'
import { columns } from './constants'

export default function BlockTablePage() {
    const navigateTo = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [blocks, setBlocks] = useState([])
    const [blocksCountLocal, setBlocksCountLocal] = useState(0)
    const [firstBlockNumber, setFirstBlockNumber] = useState('')
    const [lastBlockNumber, setLastBlockNumber] = useState('')
    const tableColor = useColorModeValue('gray.700', 'white')
    const limit = 10

    const {
        loading,
        error,
        data,
        refetch: refetchBlocks,
    } = useQuery(GET_BLOCKS, {
        variables: {
            fetchPolicy: 'cache-and-network',
            num: limit,
            offset: (currentPage - 1) * limit,
        },
    })

    // When this component mounts, grab a reference to all blocks, reformat the object, and set blocks in state
    useEffect(() => {
        refetchBlocks()
        if (data) {
            const tempBlocks = data?.blocks.map((block) => {
                const { miner } = block.header
                const unixTimestamp = block.timestamp
                const convertedUnixTimestamp = convertTimeString(unixTimestamp)
                const differenceOfTime = moment.unix(unixTimestamp).fromNow()

                const { transactions } = block.header
                const { uncles } = block.header

                return {
                    ...block.header,
                    location: SHARDED_ADDRESS[block.location],
                    number: block.number,
                    miner,
                    age: differenceOfTime,
                    timestamp: convertedUnixTimestamp,
                    gasLimit: block.gas_limit,
                    gasUsed: block.gas_used,
                    transactions,
                    uncles,
                }
            })
            setBlocks(tempBlocks)
            setFirstBlockNumber(tempBlocks[0].number)
            setLastBlockNumber(tempBlocks[tempBlocks.length - 1].number)
            const blocksCount = data?.blocks_aggregate?.aggregate?.count
            setBlocksCountLocal(blocksCount)
            setTotalPage(parseInt(blocksCount / limit, 10) + 1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    /**
     * Error handling in the event the GQL query fails
     * Shows an alert
     */
    if (error) {
        console.log(error)
        return (
            <Alert status="error" mt={5}>
                <AlertIcon />
                <Text fontSize="md">
                    {' '}
                    Sorry! There seems to be a problem with loading this table.
                    Please try to{' '}
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        bgColor="transparent"
                        size="sm"
                        textColor="blue.300"
                        fontWeight="bold"
                        onClick={() => window.location.reload()}
                    >
                        {' '}
                        refresh the page.{' '}
                    </Link>
                </Text>
            </Alert>
        )
    }

    return (
        <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
            <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
                <CardHeader p="6px 0px 22px 0px">
                    <Flex direction="column" pb=".8rem" pl="1rem">
                        <IconButton
                            onClick={() => navigateTo(-1)}
                            icon={<ArrowBackIcon />}
                            aria-label="Back to the previous page"
                            w="24px"
                        />
                        <Box p={3}> </Box>
                        <Heading as="h1" fontWeight="bold">
                            {' '}
                            Blocks{' '}
                        </Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <ChakraTable
                        headerText={`Block ${firstBlockNumber} to Block ${lastBlockNumber} of ${blocksCountLocal} blocks`}
                        tableColor={tableColor}
                        columns={columns}
                        data={blocks}
                        rowProps={{ textColor: tableColor }}
                        currentPage={currentPage}
                        totalCount={
                            blocksCountLocal !== 0 ? blocksCountLocal : 0
                        }
                        pageSize={limit}
                        onPageChange={(page) => setCurrentPage(page)}
                        totalPage={totalPage}
                        wireframe={loading}
                        wireframeRows={10}
                    />
                </CardBody>
            </Card>
        </Flex>
    )
}
