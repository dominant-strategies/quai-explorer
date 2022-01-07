import React, { useState, useEffect } from 'react'
import {
    CubeIcon,
    ShareIcon,
    ClockIcon,
    FireIcon,
    ChartBarIcon,
    ChipIcon,
    DesktopComputerIcon,
    CashIcon,
    LightningBoltIcon,
    LightBulbIcon,
} from '@heroicons/react/outline'
import GraphBox from '../../components/GraphBox'
import InfoBox from '../../components/InfoBox'
import { StatsInfoBox, BestBlockInfo } from '../../components/StatsInfoBox'
import { CHAIN_SLUGS, POSITIONS } from '../../constants/'
import { GET_LATEST_BLOCK } from '../../utils/queries'
import { useQuery } from '@apollo/client'

function NetworkStats() {
    const [chain, setChain] = useState(CHAIN_SLUGS[0])

    const handleClick = (slug) => {
        setChain(slug)
    }
    return (
        <div>
            <div className="tabs flex flex-wrap justify-between">
                {CHAIN_SLUGS.map((slug) => (
                    <a
                        className="tab tab-bordered"
                        key={slug}
                        onClick={() => handleClick(slug)}
                    >
                        {' '}
                        {slug.toUpperCase()}
                    </a>
                ))}
            </div>
            {Stats({ location: chain })}
        </div>
    )
}

function Stats({ location }) {
    const [latestBlock, setLatestBlock] = useState('')
    const [value, setValues] = useState([
        30, 40, 45, 50, 49, 60, 70, 91, 90, 78, 12, 23, 45, 56, 67, 78, 45, 34,
        89, 29, 23,
    ])
    const { loading, error, data } = useQuery(GET_LATEST_BLOCK, {
        variables: { location },
    })

    useEffect(() => {
        setLatestBlock(
            data?.blocks[0].number.split(',')[
                POSITIONS[CHAIN_SLUGS.indexOf(location)]
            ]
        )
    }, [data])

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6">{location.toUpperCase()}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div>
                    <BestBlockInfo
                        Icon={CubeIcon}
                        title="BEST BLOCK"
                        value={loading ? '0' : latestBlock}
                        className="text-blue-400"
                    />
                    <InfoBox
                        Icon={DesktopComputerIcon}
                        title="ACTIVE NODES"
                        value="72/72"
                        className="text-green-500"
                    />
                </div>
                <div>
                    <InfoBox
                        Icon={ShareIcon}
                        title="UNCLES"
                        value="0/2"
                        className="text-blue-400"
                    />
                    <StatsInfoBox
                        Icon={CashIcon}
                        title="GAS PRICE"
                        value="149,458 gwei"
                        className="text-blue-400"
                    />
                </div>
                <div>
                    <InfoBox
                        Icon={ClockIcon}
                        title="LAST BLOCK"
                        value="22s ago"
                        className="text-green-400"
                    />
                    <StatsInfoBox
                        Icon={CashIcon}
                        title="GAS LIMIT"
                        value="30087972 gwei"
                        className="text-blue-400"
                    />
                </div>
                <div>
                    <InfoBox
                        Icon={ChartBarIcon}
                        title="AVG BLOCK TIME"
                        value="13.24s"
                        className="text-yellow-400"
                    />
                    <StatsInfoBox
                        Icon={LightningBoltIcon}
                        title="PAGE LATENCY"
                        value="8520 ms"
                        className="text-red-400"
                    />
                </div>
                <div>
                    <InfoBox
                        Icon={FireIcon}
                        title="AVG NETWORK HASHRATE"
                        value="0KH/s"
                        className="text-red-400"
                    />
                    <StatsInfoBox
                        Icon={LightBulbIcon}
                        title="UPTIME"
                        value="100%"
                        className="text-green-400"
                    />
                </div>
                <div>
                    <InfoBox
                        Icon={ChipIcon}
                        title="DIFFICULTY"
                        value="0.00H"
                        className="text-red-400"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <GraphBox title="BLOCK TIME" data={value} />
                <GraphBox title="DIFFICULTY" data={value} />
                <GraphBox title="UNCLE COUNT" data={value} />
                <GraphBox title="TRANSACTIONS" data={value} />
                <GraphBox title="GAS SPENDING" data={value} />
                <GraphBox title="GAS LIMIT" data={value} />
            </div>
        </div>
    )
}

export default NetworkStats
