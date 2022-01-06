import React, { useState } from 'react'
import { CHAIN_SLUGS } from '../../constants/';

function NetworkStats() {
    const [chain, setChain] = useState(CHAIN_SLUGS[0]);
    return (
        <div>
            <div className="flex w-full justify-between bg-gray-600 shadow-lg">
                {CHAIN_SLUGS.map(slug => <div className={`cursor-pointer py-4 px-4 hover:bg-gray-500 ${chain === slug  && 'bg-gray-500 border-b border-white'}`} onClick={()=>setChain(slug)}>{slug.toUpperCase()}</div>)}
            </div>
            <div className="p-8">
                <h1 className="text-3xl">{chain.toUpperCase()}</h1>
            </div>
        </div>
    )
}

export default NetworkStats
