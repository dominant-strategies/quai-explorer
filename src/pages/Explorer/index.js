import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import BlockTable from '../../components/BlockTable'
import TransactionTable from '../../components/TransactiontTable'
import { GET_BLOCK_WITH_HASH, GET_TRANSACTION_WITH_HASH } from '../../utils/queries';

function Explorer() {
    const navigate = useNavigate();
    const [blocksCount, setBlocksCount] = useState(0);
    const [transactionsCount, setTransactionsCount] = useState(0);
    const [searchHash, setSearchHash] = useState("");
    const { loading: loadingBlock, error: errorBlock, data : BlockData, refetch: refetchBlock } = useQuery(GET_BLOCK_WITH_HASH, { variables: { hash: searchHash } });
    const { loading: loadingTransacion, error: errorTransaction, data : TransactionData, refetch: refetchTransaction } = useQuery(GET_TRANSACTION_WITH_HASH, { variables: { hash: searchHash } });
    
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            refetchBlock();
            refetchTransaction();
            if(BlockData || TransactionData) {
                console.log({BlockData, TransactionData})
                if(BlockData?.blocks.length > 0){
                    navigate(`/block/${searchHash}`);
                } else if(TransactionData?.transactions.length > 0) {
                    navigate(`/tx/${searchHash}`);
                }
    
            }
            setSearchHash("");
        }
    }

    return (
        <div>
            <div className="bg-wave-pattern bg-cover bg-gray-600 bg-no-repeat flex flex-col justify-center items-center px-10 py-20 relative">
                <h1 className="text-4xl text-white font-semibold mb-8" >The Quai Network Explorer</h1>
                <input className="px-6 py-3 rounded-md w-1/2 text-gray-600 placeholder:text-gray-600" placeholder="Search Txn Hash/Block" onChange={(e)=>setSearchHash(e.target.value)} value={searchHash} onKeyPress={handleKeyPress} />
                <div className="bg-white w-2/3 rounded-sm px-10 shadow-md flex justify-between items-center py-3 absolute -bottom-6 text-black">
                    <div className="flex">Blocks: <p className="font-semibold ml-2">{blocksCount}</p></div>
                    <div className="flex">Transactions: <p className="font-semibold ml-2">{transactionsCount}</p></div>
                    <div>Hashrate: 0</div>
                    <div>Difficulty: 0</div>
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
