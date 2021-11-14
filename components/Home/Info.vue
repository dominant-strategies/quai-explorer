<template>
  <div>
    <div class="main-info">
      <div class="stats">
        <p class="title"># Blocks</p>
        <p class="text">
          {{ blocks }}
        </p>
      </div>
      <div class="stats">
        <p class="title"># Transactions</p>
        <p class="text">
          {{ transactions }}
        </p>
      </div>
      <div class="stats">
        <p class="title"># TPS</p>
        <p class="text">
          {{ tps }}
        </p>
      </div>
    </div>
    <div class="quai-info">
      <v-card class="blocks-card">
        <v-card-title class="title"> Blocks </v-card-title>
        <v-data-table
          :headers="headersblock"
          :items="blocksData"
          :items-per-page="15"
          dense
        ></v-data-table>
      </v-card>
      <v-card class="blocks-card">
        <v-card-title class="title"> Transactions </v-card-title>
        <v-data-table
          :headers="headerstx"
          :items="transactionsData"
          :items-per-page="15"
          dense
          :key="renderKey"
        ></v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      tps: 1000,
      headersblock: [
        {
          text: 'Location (Prime, Region, Zone)',
          align: 'start',
          sortable: false,
          value: 'location',
        },
        { text: 'Validator', value: 'miner' },
        { text: 'Txs', value: 'txs' },
        { text: 'Timetamp', value: 'timestamp' },
      ],
      headerstx: [
        {
          text: 'TX Hash',
          align: 'start',
          sortable: false,
          value: 'hash',
        },
        { text: 'Block number', value: 'block' },
        { text: 'Quai sent', value: 'sent' },
        { text: 'Quai Burnt', value: 'burnt' },
      ],
      transactionsData: [],
      renderKey: 0,
    }
  },
  mounted() {
    console.log('mounted')
    this.fetch()
    this.createSockets()
    this.renderKey++
  },
  computed: {
    ...mapState('blocks', ['blocks', 'blocksData']),
    ...mapState('transactions', ['transactions']),
  },
  methods: {
    ...mapActions('blocks', ['fetch', 'createSockets']),
  },
}
</script>

<style scoped>
.main-info {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
}

.stats {
  display: flex;
  flex-direction: row;
  width: 50vh;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.title {
  color: orange;
  font-size: 6vh;
}

.text {
  color: white !important;
  font-size: 4vh;
}

@media (max-width: 1000px) {
  .main-info {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center space-around;
    display: grid;
  }
}

.quai-info {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px;
}

.blocks-card {
  background-color: black;
  width: 80vh;
  border-radius: 25px;
  display: grid;
  align-items: center;
  margin: 20px;
}

.title {
  color: orange;
}

@media (max-width: 1000px) {
  .quai-info {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 20px;
  }
}
</style>
