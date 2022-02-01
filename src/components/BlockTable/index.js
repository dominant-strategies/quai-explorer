import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Pagination from "../Pagination";
import { BLOCK_TABLE_HEADER, POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { GET_BLOCKS } from "../../utils/queries";
import { reduceString, convertTimeString } from "../../utils";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Spinner
} from '@chakra-ui/react';

export default function BlockTable({ setBlocksCount }) {
    // Component state
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [blocks, setBlocks] = useState([]);

    // GraphQL queries
    const { loading, error, data } = useQuery(GET_BLOCKS, { variables: { num: limit, offset: (currentPage - 1) * limit } });

    // Other hooks
    // const navigateTo = useNavigate();

    // When this component mounts, grab a reference to all blocks, reformat the object, and set blocks in state
    useEffect(() => {
        if (data) {
            const tempBlocks = data?.blocks.map(block => {
                const miner = block.header.miner[POSITIONS[CHAIN_SLUGS.findIndex((slug) => slug === block.location)]]
                let unix_timestamp = block.header.timestamp;
                const formattedTime = convertTimeString(unix_timestamp);
                return {
                    ...block.header,
                    location: SHARDED_ADDRESS[block.location],
                    number: block.header.number[POSITIONS[CHAIN_SLUGS.findIndex((slug) => slug === block.location)]],
                    miner,
                    timestamp: formattedTime
                }
            });
            setBlocks(tempBlocks);
            const blocksCount = data?.blocks_aggregate?.aggregate?.count;
            setBlocksCount(blocksCount);
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
            <Alert
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='400px'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Unexpected Error
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    We sincerely apologize for any inconvenience this may cause
                </AlertDescription>
            </Alert>
        )
    }

    // empty table
    // new table will be written using chakra ui
    return (
        <div>
            
        </div>
    )
}
