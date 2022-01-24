import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Pagination from "../Pagination";
import { BLOCK_TABLE_HEADER, POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { GET_BLOCKS } from "../../utils/queries";
import { reduceString, convertTimeString } from "../../utils";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Spinner } from '@chakra-ui/react';

export default function BlockTable({ setBlocksCount }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [blocks, setBlocks] = useState([])
    const { loading, error, data } = useQuery(GET_BLOCKS, { variables: { num: limit, offset: (currentPage - 1) * limit } });
    console.log({loading})
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
                <div className="border border-b-0 rounded-t-lg text-2xl font-semibold border-t px-6 py-4 bg-white text-black">
                    <h1>Blocks</h1>
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full border shadow-lg">
                                <thead className="bg-transparent border-b">
                                    <tr>
                                        {BLOCK_TABLE_HEADER?.map(header =>
                                            <th key={header} scope="col" className="text-sm font-bold px-6 py-4 text-left">
                                                {header}
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                 
                                    <tbody>
                                        {blocks?.map((block, index) => (
                                            <tr key={index} className="bg-transparent cursor-pointer border-b transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black"  onClick={()=>navigate(`/block/${block.hash}`)}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{block.location}</td>
                                                <td className="text-sm px-6 py-4 whitespace-nowrap">
                                                    {block.number}
                                                </td>
                                                <td className="text-sm px-6 py-4 whitespace-nowrap">
                                                    {reduceString(block.miner)}
                                                </td>
                                                <td className="text-sm px-6 py-4 whitespace-nowrap">0</td>
                                                <td className="text-sm px-6 py-4 whitespace-nowrap">
                                                    {block.timestamp}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} setLimit={setLimit} totalPage={totalPage} />
            </div>  : <Spinner size={"xl"} label='Loading the blocks table' />}
        </div>
    )
}
