const WebSocket = require('ws')
const axios = require('axios')

const blocks = require('../graphql/blocks.js')

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
  blocksData: [],
  hashRate: 0,
  difficultyArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  difficulty: 0,
})

export const mutations = {
  setInitialBlocks(state, initialBlocks) {
    state.blocksData = initialBlocks
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
  setHashRate(state, hashRate) {
    state.hashRate = hashRate
  },
  updateDifficulty(state, diffObj) {
    const index = chainSlugs.indexOf(diffObj.chain)

    state.difficultyArr[index] = diffObj.difficulty

    var difficultySum = 0
    for (var i = 0; i < state.difficultyArr.length; i++) {
      difficultySum += state.difficultyArr[i]
    }
    state.difficulty = difficultySum
  },
}

export const actions = {
  addBlockNumber({ commit }) {
    commit('addBlockNumber')
  },
  async fetch({ commit, rootState }) {
    const data = await axios.post(
      rootState.api,
      {
        query: blocks.GET_BLOCKS,
        variables: {
          num: 10,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-Role': 'read',
        },
      }
    )
    commit('setInitialBlocks', data.data.data.blocks)
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

    var unix_timestamp = payload.data.timestamp
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
  async getDifficulty({ commit }, payload) {
    var difficultyArr = payload.data.difficulty
    var diffObj = {
      chain: payload.chain,
      difficulty: difficultyArr[payload.position],
    }

    commit('updateDifficulty', diffObj)
  },
  async hashRate({ commit }) {
    var hashR = 0
    for (var i = 0; i < chainSlugs.length; i++) {
      try {
        var hashResponse = await axios.post(
          'http://45.32.69.88/' + chainSlugs[i] + '-http',
          {
            jsonrpc: '2.0',
            method: 'eth_hashrate',
            params: [],
            id: 1,
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          }
        )
      } catch (error) {
        console.log(error)
      }
      hashR += parseInt(hashResponse.data.result, 16)
    }
    commit('setHashRate', hashR)
  },
}
