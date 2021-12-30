import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_BLOCK_WITH_HASH } from "../../utils/queries";
import { POSITIONS, CHAIN_SLUGS, SHARDED_ADDRESS } from "../../constants";
import { convertTimeString, numberWithCommas } from '../../utils';

function Block() {
    const { hash } = useParams();
    const [block, setBlock] = useState();
    const [position, setPosition] = useState();
    const { loading, error, data } = useQuery(GET_BLOCK_WITH_HASH, { variables: { hash } });
    useEffect(()=> {
        setBlock(data?.blocks[0]);
        setPosition(POSITIONS[CHAIN_SLUGS.findIndex((slug)=>slug === data?.blocks[0]?.location)]);
    }, [data])

    return (
        <div className="p-10 ">
            <h1 className="border-b pb-3 border-gray-500 font-semibold text-3xl">Block Details</h1>
            <div className="my-8 p-8 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                {loading ? <div className="p-4 flex justify-center items-center">Loading ...</div> : 
                <div>
                    <div className="flex my-4">
                        <p className="w-1/4">Block Height:</p>
                        <p>{block?.header.number[position]}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Location:</p>
                        <p>{SHARDED_ADDRESS[block?.location]}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Hash:</p>
                        <p>{block?.hash}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Timestamp:</p>
                        <p>{convertTimeString(block?.timestamp)}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Gas Used:</p>
                        <p>{block?.header?.gasUsed[position]}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Gas Limit:</p>
                        <p>{block?.header?.gasLimit[position]}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Difficulty:</p>
                        <p>{numberWithCommas(block?.header?.difficulty[position])}</p>
                    </div>
                    <div className="flex my-4">
                        <p className="w-1/4">Network Difficulty:</p>
                        <p>{numberWithCommas(block?.header?.networkDifficulty[position])}</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Block
