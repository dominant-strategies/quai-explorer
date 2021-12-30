import {
    gql
  } from "@apollo/client";

export const GET_BLOCKS = gql`
  query GetBlocks($num:Int!, $offset:Int!) {
    blocks_aggregate {
      aggregate {
        count
      }
    }
    blocks(limit:$num, offset:$offset, order_by: { timestamp: desc }) {
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
  query Block($hash:String!) {
    blocks(where: {hash: {_eq: $hash}}){
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
  subscription GetBlocks($num:Int!) {
    blocks(limit:$num, order_by: { timestamp: desc }) {
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
export const GET_TRANSACTIONS = gql`
  query GetTransactions($num:Int!, $offset:Int!) {
    transactions_aggregate {
      aggregate {
        count
      }
    }
    transactions(limit:$num, offset:$offset, order_by: { timestamp: desc }) {
      block_number
      to
      from
      timestamp
      value
      hash
      contract_code
      full_transaction
    }
  }
`

export const GET_TRANSACTION_WITH_HASH = gql`
  query Transaction($hash: bpchar!) {
    transactions(where: {hash: {_eq: $hash}}) {
      block_number
      to
      from
      timestamp
      value
      hash
      contract_code
      full_transaction
    }
  }
`


export const SUBSCRIBE_TRANSACTIONS = gql`
  subscription GetTransactions($num:Int!) {
    transactions(limit:$num, order_by: { timestamp: desc }) {
        block_number
        to
        from
        timestamp
        values
        hash
        contract_code
        full_transaction
    }
  }
`

export const BlockOrTx = gql`
query blockOrTx($hash:String!) {
    blocks(where: {hash: {_eq: $hash}}) {
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
    transactions(where: {hash: {_eq: $hash}}) {
      block_number
      contract_code
      from
      full_transaction
      hash
      timestamp
      to
      value
    }
  }`