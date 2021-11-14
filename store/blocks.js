const WebSocket = require('ws')
const axios = require('axios')
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
  blocks: 0,
  sockets: [],
  blocksData: [],
})

export const mutations = {
  setInitialBlocks(state, initialBlocks) {
    state.blocks = initialBlocks
  },
  addSockets(state, sockets) {
    state.sockets.push(sockets)
  },
  addBlockNumber(state) {
    state.blocks += 1
  },
  addBlockTableData(state, payload) {
    state.blocksData.unshift(payload)
  },
}

export const actions = {
  async fetch({ commit }) {
    console.log('called')
    var count = 0
    var initialBlocks = 0
    for (var i = 0; i < chainSlugs.length; i++) {
      axios
        .post(
          'http://45.32.69.88/' + chainSlugs[i] + '-http',
          {
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1,
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
        .then(function (response) {
          initialBlocks += parseInt(response.data.result, 16)
          count += 1
          if (count == 13) {
            commit('setInitialBlocks', initialBlocks)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
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

          commit('addBlockNumber')
          dispatch('getBlockTableData', payload)
          dispatch('transactions/fetchTx', payload, {root:true})
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
  async getBlockTableData({ commit }, payload) {
    var txNum
    try {
      txNum = await axios.post(
        'http://45.32.69.88/' + payload.chain + '-http',
        {
          jsonrpc: '2.0',
          method: 'eth_getBlockTransactionCountByNumber',
          params: ['0x' + payload.data.number[payload.position].toString(16)],
          id: 1,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
    } catch (err) {
      console.log(err)
    }

    var miner = payload.data.miner[payload.position]
    var miner = miner.slice(0, 4) + '....' + miner.slice(38, 42)

    let unix_timestamp = payload.data.timestamp
    var date = new Date(unix_timestamp * 1000)
    var hours = date.getHours()
    var minutes = '0' + date.getMinutes()
    var seconds = '0' + date.getSeconds()
    var formattedTime =
      hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

    var newRowBlocks = {
      location: payload.chain,
      miner: miner,
      txs: parseInt(txNum.data.result, 16),
      timestamp: formattedTime,
    }
    commit('addBlockTableData', newRowBlocks)
  },
}
