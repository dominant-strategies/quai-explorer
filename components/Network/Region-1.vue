<template>
  <div class="prime-network">
    <div>
      <h3 style="color: #b3b6b7">Total Number of Miners</h3>
      <h2 style="color: #008ffb"># {{ totalMiners }}</h2>
    </div>
    <div class="prime">
      <div class="prime-left">
        <div>
          <h3 style="color: #b3b6b7">Difficulty</h3>
          <h2 style="color: #ff4560">{{ currentDifficulty }} PH</h2>
        </div>
        <div>
          <h4 style="color: #b3b6b7">Avg. Difficulty</h4>
          <h3 style="color: #ff4560">{{ avgDifficulty }} PH</h3>
        </div>
      </div>
      <div class="prime-right">
        <div class="prime-hashrate">
          <h4 style="color: #b3b6b7">Network Hashrate</h4>
          <h3 style="color: #ff4560">{{ hashRate }} TH/s</h3>
        </div>
        <component
          style="transform: translateY(30px)"
          :is="apexchart"
          height="150"
          width="320"
          type="bar"
          :options="optionsDifficulty"
          :series="series"
        />
        <div class="prime-range">
          <div class="prime-min">
            <h5 style="color: #b3b6b7">Min.</h5>
            <h4 style="color: #00e396">{{ minDifficulty }} PH</h4>
          </div>
          <div class="prime-min">
            <h5 style="color: #b3b6b7">Max.</h5>
            <h4 style="color: #775dd0">{{ maxDifficulty }} PH</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="prime">
      <div class="prime-left">
        <div>
          <h3 style="color: #b3b6b7">Block gas limit</h3>
          <h2 style="color: #feb019">{{ blockGasLimit }}</h2>
        </div>
        <div>
          <h4 style="color: #b3b6b7">Avg. gas limit</h4>
          <h3 style="color: #feb019">{{ avgGasLimit }} gas</h3>
        </div>
      </div>
      <div class="prime-right">
        <div class="prime-hashrate">
          <h4 style="color: #b3b6b7">Avg. gas price</h4>
          <h3 style="color: #feb019">{{ avgGasPrice }} Gwei</h3>
        </div>
        <component
          style="transform: translateY(30px)"
          :is="apexchart"
          height="150"
          width="320"
          type="bar"
          :options="optionsBlock"
          :series="series"
        />
        <div class="prime-range">
          <div class="prime-min">
            <h5 style="color: #b3b6b7">Min.</h5>
            <h4 style="color: #00e396">{{ minGas }} gas</h4>
          </div>
          <div class="prime-min">
            <h5 style="color: #b3b6b7">Max.</h5>
            <h4 style="color: #775dd0">{{ maxGas }} gas</h4>
          </div>
        </div>
      </div>
    </div>
    <component
      :is="apexchart"
      height="150"
      width="250"
      type="bar"
      :options="optionsTransactions"
      :series="series"
    />
    <component
      :is="apexchart"
      height="150"
      width="250"
      type="bar"
      :options="optionsTPS"
      :series="series"
    />
    <component
      :is="apexchart"
      height="150"
      width="250"
      type="bar"
      :options="optionsGasLimit"
      :series="series"
    />
    <component
      :is="apexchart"
      height="150"
      width="250"
      type="bar"
      :options="optionsUncleCount"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  computed: {
    apexchart() {
      return () => {
        if (process.client) {
          return import('vue-apexcharts')
        }
      }
    },
  },
  data() {
    return {
      totalMiners: 135,
      currentDifficulty: 123,
      avgDifficulty: 121,
      hashRate: 12,
      minDifficulty: 7.90367,
      maxDifficulty: 9.44556,
      blockGasLimit: '30,000,000',
      avgGasLimit: '24,456,345',
      avgGasPrice: '23,454,898',
      minGas: '29,980,803',
      maxGas: '29,980,803',
      optionsDifficulty: {
        chart: {
          id: 'Difficulty',
          foreColor: '#fff',
          toolbar: {
            show: false,
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
      optionsGasLimit: {
        chart: {
          id: 'gaslimit',
          foreColor: '#fff',
          toolbar: {
            show: false,
          },
        },
        title: {
          text: 'Gas Limit',
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
      series: [
        {
          name: 'Difficulty',
          data: [
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
            {
              x: '2018-09-10',
              y: 120,
            },
            {
              x: '2018-09-11',
              y: 480,
            },
            {
              x: '2018-09-12',
              y: 330,
            },
          ],
        },
      ],
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
