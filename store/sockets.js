const WebSocket = require('ws')
const chainSlugs = [
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
const positions = [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2]

export const state = () => ({
    sockets: []
})

export const mutations = {
  addSockets(state, sockets) {
    state.sockets.push(sockets)
  },
}

export const actions = {
  createSockets({ commit, dispatch }) {
    console.log('createSockets')

    const handleConnection = (connection, chain, position) => {
      const subscribeData = {
        id: 1,
        method: 'eth_subscribe',
        params: ['newHeads'],
      }

      connection.onopen = () => {
        console.log(
          'Successfully connected to the echo websocket server of',
          chain
        )
        connection.send(JSON.stringify(subscribeData))
        commit('addSockets', connection)
      }

      connection.onmessage = (event) => {
        var data = JSON.parse(event.data)
        if (data.result != undefined) {
          console.log(
            'Subscribed to the newHeader subscription over the websockets for',
            chain
          )
        }

        if (data.params != undefined) {
          var latestHeaderSlice = data.params.result.number
          console.log('latest blocks for', chain, latestHeaderSlice[position])

          var payload = {
            chain: chain,
            position: position,
            data: data.params.result,
          }

          // Home page actions
          dispatch('blocks/addBlockNumber', payload, {root:true})
          dispatch('blocks/getBlockTableData', payload, {root:true})
          dispatch('blocks/hashRate', payload, {root:true})
          dispatch('blocks/getDifficulty', payload, {root:true})
          dispatch('transactions/fetchTx', payload, {root:true})
          dispatch('transactions/getTransactionsBlock', payload, {root:true})
          
          // Network stats actions
          dispatch('difficulty/setDifficulty', payload, {root:true})
          dispatch('gaslimit/setGasLimit', payload, {root:true})
          dispatch('gaslimit/setGasSpending', payload, {root:true})
          dispatch('uncles/fetchUncles', payload, {root:true})
        }
      }

      connection.onclose = () => {
        console.log('Websocket connection closed')
      }

      connection.onerror = (err) => {
        console.log('There was an error connecting to the websockets', err)
      }
    }

    const url_chain = 'ws://45.32.69.88/'

    for (let i = 0; i < chainSlugs.length; i++) {
      let url = url_chain + chainSlugs[i] + '-ws'
      var connection = new WebSocket(url)
      handleConnection(connection, chainSlugs[i], positions[i])
    }
  },

}