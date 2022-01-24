import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import BlockTable from '../../components/BlockTable'
import TransactionTable from '../../components/TransactiontTable'
import { GET_BLOCK_WITH_HASH, GET_TRANSACTION_WITH_HASH } from '../../utils/queries';
import {
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    Box
} from '@chakra-ui/react';

function Explorer() {
    const navigateTo = useNavigate();
    
    const [blocksCount, setBlocksCount] = useState(0);
    const [transactionsCount, setTransactionsCount] = useState(0);
    const [hashrateValue, setHashrateValue] = useState(0);
    const [difficultyValue, setDifficultyValue] = useState(0);
    
    const [searchHash, setSearchHash] = useState("");
    
    // GraphQL queries
    const { data: BlockData, refetch: refetchBlockData } = useQuery(GET_BLOCK_WITH_HASH, { variables: { hash: searchHash } });
    const { data: TransactionData, refetch: refetchTransactionData } = useQuery(GET_TRANSACTION_WITH_HASH, { variables: { hash: searchHash } });

    /**
     * Given a block/transaction hash, this handles navigating to the deatils page of the hash
     * The searchHash is stored in the component's state
     */
    const searchHashEvent = () => {
        refetchBlockData();
        refetchTransactionData();
        if (BlockData || TransactionData) {
            console.log({ BlockData, TransactionData })
            if (BlockData?.blocks.length > 0) {
                navigateTo(`/block/${searchHash}`);
            } else if (TransactionData?.transactions.length > 0) {
                navigateTo(`/tx/${searchHash}`);
            }
        }
    }

    /**
     * Handles tapping 'Enter' in the search input
     * Navigates to the details page for the block/transaction that is searched for 
     * @param {*} event - key press
     */
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchHashEvent();
        }
    }

    return (
        <div>
            <div className="bg-wave-pattern bg-cover bg-gray-600 bg-no-repeat flex flex-col justify-center items-center px-10 py-20 relative">

                {/* Header */}
                <h1 className="text-4xl text-white font-semibold mb-8 text-center" >The Quai Network Explorer</h1>
                
                {/* Input to search by transaction hash or block */}
                <div className="flex relative w-full md:w-1/2 justify-center items-center">
                    <input className="px-6 py-3 rounded-md w-full text-gray-600 placeholder:text-gray-600" placeholder="Search by Txn Hash/Block" onChange={(e) => setSearchHash(e.target.value)} value={searchHash} onKeyPress={handleKeyPress} />
                    <button className="flex justify-center items-center absolute right-0 bg-gray-300 px-3 rounded-tr-md rounded-br-md h-full" onClick={searchHashEvent}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Spacing between input and stats card */}
                <Box p={8}></Box>

                {/* Stats card */}
                <div className="bg-white w-2/3 rounded-sm px-10 shadow-md grid grid-cols-2 gap-4 md:grid-cols-4 items-center py-3 absolute -bottom-6 text-black">
                    <Stat>
                        <StatLabel>Blocks</StatLabel>
                        <StatNumber>{blocksCount != 0 ? blocksCount : <Spinner m={'2'} size={'sm'} label='Loading block count' />}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Transactions</StatLabel>
                        <StatNumber>{transactionsCount != 0 ? transactionsCount : <Spinner m={'2'} size={'sm'} label='Loading transactions count' />}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Hashrate</StatLabel>
                        <StatNumber>{hashrateValue}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Difficulty</StatLabel>
                        <StatNumber>{difficultyValue}</StatNumber>
                    </Stat>
                </div>

            </div>

            {/* Tables - Blocks and Transactions */}
            <div className="py-20 px-20 grid lg:grid-cols-2 gap-4 items-start justify-center grid-cols-1">
                <BlockTable setBlocksCount={setBlocksCount} />
                <TransactionTable setTransactionsCount={setTransactionsCount} />
            </div>

        </div>
    )
}

export default Explorer
