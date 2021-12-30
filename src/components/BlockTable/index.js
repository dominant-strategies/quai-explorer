import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Pagination from "../Pagination";
import { BLOCK_TABLE_HEADER, POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { GET_BLOCKS } from "../../utils/queries";
import { reduceString, convertTimeString } from "../../utils";

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
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                                {header}
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                {!loading ? 
                                    <tbody>
                                        {blocks?.map(block => (
                                            <tr className="bg-transparent cursor-pointer border-b transition duration-300 ease-in-out hover:bg-gray-500" onClick={()=>navigate(`/block/${block.hash}`)}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{block.location}</td>
                                                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                                                    {block.number}
                                                </td>
                                                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                                                    {reduceString(block.miner)}
                                                </td>
                                                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">0</td>
                                                <td className="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                                                    {block.timestamp}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody> : <div className="p-4 flex justify-center items-center">Loading ...</div>}
                            </table>
                        </div>
                    </div>
                </div> 
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} setLimit={setLimit} totalPage={totalPage} />
            </div>
        </div>
    )
}
