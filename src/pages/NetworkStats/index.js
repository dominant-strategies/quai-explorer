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
import { StatsInfoBox } from '../../components/StatsInfoBox'
import { CHAIN_SLUGS, POSITIONS } from '../../constants/'
import { GET_LATEST_BLOCK, GET_LATEST_TRANSACTIONS } from '../../utils/queries'
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
                        className={`tab tab-bordered ${slug === chain && 'text-white font-semibold border-white'}`}
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
    const [gasLimit, setGasLimit] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [uncles, setUncles] = useState('')

    // Array values for the bar chart
    const [difficultyArr, setDifficultyArr] = useState([])
    const [uncleCountArr, setUncleCountArr] = useState([])
    const [gasUsedArr, setGasUsedArr] = useState([])
    const [gasLimitArr, setGasLimitArr] = useState([])

    const [value, setValues] = useState([
        30, 40, 45, 50, 49, 60, 70, 91, 90, 78, 12, 23, 45, 56, 67, 78, 45, 34,
        89, 29, 23,
    ])
    const { loadingBlock, error : errorBlock, data : blockData, isSuccess: isSuccessBlock } = useQuery(GET_LATEST_BLOCK, {
        variables: { location },
    })

    const { loadingTransaction, error: errorTransaction, data : transactionData, isSuccessTransaction } = useQuery(GET_LATEST_TRANSACTIONS, {
        variables: { location },
    })

    console.log({transactionData})

    useEffect(() => {
        setLatestBlock(
            blockData?.blocks[0]?.number.split(',')[
                POSITIONS[CHAIN_SLUGS.indexOf(location)]
            ]
        )
        setGasLimit(
            blockData?.blocks[0]?.gas_limit.split(',')[
                POSITIONS[CHAIN_SLUGS.indexOf(location)]
            ]
        )
        setDifficulty(
            blockData?.blocks[0]?.difficulty.split(',')[
                POSITIONS[CHAIN_SLUGS.indexOf(location)]
            ]
        )
        setUncles(blockData?.blocks[0]?.header.uncles.length)

        setDifficultyArr(
            blockData?.blocks.map((block) =>
                parseInt(
                    block?.difficulty.split(',')[
                        POSITIONS[CHAIN_SLUGS.indexOf(location)]
                    ]
                )
            )
        )
        setUncleCountArr(
            blockData?.blocks.map((block) => block?.header.uncles.length)
        )

        setGasUsedArr(
            blockData?.blocks.map((block) =>
                parseInt(
                    block?.gas_used.split(',')[
                        POSITIONS[CHAIN_SLUGS.indexOf(location)]
                    ]
                )
            )
        )

        setGasLimitArr(
            blockData?.blocks.map((block) =>
                parseInt(
                    block?.difficulty.split(',')[
                        POSITIONS[CHAIN_SLUGS.indexOf(location)]
                    ]
                )
            )
        )
    }, [blockData])

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6">{location.toUpperCase()}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div>
                    <InfoBox
                        Icon={CubeIcon}
                        title="BEST BLOCK"
                        value={loadingBlock ? 0 : latestBlock}
                        className="text-blue-400"
                    />
                    <StatsInfoBox
                        Icon={CashIcon}
                        title="GAS LIMIT"
                        value={loadingBlock ? 0 : gasLimit}
                        className="text-blue-400"
                    />
                    
                </div>
                {/* <div>
                    <InfoBox
                        Icon={DesktopComputerIcon}
                        title="ACTIVE NODES"
                        value="72/72"
                        className="text-green-500"
                    />
                </div> */}
                <div>
                    <InfoBox
                        Icon={ShareIcon}
                        title="UNCLES"
                        value={loadingBlock ? 0 : uncles}
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
                    {/* <StatsInfoBox
                        Icon={CashIcon}
                        title="GAS LIMIT"
                        value={loadingBlock ? 0 : gasLimit}
                        className="text-blue-400"
                    /> */}
                </div>
                {/* <div>
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
                </div> */}
                {/* <div>
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
                </div> */}
                <div>
                    <InfoBox
                        Icon={ChipIcon}
                        title="DIFFICULTY"
                        value={loadingBlock ? 0 : difficulty}
                        className="text-red-400"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <GraphBox title="BLOCK TIME" data={value} />
                <GraphBox title="DIFFICULTY" color="#ff0000" data={difficultyArr} />
                <GraphBox title="UNCLE COUNT" data={uncleCountArr} />
                <GraphBox title="TRANSACTIONS" data={value} />
                <GraphBox title="GAS SPENDING" data={gasUsedArr} />
                <GraphBox title="GAS LIMIT" color="#00ff00" data={gasLimitArr} />
            </div>
        </div>
    )
}

export default NetworkStats
