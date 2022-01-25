import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import Pagination from "../Pagination";
import { BLOCK_TABLE_HEADER, POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { GET_BLOCKS } from "../../utils/queries";
import { reduceString, convertTimeString } from "../../utils";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function BlockTable({ setBlocksCount }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [blocks, setBlocks] = useState([])
    const { loading, error, data } = useQuery(GET_BLOCKS, { variables: { num: limit, offset: (currentPage - 1) * limit } });
    
    useEffect(() => {
        if (data) {
            const tempBlocks = data?.blocks.map(block=>{
                const miner = block.header.miner[POSITIONS[CHAIN_SLUGS.findIndex((slug)=>slug === block.location)]]
                let unix_timestamp = block.header.timestamp;
                const formattedTime = convertTimeString(unix_timestamp);
                return { ...block.header,
                        location: SHARDED_ADDRESS[block.location],
                        number: block.header.number[POSITIONS[CHAIN_SLUGS.findIndex((slug)=>slug === block.location)]],
                        miner,
                        timestamp: formattedTime
                    } 
            });
            setBlocks(tempBlocks);
            const blocksCount = data?.blocks_aggregate?.aggregate?.count;
            setBlocksCount(blocksCount);
            setTotalPage(parseInt(blocksCount/limit) + 1);
        }
    }, [data])

    if (error) {
        console.log(error)
        return <p>Error</p>;
    }

    return (
        <div>
            {!loading ? 
            <div className="flex flex-col">
                <div className="border border-b-0 rounded-t-lg text-2xl font-bold border-t px-6 py-4 bg-white text-black">
                    <h1>Blocks</h1>
                </div>
                <Table className="border">
                    <Thead className="border-b">
                        <Tr>
                            {BLOCK_TABLE_HEADER?.map(header =>
                                <Th key={header} scope="col" className="text-sm font-semibold px-6 py-4 text-left">
                                    {header}
                                </Th>
                            )}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {blocks?.map((block, index) => (
                            <Tr key={index} className="bg-transparent cursor-pointer border-b transition duration-300 ease-in-out hover:bg-gray-300" onClick={()=>navigate(`/block/${block.hash}`)}>
                                <Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{block.location}</Td>
                                <Td className="text-sm font-medium px-6 py-4 whitespace-nowrap">
                                    {block.number}
                                </Td>
                                <Td className="text-sm font-medium px-6 py-4 whitespace-nowrap">
                                    {reduceString(block.miner)}
                                </Td>
                                <Td className="text-sm font-medium px-6 py-4 whitespace-nowrap">0</Td>
                                <Td className="text-sm font-medium px-6 py-4 whitespace-nowrap">
                                    {block.timestamp}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody> 
                </Table>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} setLimit={setLimit} totalPage={totalPage} />
            </div> : <Spinner size={"xl"} label='Loading the blocks table' /> }
        </div>
    )
}