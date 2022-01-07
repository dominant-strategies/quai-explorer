import React, { useState } from 'react'
import { CubeIcon, ShareIcon, ClockIcon, FireIcon, ChartBarIcon, ChipIcon, DesktopComputerIcon, CashIcon, LightningBoltIcon, LightBulbIcon } from '@heroicons/react/outline';
import GraphBox from '../../components/GraphBox';
import InfoBox from '../../components/InfoBox';
import StatsInfoBox from '../../components/StatsInfoBox';
import { CHAIN_SLUGS } from '../../constants/';

function NetworkStats() {
    const [chain, setChain] = useState(CHAIN_SLUGS[0]);
    const [data, setData] = useState([30, 40, 45, 50, 49, 60, 70, 91, 90,78,12,23,45,56,67,78,45,34,89, 29,23])
    return (
        <div>
            <div className="flex w-full scroll-header justify-between bg-gray-600 shadow-lg scroll overflow-auto xl:overflow-hidden">
                {CHAIN_SLUGS.map(slug => <div className={`cursor-pointer py-4 px-4 hover:bg-gray-500 ${chain === slug  && 'bg-gray-500 border-b border-white'}`} onClick={()=>setChain(slug)}>{slug.toUpperCase()}</div>)}
            </div>
            <div className="p-8">
                <h1 className="text-3xl mb-6">{chain.toUpperCase()}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div>
                        <InfoBox Icon={CubeIcon} title="BEST BLOCK" value="#13,958,157" className="text-blue-400" />
                        <StatsInfoBox Icon={DesktopComputerIcon} title="ACTIVE NODES" value="72/72" className="text-green-500" />
                    </div>
                    <div>
                        <InfoBox Icon={ShareIcon} title="UNCLES" value="0/2" className="text-blue-400" />
                        <StatsInfoBox Icon={CashIcon} title="GAS PRICE" value="149,458 gwei" className="text-blue-400" />
                    </div>
                    <div>
                        <InfoBox Icon={ClockIcon} title="LAST BLOCK" value="22s ago" className="text-green-400" />
                        <StatsInfoBox Icon={CashIcon} title="GAS LIMIT" value="30087972 gwei" className="text-blue-400" />
                    </div>
                    <div>
                        <InfoBox Icon={ChartBarIcon} title="AVG BLOCK TIME" value="13.24s" className="text-yellow-400" />
                        <StatsInfoBox Icon={LightningBoltIcon} title="PAGE LATENCY" value="8520 ms" className="text-red-400" />
                    </div>
                    <div>
                        <InfoBox Icon={FireIcon} title="AVG NETWORK HASHRATE" value="0KH/s" className="text-red-400" />
                        <StatsInfoBox Icon={LightBulbIcon} title="UPTIME" value="100%" className="text-green-400" />
                    </div>
                    <div>
                        <InfoBox Icon={ChipIcon} title="DIFFICULTY" value="0.00H" className="text-red-400" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    
                    <GraphBox title="BLOCK TIME" data={data} />
                    <GraphBox title="DIFFICULTY" data={data} />
                    <GraphBox title="UNCLE COUNT" data={data} />
                    <GraphBox title="TRANSACTIONS" data={data} />
                    <GraphBox title="GAS SPENDING" data={data} />
                    <GraphBox title="GAS LIMIT" data={data} />
                </div>
            </div>
        </div>
    )
}

export default NetworkStats
