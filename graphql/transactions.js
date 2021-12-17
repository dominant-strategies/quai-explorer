import gql from 'graphql-tag'

export const GET_TRANSACTIONS = `
  query GetTransactions($num:Int!) {
    transactions(limit:$num, order_by: { timestamp: desc }) {
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

export const SUBSCRIBE_TRANSACTIONS = `
  subscription GetTransactions($num:Int!) {
    transactions(limit:$num, order_by: { timestamp: desc }) {
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
