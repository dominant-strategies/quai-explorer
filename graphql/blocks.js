import gql from 'graphql-tag'

export const GET_BLOCKS = `
  query GetBlocks($num:Int!) {
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

export const SUBSCRIBE_BLOCKS = `
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
