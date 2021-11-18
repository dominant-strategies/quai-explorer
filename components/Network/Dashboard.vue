<template>
  <div class="prime-network" :network="network">
    <div class="network-title">{{ network }}</div>
    <div class="prime">
      <div class="prime-left">
        <div>
          <h3 style="color: #b3b6b7">Difficulty</h3>
          <h2 style="color: #ff4560">{{ currentDifficulty[index] }} H</h2>
        </div>
        <div>
          <h4 style="color: #b3b6b7">Avg. Difficulty</h4>
          <h3 style="color: #ff4560">{{ avgDifficulty[index] }} H</h3>
        </div>
      </div>
      <div class="prime-right">
        <div class="prime-hashrate">
          <h4 style="color: #b3b6b7">Network Hashrate</h4>
          <h3 style="color: #ff4560">{{ hashRate }} TH/s</h3>
        </div>
        <client-only>
          <component
            style="transform: translateY(30px)"
            :is="apexchart"
            height="150"
            width="320"
            type="bar"
            :key="difficultyKey"
            :options="optionsDifficulty"
            :series="difficultyGraphData[index]"
          />
        </client-only>
        <div class="prime-range">
          <div class="prime-min">
            <h5 style="color: #b3b6b7">Min.</h5>
            <h4 style="color: #00e396">{{ minDifficulty[index] }} H</h4>
          </div>
          <div class="prime-min">
            <h5 style="color: #b3b6b7">Max.</h5>
            <h4 style="color: #775dd0">{{ maxDifficulty[index] }} H</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="prime">
      <div class="prime-left">
        <div>
          <h3 style="color: #b3b6b7">Block gas limit</h3>
          <h2 style="color: #feb019">{{ currentGasLimit[index] }}</h2>
        </div>
        <div>
          <h4 style="color: #b3b6b7">Avg. gas limit</h4>
          <h3 style="color: #feb019">{{ avgGasLimit[index] }} gas</h3>
        </div>
      </div>
      <div class="prime-right">
        <client-only>
          <component
            style="transform: translateY(30px)"
            :is="apexchart"
            height="150"
            width="320"
            type="bar"
            :key="gasLimitKey"
            :options="optionsBlock"
            :series="gasLimitGraphData[index]"
          />
        </client-only>
        <div class="prime-range">
          <div class="prime-min">
            <h5 style="color: #b3b6b7">Min.</h5>
            <h4 style="color: #00e396">{{ minGasLimit[index] }} gas</h4>
          </div>
          <div class="prime-min">
            <h5 style="color: #b3b6b7">Max.</h5>
            <h4 style="color: #775dd0">{{ maxGasLimit[index] }} gas</h4>
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <component
        :is="apexchart"
        height="150"
        width="250"
        type="bar"
        :key="transactionsKey"
        :options="optionsTransactions"
        :series="transactionsGraphData[index]"
      />
      <!-- <component
        :is="apexchart"
        height="150"
        width="250"
        type="bar"
        :options="optionsTPS"
        :series="series"
      /> -->
      <component
        :is="apexchart"
        height="150"
        width="250"
        type="bar"
        :key="gasLimitKey"
        :options="optionsGasSpending"
        :series="gasSpendingGraphData[index]"
      />
      <component
        :is="apexchart"
        height="150"
        width="250"
        type="bar"
        :key="unclesKey"
        :options="optionsUncleCount"
        :series="unclesCountGraphData[index]"
      />
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
export default {
  props: {
    network: String,
  },
  computed: {
    ...mapState('difficulty', [
      'minDifficulty',
      'maxDifficulty',
      'avgDifficulty',
      'currentDifficulty',
      'difficultyKey',
      'difficultyGraphData',
    ]),
    ...mapState('gaslimit', [
      'minGasLimit',
      'maxGasLimit',
      'avgGasLimit',
      'currentGasLimit',
      'gasLimitKey',
      'gasLimitGraphData',
      'gasSpendingGraphData',
    ]),
    ...mapState('transactions', ['transactionsKey', 'transactionsGraphData']),
    ...mapState('uncles', ['unclesKey', 'unclesCountGraphData']),
    apexchart() {
      return () => {
        if (process.client) {
          return import('vue-apexcharts')
        }
      }
    },
  },
  watch: {
    network: {
      immediate: true,
      handler(newVal) {
        this.index = chainSlugs.indexOf(newVal.toLowerCase())
      },
    },
  },
  methods: {
    ...mapActions('difficulty', ['getData', 'getDifficulty']),
  },
  data() {
    return {
      index: 0,
      hashRate: 12,
      avgGasPrice: 10,
      optionsDifficulty: {
        chart: {
          id: 'Difficulty',
          foreColor: '#fff',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        fill: {
          colors: '#ff4560',
        },
        tooltip: {
          theme: 'dark',
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
          },

          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          decimalsInFloat: 2,
          opposite: true,
          labels: {
            show: false,
            offsetX: -10,
          },
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      },
      optionsBlock: {
        chart: {
          id: 'Block',
          foreColor: '#fff',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        fill: {
          colors: '#feb019',
        },
        tooltip: {
          theme: 'dark',
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          decimalsInFloat: 2,
          opposite: true,
          labels: {
            show: false,
            offsetX: -10,
          },
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      },
      optionsTransactions: {
        chart: {
          id: 'transactions',
          foreColor: '#fff',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        title: {
          text: 'Transactions',
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#B3B6B7',
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        fill: {
          colors: '#008FFB',
        },
        tooltip: {
          theme: 'dark',
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
          },

          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          decimalsInFloat: 2,
          opposite: true,
          labels: {
            show: false,
            offsetX: -10,
          },
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      },
      optionsTPS: {
        chart: {
          id: 'tps',
          foreColor: '#fff',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        title: {
          text: 'TPS',
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#B3B6B7',
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        fill: {
          colors: '#00E396',
        },
        tooltip: {
          theme: 'dark',
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
          },

          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          decimalsInFloat: 2,
          opposite: true,
          labels: {
            show: false,
            offsetX: -10,
          },
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      },
      optionsGasSpending: {
        chart: {
          id: 'gasspending',
          foreColor: '#fff',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        title: {
          text: 'Gas Spending',
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#B3B6B7',
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        fill: {
          colors: '#775DD0',
        },
        tooltip: {
          theme: 'dark',
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
          },

          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          decimalsInFloat: 2,
          opposite: true,
          labels: {
            show: false,
            offsetX: -10,
          },
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      },
      optionsUncleCount: {
        chart: {
          id: 'unclecount',
          foreColor: '#fff',
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        title: {
          text: 'Uncle Count',
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#B3B6B7',
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        fill: {
          colors: '#FF4560',
        },
        tooltip: {
          theme: 'dark',
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0,
          },

          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          decimalsInFloat: 2,
          opposite: true,
          labels: {
            show: false,
            offsetX: -10,
          },
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      },
    }
  },
}
</script>

<style scoped>
.prime-network {
  padding: 4%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}
.network-title {
  font-size: 30px;
  color: black;
}
.prime {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.prime-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.prime-right {
  display: flex;
  flex-direction: column;
}
.prime-range {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.prime-min {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
.prime-hashrate {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-left: auto;
}
</style>
