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

export const state = () => ({
    transactions: 0,
    txData: [],
    transactionsGraphData: [
        [{
           name: 'transactions',
           data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }],
        [{
            name: 'transactions',
            data: [] 
        }]
    ],
    transactionsKey: 100,
})

export const mutations = {
    addTransactionsCount(state, txCount) {
        state.transactions += txCount
    },
    addTransactionsData(state, txData) {
        state.txData.unshift(txData)
    },
    setTransactionsValues(state, data) {
        state.transactionsKey += 1
        if(state.transactionsGraphData[data.index][0].data.length == 20){
            state.transactionsGraphData[data.index][0].data.shift()
        }
        state.transactionsGraphData[data.index][0].data.push({x: data.x, y:data.y})
    }
}

export const actions = {
    async fetchTx({ commit, dispatch }, payload) {
        var txNum
        try {
            var txNum = await axios.post(
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
        )} catch (err) {
            console.log(err)
        }
        payload = {
            ...payload, txCount: parseInt(txNum.data.result, 16) 
        }
        commit('addTransactionsCount', parseInt(txNum.data.result, 16))
        dispatch('setTransactions', payload)
    },
    async getTransactionsBlock({ commit }, payload) {
        try {
            var tx = await axios.post(
            'http://45.32.69.88/' + payload.chain + '-http',
            {
                jsonrpc: '2.0',
                method: 'eth_getBlockByNumber',
                params: ['0x' + payload.data.number[payload.position].toString(16), true],
                id: 1,
            },
            {
                headers: {
                'content-type': 'application/json',
                },
            }
        )} catch (err) {
            console.log(err)
        }
        var txs = tx.data.result.transactions
        const txsLength = txs ? txs.length:0 

        for( var i=0; i<txsLength; i++){
            var txData = {
                hash: txs[i].hash.slice(0, 4) + '....' + txs[i].hash.slice(56, 66),
                block: parseInt(txs[i].blockNumber, 16),
                sent: parseInt(txs[i].value, 16)
            }
            commit('addTransactionsData', txData)
        }
    },
    async setTransactions({ commit }, payload){
        const index = chainSlugs.indexOf(payload.chain)

        var unix_timestamp = payload.data.timestamp
        var date = new Date(unix_timestamp * 1000)
        var hours = date.getHours()
        var minutes = '0' + date.getMinutes()
        var seconds = '0' + date.getSeconds()
        var formattedTime =
          hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

        const txCount = payload.txCount

        const data = {
            x: formattedTime,
            y: txCount,
            index: index
        }

        commit('setTransactionsValues', data)
  },
}