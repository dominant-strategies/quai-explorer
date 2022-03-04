import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Box, Flex, Heading, IconButton
} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlockTable from "../../components/BlockTable"
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CardHeader from '../../components/Card/CardHeader'

export default function BlockTablePage() {
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
                        <Heading as='h1' fontWeight={"bold"} > Blocks </Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <BlockTable />
                </CardBody>
            </Card>
        </Flex>
    )
}
