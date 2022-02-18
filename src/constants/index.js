export const MENU = [
    {
        name: "EXPLORER",
        path: "/"
    },
    {
        name: "NETWORK STATS",
        path: "/network"
    },
    {
        name: "CHAINS",
        path: "/chains"
    }
]

export const BLOCK_TABLE_HEADER = ["Location", "Number", "Miner", "Txs", "Timestamp"]
export const TRANSACTION_TABLE_HEADER = ["TX Hash", "Block Number", "Quai Sent"]

export const CHAIN_SLUGS = [
    'prime',
    'region-1',
    'region-2',
    'region-3',
    'zone-1-1',
    'zone-1-2',
    'zone-1-3',
    'zone-2-1',
    'zone-2-2',
    'zone-2-3',
    'zone-3-1',
    'zone-3-2',
    'zone-3-3',
  ]

  export const SHARDED_ADDRESS = {
    'prime' : 'Prime',
    'region-1' : 'Cyprus',
    'region-2' : 'Paxos',
    'region-3' : 'Hydra',
    'zone-1-1' : 'Cyprus One',
    'zone-1-2' : 'Cyprus Two',
    'zone-1-3' : 'Cyprus Three',
    'zone-2-1' : 'Paxos One',
    'zone-2-2' : 'Paxos Two',
    'zone-2-3' : 'Paxos Three',
    'zone-3-1' : 'Hydra One',
    'zone-3-2' : 'Hydra Two',
    'zone-3-3' : 'Hydra Three',
  }
  export const POSITIONS = [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2]

  export const CHAIN_SLUGS_2 = [
    'prime',
    'region1',
    'region2',
    'region3',
    'zone11',
    'zone12',
    'zone13',
    'zone21',
    'zone22',
    'zone23',
    'zone31',
    'zone32',
    'zone33',
]

export const PORTS = [
    '8546',
    '8578',
    '8580',
    '8582',
    '8610',
    '8642',
    '8674',
    '8612',
    '8644',
    '8676',
    '8614',
    '8646',
    '8678',
]

// PREFIX - low and high for a valid address in a given chain
export const PREFIX = {
    prime: {
        low: 0x00,
        high: 0x09,
    },
    region1: {
        low: 0x0a,
        high: 0x13,
    },
    zone11: {
        low: 0x14,
        high: 0x1d,
    },
    zone12: {
        low: 0x1e,
        high: 0x27,
    },
    zone13: {
        low: 0x28,
        high: 0x31,
    },
    region2: {
        low: 0x32,
        high: 0x3b,
    },
    zone21: {
        low: 0x3c,
        high: 0x45,
    },
    zone22: {
        low: 0x46,
        high: 0x4f,
    },
    zone23: {
        low: 0x50,
        high: 0x59,
    },
    region3: {
        low: 0x5a,
        high: 0x63,
    },
    zone31: {
        low: 0x64,
        high: 0x6d,
    },
    zone32: {
        low: 0x6e,
        high: 0x77,
    },
    zone33: {
        low: 0x78,
        high: 0x81,
    },
}