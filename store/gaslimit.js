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
    minGasLimit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    maxGasLimit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    avgGasLimit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentGasLimit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    gasLimitKey: 0,
    gasLimitGraphData: [
        [{
           name: 'gaslimit',
           data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }],
        [{
            name: 'gaslimit',
            data: [] 
        }]
    ],
    gasSpendingGraphData: [
        [{
           name: 'gas spending',
           data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }],
        [{
            name: 'gas spending',
            data: [] 
        }]
    ],
})

export const mutations = {
    setGasLimitValues(state, payload) {
      const index = chainSlugs.indexOf(payload.chain)
      
      state.gasLimitKey += 1

      // count since the last refresh to calculate the average difficulty
      state.count[index] += 1
      const gaslimit = payload.data.gasLimit[payload.position]
      
      // initially 
      if(state.count[index] == 1) {
          state.minGasLimit[index] = gaslimit
          state.maxGasLimit[index] = gaslimit
          state.avgGasLimit[index] = gaslimit
          state.currentGasLimit[index] = gaslimit
      }

      if(state.count[index] > 1) {
          if(gaslimit < state.minGasLimit[index]) {
            state.minGasLimit[index] = gaslimit
          }
          if(gaslimit > state.minGasLimit[index]) {
            state.maxGasLimit[index] = gaslimit
          }
        state.avgGasLimit[index] = Math.round((parseInt(state.avgGasLimit[index], 10) * (state.count[index] - 1) + parseInt(gaslimit, 10))/state.count[index])
        state.currentGasLimit[index] = gaslimit
      }
    },
    setGraphValuesGasLimit(state, data) {
        if(state.gasLimitGraphData[data.index][0].data.length == 20){
            state.gasLimitGraphData[data.index][0].data.shift()
        }
        state.gasLimitGraphData[data.index][0].data.push({x: data.x, y:data.y})
    },
    setGraphValuesGasSpending(state, data) {
        if(state.gasSpendingGraphData[data.index][0].data.length == 20){
            state.gasSpendingGraphData[data.index][0].data.shift()
        }
        state.gasSpendingGraphData[data.index][0].data.push({x: data.x, y:data.y})
    }
}

export const actions = {
    async setGasLimit({ commit }, payload){
        const index = chainSlugs.indexOf(payload.chain)

        var unix_timestamp = payload.data.timestamp
        var date = new Date(unix_timestamp * 1000)
        var hours = date.getHours()
        var minutes = '0' + date.getMinutes()
        var seconds = '0' + date.getSeconds()
        var formattedTime =
          hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

        const gaslimit = payload.data.gasLimit[payload.position]

        const data = {
            x: formattedTime,
            y: gaslimit,
            index: index
        }

        commit('setGasLimitValues', payload)
        commit('setGraphValuesGasLimit', data)
  },
    
    async setGasSpending({ commit }, payload){
        const index = chainSlugs.indexOf(payload.chain)

        var unix_timestamp = payload.data.timestamp
        var date = new Date(unix_timestamp * 1000)
        var hours = date.getHours()
        var minutes = '0' + date.getMinutes()
        var seconds = '0' + date.getSeconds()
        var formattedTime =
          hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

        const gasSpending = payload.data.gasUsed[payload.position]

        const data = {
            x: formattedTime,
            y: gasSpending,
            index: index
        }

        commit('setGraphValuesGasSpending', data)
  },
}