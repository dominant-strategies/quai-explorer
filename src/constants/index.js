export const MENU = [
    {
        name: 'EXPLORER',
        path: '/',
    },
    {
        name: 'NETWORK STATS',
        path: '/network',
    },
    {
        name: 'CHAINS',
        path: '/chains',
    },
]

export const BLOCK_TABLE_HEADER = [
    'Location',
    'Number',
    'Miner',
    'Txs',
    'Timestamp',
]
export const TRANSACTION_TABLE_HEADER = ['TX Hash', 'Block Number', 'Quai Sent']

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
    prime: 'Prime',
    'region-1': 'Cyprus',
    'region-2': 'Paxos',
    'region-3': 'Hydra',
    'zone-1-1': 'Cyprus One',
    'zone-1-2': 'Cyprus Two',
    'zone-1-3': 'Cyprus Three',
    'zone-2-1': 'Paxos One',
    'zone-2-2': 'Paxos Two',
    'zone-2-3': 'Paxos Three',
    'zone-3-1': 'Hydra One',
    'zone-3-2': 'Hydra Two',
    'zone-3-3': 'Hydra Three',
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

export const QUAI_STATS_LINKS = {
    prime: 'prime',
    'region-1': 'cyprus',
    'region-2': 'paxos',
    'region-3': 'hydra',
    'zone-1-1': 'cyprus1',
    'zone-1-2': 'cyprus2',
    'zone-1-3': 'cyprus3',
    'zone-2-1': 'paxos1',
    'zone-2-2': 'paxos2',
    'zone-2-3': 'paxos3',
    'zone-3-1': 'hydra1',
    'zone-3-2': 'hydra2',
    'zone-3-3': 'hydra3',
}

export const QUAI_STATS_LINKS_MAPPING_2 = {
    prime: 'prime',
    region_1: 'cyprus',
    region_2: 'paxos',
    region_3: 'hydra',
    zone_1_1: 'cyprus1',
    zone_1_2: 'cyprus2',
    zone_1_3: 'cyprus3',
    zone_2_1: 'paxos1',
    zone_2_2: 'paxos2',
    zone_2_3: 'paxos3',
    zone_3_1: 'hydra1',
    zone_3_2: 'hydra2',
    zone_3_3: 'hydra3',
}

export const BLOCK_COLORS_MAPPING_2 = {
    paxos: 'gray.300',
    cyprus: 'green.800',
    hydra: 'blue.800',
    cyprus1: 'green.300',
    cyprus2: 'green.500',
    cyprus3: 'green.700',
    paxos1: 'red.300',
    paxos2: 'red.500',
    paxos3: 'red.700',
    hydra1: 'blue.300',
    hydra2: 'blue.500',
    hydra3: 'blue.700',
}

export const LINKS_PRESENT = {
    prime: 'Prime',
    paxos: 'Paxos',
    Cyprus: 'Cyprus',
    hydra: 'hydra',
    cyprus1: 'Cyprus One',
    cyprus2: 'Cyprus Two',
    cyprus3: 'Cyprus Three',
    paxos1: 'Paxos One',
    paxos2: 'Paxos Two',
    paxos3: 'Paxos Three',
    hydra1: 'Hydra One',
    hydra2: 'Hydra Two',
    hydra3: 'Hydra Three',
}

export const QUAI_STATS_BLOCKS_LINKS = {
    Prime: 'prime',
    Cyprus: 'cyprus',
    Paxos: 'paxos',
    Hydra: 'hydra',
    'Cyprus One': 'cyprus1',
    'Cyprus Two': 'cyprus2',
    'Cyprus Three': 'cyprus3',
    'Paxos One': 'paxos1',
    'Paxos Two': 'paxos2',
    'Paxos Three': 'paxos3',
    'Hydra One': 'hydra1',
    'Hydra Two': 'hydra2',
    'Hydra Three': 'hydra3',
}

export const BLOCK_COLORS = {
    Paxos: 'gray.300',
    Cyprus: 'green.800',
    // Paxos: 'red.800',
    Hydra: 'blue.800',
    'Cyprus One': 'green.300',
    'Cyprus Two': 'green.500',
    'Cyprus Three': 'green.700',
    'Paxos One': 'red.300',
    'Paxos Two': 'red.500',
    'Paxos Three': 'red.700',
    'Hydra One': 'blue.300',
    'Hydra Two': 'blue.500',
    'Hydra Three': 'blue.700',
}

export const BLOCK_COLORS_CUSTOM = {
    Paxos: 'gray.300',
    Cyprus: 'green.800',
    // Paxos: 'red.800',
    Hydra: 'blue.800',
    'Cyprus One': 'green.300',
    'Cyprus Two': 'green.500',
    'Cyprus Three': 'green.700',
    'Paxos One': 'red.300',
    'Paxos Two': 'red.500',
    'Paxos Three': 'red.700',
    'Hydra One': 'blue.300',
    'Hydra Two': 'blue.500',
    'Hydra Three': 'blue.700',
}
