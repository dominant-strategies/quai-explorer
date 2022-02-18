import { gql } from '@apollo/client'

export const GET_BLOCKS = gql`
    query GetBlocks($num: Int!, $offset: Int!) {
        blocks_aggregate {
            aggregate {
                count
            }
        }
        blocks(limit: $num, offset: $offset, order_by: { timestamp: desc }) {
            context
            difficulty
            gas_limit
            gas_used
            hash
            header
            location
            network_difficulty
            number
            timestamp
        }
    }
`

export const GET_BLOCK_WITH_HASH = gql`
    query Block($hash: String!) {
        blocks(where: { hash: { _eq: $hash } }) {
            context
            difficulty
            gas_limit
            gas_used
            hash
            header
            location
            network_difficulty
            number
            timestamp
        }
    }
`

export const GET_BLOCK_WITH_LOCATION = gql`
    query Block($location: String!) {
        blocks(where: { location: { _eq: $location } }) {
            context
            difficulty
            gas_limit
            gas_used
            hash
            header
            location
            network_difficulty
            number
            timestamp
        }
    }
`

export const SUBSCRIBE_BLOCKS = gql`
    subscription SubscribeBlocks {
        blocks {
            context
            difficulty
            gas_limit
            timestamp
            number
            network_difficulty
            location
            header
            hash
            gas_used
        }
    }
`
export const GET_TRANSACTIONS = gql`
    query GetTransactions($num: Int!, $offset: Int!) {
        transactions_aggregate {
            aggregate {
                count
            }
        }
        transactions(
            limit: $num
            offset: $offset
            order_by: { tx_time: desc }
        ) {
            block_number
            to_addr
            from_addr
            tx_time
            tx_value
            hash
            contract_code
            full_transaction
            to_location
            from_location
        }
    }
`

export const SUBSCRIBE_TRANSACTIONS = gql`
    subscription GetTransactions($num: Int!, $offset: Int!) {
        transactions(
            limit: $num
            offset: $offset
            order_by: { timestamp: desc }
        ) {
            block_number
            to_addr
            from_addr
            tx_time
            tx_value
            hash
            contract_code
            full_transaction
            location
        }

        transactions_aggregate {
            aggregate {
                count
            }
        }
    }
`

export const GET_TRANSACTION_WITH_HASH = gql`
    query Transaction($hash: String!) {
        transactions(where: { hash: { _eq: $hash } }) {
            block_number
            to_addr
            from_addr
            tx_time
            tx_value
            hash
            contract_code
            full_transaction
            to_location
            from_location
        }
    }
`

export const GET_TRANSACTION_WITH_FROM_ADDR = gql`
    query Transaction($hash: String!) {
        transactions(where: { hash: { _eq: $from_addr } }) {
            block_number
            to_addr
            from_addr
            tx_time
            tx_value
            hash
            contract_code
            full_transaction
            to_location
            from_location
        }
    }
`

export const GET_NODE_INFO_WITH_LOCATION = gql`
    query NodeInfo($location: String!) {
        node_info(where: { location: { _eq: $location } }) {
            location
            http_port
            ws_port
            ip
            name
            enode
            context
            height
            hashrate
        }
    }
`

export const GET_PEER_INFO_WITH_LOCATION = gql`
    query PeerInfo($location: String!) {
        peer_info(where: { location: { _eq: $location } }) {
            location
            http_port
            ws_port
            ip
            name
            enode
            current_head
            context
            current_difficulty
        }
    }
`

export const BlockOrTx = gql`
    query blockOrTx($hash: String!) {
        blocks(where: { hash: { _eq: $hash } }) {
            context
            difficulty
            gas_limit
            gas_used
            hash
            header
            location
            network_difficulty
            number
            timestamp
        }
        transactions(where: { hash: { _eq: $hash } }) {
            block_number
            contract_code
            from_addr
            full_transaction
            hash
            tx_time
            to_addr
            tx_value
        }
    }
`

export const GET_LATEST_BLOCK = gql`
    query GetLatestBlock($location: String!) {
        blocks(
            limit: 20
            where: { location: { _eq: $location } }
            order_by: { timestamp: desc }
        ) {
            number
            network_difficulty
            difficulty
            gas_limit
            gas_used
            header
        }
    }
`
export const GET_LATEST_TRANSACTIONS = gql`
    query GetLatestTransactions($location: String!) {
        transactions(
            limit: 20
            where: { location: { _eq: $location } }
            order_by: { tx_time: desc }
        ) {
            block_number
            to_addr
            from_addr
            tx_time
            tx_value
            hash
            contract_code
            full_transaction
            to_location
            from_location
        }
    }
`

export const GET_NETWORK_DIFFICULTY_FROM_LATEST_PRIME_BLOCK_FOR_ONE_CHAIN = gql`
    query GetNetworkDifficultyFromLatestPrimeBlockForOneChain {
        blocks(limit: 1, where: {location: {_eq: "prime"}}, order_by: {timestamp: desc}) {
        difficulty
        location
        }
    }
`

export const GET_TRANSACTION_WITH_ADDRESS = gql`
    query Transaction($num: Int!, $offset: Int!, $hash: String!) {
        transactions(where: { from_addr: { _eq: $hash }}, limit: 10) {
            block_number
            to_addr
            from_addr
            tx_time
            tx_value
            hash
            contract_code
            full_transaction
            to_location
            from_location
        }
    }
`

export const GET_TRANSACTION_WITH_ADDRESS_2 = gql`
    query Transaction($num: Int!, $offset: Int!, $hash: String!) {
        transactions_aggregate {
            aggregate {
                count
            }
        }
        transactions(
            limit: $num
            offset: $offset
            order_by: { tx_time: desc }
            where: { from_addr: { _eq: $hash }}
        ) {
            block_number
            to_addr
            from_addr
            tx_time
            tx_value
            hash
            contract_code
            full_transaction
            to_location
            from_location
        }
    }
`




