import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'
import TransactionsTable from '../../components/TransactionsTable'

export default function TransactionsForABlockTablePage() {
    const navigateTo = useNavigate()
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
                            Transactions{' '}
                        </Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <TransactionsTable />
                </CardBody>
            </Card>
        </Flex>
    )
}
