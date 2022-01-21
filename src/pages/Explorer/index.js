import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import BlockTable from '../../components/BlockTable'
import TransactionTable from '../../components/TransactiontTable'
import { GET_BLOCK_WITH_HASH, GET_TRANSACTION_WITH_HASH } from '../../utils/queries';
import { Spinner } from '@chakra-ui/react';

function Explorer() {
    const navigate = useNavigate();
    const [blocksCount, setBlocksCount] = useState(0);
    const [transactionsCount, setTransactionsCount] = useState(0);
    const [searchHash, setSearchHash] = useState("");
    const { loading: loadingBlock, error: errorBlock, data: BlockData, refetch: refetchBlock } = useQuery(GET_BLOCK_WITH_HASH, { variables: { hash: searchHash } });
    const { loading: loadingTransacion, error: errorTransaction, data: TransactionData, refetch: refetchTransaction } = useQuery(GET_TRANSACTION_WITH_HASH, { variables: { hash: searchHash } });

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchHashEvent();
        }
    }

    const searchHashEvent = () => {
        refetchBlock();
        refetchTransaction();
        if (BlockData || TransactionData) {
            console.log({ BlockData, TransactionData })
            if (BlockData?.blocks.length > 0) {
                navigate(`/block/${searchHash}`);
            } else if (TransactionData?.transactions.length > 0) {
                navigate(`/tx/${searchHash}`);
            }

        }
    }

    return (
        <div>
            <div className="bg-wave-pattern bg-cover bg-gray-600 bg-no-repeat flex flex-col justify-center items-center px-10 py-20 relative">
                <h1 className="text-4xl text-white font-semibold mb-8 text-center" >The Quai Network Explorer</h1>
                <div className="flex relative w-full md:w-1/2 justify-center items-center">
                    <input className="px-6 py-3 rounded-md w-full text-gray-600 placeholder:text-gray-600" placeholder="Search Txn Hash/Block" onChange={(e) => setSearchHash(e.target.value)} value={searchHash} onKeyPress={handleKeyPress} />
                    <button className="flex justify-center items-center absolute right-0 bg-gray-300 px-3 rounded-tr-md rounded-br-md h-full" onClick={searchHashEvent}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div className="bg-white w-2/3 rounded-sm px-10 shadow-md grid grid-cols-2 gap-4 md:grid-cols-4 items-center py-3 absolute -bottom-6 text-black">
                    <div className="flex cursor-pointer">
                        Blocks: 
                        {blocksCount != 0 ? <p className="font-semibold ml-2">{blocksCount}</p> : <Spinner m={'2'} size={'xs'} label='Loading block count'/> }
                    </div>
                    <div className="flex cursor-pointer">
                        Transactions:   
                        {transactionsCount != 0 ? <p className="font-semibold ml-2">{transactionsCount}</p> : <Spinner m={'2'} size={'xs'}label='Loading transactions count' /> }
                    </div>
                    <div className="flex cursor-pointer">Hashrate: 0</div>
                    <div className="flex cursor-pointer">Difficulty: 0</div>
                </div>
            </div>
            <div className="py-20 px-20 grid lg:grid-cols-2 gap-4 items-start justify-center grid-cols-1">
                <BlockTable setBlocksCount={setBlocksCount} />
                <TransactionTable setTransactionsCount={setTransactionsCount} />
            </div>
        </div>
    )
}

export default Explorer
