const axios = require('axios')

export const state = () => ({
    transactions: 0,
    txData: []
})

export const mutations = {
    addTransactionsCount(state, txCount) {
        state.transactions += txCount
    },
    addTransactionsData(state, txData) {
        state.txData.unshift(txData)
    }
}

export const actions = {
    async fetchTx({ commit }, payload) {
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
        commit('addTransactionsCount', parseInt(txNum.data.result, 16))
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
}