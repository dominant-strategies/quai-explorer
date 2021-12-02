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
  minDifficulty: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  maxDifficulty: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  avgDifficulty: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  currentDifficulty: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  difficultyKey: 0,
  difficultyGraphData: [
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
    [
      {
        name: 'difficulty',
        data: [],
      },
    ],
  ],
})

export const mutations = {
  setDifficultyValues(state, payload) {
    const index = chainSlugs.indexOf(payload.chain)

    state.difficultyKey += 1

    // count since the last refresh to calculate the average difficulty
    state.count[index] += 1
    const difficulty = payload.data.difficulty[payload.position]

    // initially
    if (state.count[index] == 1) {
      state.minDifficulty[index] = difficulty
      state.maxDifficulty[index] = difficulty
      state.avgDifficulty[index] = difficulty
      state.currentDifficulty[index] = difficulty
    }

    if (state.count[index] > 1) {
      if (difficulty < state.minDifficulty[index]) {
        state.minDifficulty[index] = difficulty
      }
      if (difficulty > state.minDifficulty[index]) {
        state.maxDifficulty[index] = difficulty
      }
      state.avgDifficulty[index] = Math.round(
        (parseInt(state.avgDifficulty[index], 10) * (state.count[index] - 1) +
          parseInt(difficulty, 10)) /
          state.count[index]
      )
      state.currentDifficulty[index] = difficulty
    }
  },
  setGraphValues(state, data) {
    if (state.difficultyGraphData[data.index][0].data.length == 20) {
      state.difficultyGraphData[data.index][0].data.shift()
    }
    state.difficultyGraphData[data.index][0].data.push({ x: data.x, y: data.y })
  },
}

export const actions = {
  async setDifficulty({ commit }, payload) {
    const index = chainSlugs.indexOf(payload.chain)

    var unix_timestamp = payload.data.timestamp
    var date = new Date(unix_timestamp * 1000)
    var hours = date.getHours()
    var minutes = '0' + date.getMinutes()
    var seconds = '0' + date.getSeconds()
    var formattedTime =
      hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

    const difficulty = payload.data.difficulty[payload.position]

    const data = {
      x: formattedTime,
      y: difficulty,
      index: index,
    }

    commit('setDifficultyValues', payload)
    commit('setGraphValues', data)
  },
}
