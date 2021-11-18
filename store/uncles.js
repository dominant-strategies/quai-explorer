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
    unclesKey: 1000,
    unclesCountGraphData: [
        [{
           name: 'uncles',
           data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }],
        [{
            name: 'uncles',
            data: [] 
        }]
    ],
})

export const mutations = {
    setUnclesCountValues(state, data) {
        state.unclesKey += 1
        if(state.unclesCountGraphData[data.index][0].data.length == 20){
            state.unclesCountGraphData[data.index][0].data.shift()
        }
        state.unclesCountGraphData[data.index][0].data.push({x: data.x, y:data.y})
    }
}

export const actions = {
    async fetchUncles({ commit }, payload) {
        var unclesCount
        try {
            var unclesCount = await axios.post(
            'http://45.32.69.88/' + payload.chain + '-http',
            {
                jsonrpc: '2.0',
                method: 'eth_getUncleCountByBlockNumber',
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
            ...payload, unclesCount: parseInt(unclesCount.data.result, 16) 
        }

        const index = chainSlugs.indexOf(payload.chain)

        var unix_timestamp = payload.data.timestamp
        var date = new Date(unix_timestamp * 1000)
        var hours = date.getHours()
        var minutes = '0' + date.getMinutes()
        var seconds = '0' + date.getSeconds()
        var formattedTime =
          hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

        const data = {
            x: formattedTime,
            y: unclesCount,
            index: index
        }

        commit('setUnclesCountValues', data)
    },
}