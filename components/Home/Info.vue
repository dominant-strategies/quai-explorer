<template>
  <div>
    <div class="search-block">
      <div class="bg" style="width: 100vw"></div>
      <div style="position: absolute; width: 100%">
        <div style="margin-left: 3vw">
          <h1 class="explorer-title">The Quai Network Explorer</h1>
          <v-spacer style="height: 2vh"></v-spacer>
          <v-text-field
            style="width: 60%"
            light
            solo
            placeholder="Search Txn Hash / Block"
          >
          </v-text-field>
        </div>
      </div>
    </div>
    <div class="info-page">
      <v-card class="main-card">
        <v-row style="min-height: 120px">
          <div class="stats">
            <p class="title">Blocks</p>
            <p class="stats-text">
              {{ blocks }}
            </p>
          </div>
          <div class="stats">
            <p class="title">TPS</p>
            <p class="stats-text">
              {{ tps }}
            </p>
          </div>
          <div class="stats">
            <p class="title">Hashrate</p>
            <p class="stats-text">
              {{ hashrate }}
            </p>
          </div>
          <div class="stats">
            <p class="title">Difficulty</p>
            <p class="stats-text">
              {{ difficulty }}
            </p>
          </div>
        </v-row>
      </v-card>
      <div class="quai-info">
        <v-card class="blocks-card">
          <v-card-title class="title"> Blocks </v-card-title>
          <v-data-table
            class="info-table"
            :headers="headersblock"
            :items="blocksData"
            :items-per-page="15"
            dense
          ></v-data-table>
        </v-card>
        <v-card class="blocks-card">
          <v-card-title class="title"> Transactions </v-card-title>
          <v-data-table
            class="info-table"
            :headers="headerstx"
            :items="transactionsData"
            :items-per-page="15"
            dense
          ></v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      tps: 1000,
      hashrate: 50,
      difficulty: 100,
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
      searchTerm: 'Search by Address / Txn Hash / Block',
    }
  },
  mounted() {
    console.log('mounted')
    this.fetch()
    this.createSockets()
  },
  computed: {
    ...mapState('blocks', ['blocks', 'blocksData']),
    ...mapState('transactions', ['transactions']),
  },
  methods: {
    searchQuai() {},
    ...mapActions('blocks', ['fetch', 'createSockets']),
  },
}
</script>

<style scoped lang="scss">
.explorer-title {
  padding-top: 5vh;
  color: white !important;
  font-size: 2rem;
  position: relative;
}

.search-block {
  background-color: rgba(0, 0, 0, 1);
  height: 35vh;
  position: relative;
  overflow: hidden;
}

.bg {
  height: 130%;
  background: transparent;
  background-image: url('./static/wolfram/wave.svg');
  background-size: cover;
  background-repeat: no-repeat;
  top: -10vh;
  position: absolute;
  z-index: 0;
}

.stats {
  display: flex;
  flex-direction: row;
  width: 25%;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.info-page {
  margin-top: -3vh;
  margin-left: 3vw;
  margin-right: 3vw;
}

.quai-info {
  margin-top: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.stats-text {
  color: black !important;
  font-size: 3vh;
}

@media (max-width: 1000px) {
  .main-info {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center space-between;
    display: grid;
  }
}

.main-card {
  width: 100%;
  border-radius: 1rem;
  display: grid;
  align-items: center;
}

.blocks-card {
  background-color: rgba(236, 77, 55, 1);
  border-radius: 1rem;
  display: grid;
  align-items: center;
  height: 100%;
  width: 48%;
}

.title {
  color: black;
}

@media (max-width: 1000px) {
  .quai-info {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
  }
}

$data-table-border-radius: none !important;
$data-table-progress-border-radius: 0 0 0 0 !important;

.info-table {
  &:first-child {
    border-radius: 0 0 0 0;
  }
  &:last-child {
    border-radius: 0 0 0 0;
  }
}
</style>
