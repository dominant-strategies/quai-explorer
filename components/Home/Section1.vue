<template>
    <div class="main-info">
    <v-card class="total-blocks-card" elevation="2">
        <v-card-title class="title"> Total Blocks </v-card-title>
        <v-card-text class="text">
            {{blocks}}
        </v-card-text>
    <v-sparkline
      :auto-draw-duration="drawDuration" 
      :value="value"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
    ></v-sparkline>
    </v-card> 
    <v-card class="total-transactions-card" elevation="2">
        <v-card-title class="title"> Total Transactions</v-card-title>
        <v-card-text class="text">
            {{transactions}}
        </v-card-text>
    <v-sparkline
      :auto-draw-duration="drawDuration" 
      :value="value"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
    ></v-sparkline>
    </v-card> 
    <v-card class="total-tps-card" elevation="2">
        <v-card-title class="title">Network TPS</v-card-title>
        <v-card-text class="text">
            {{tps}}
        </v-card-text>
    <v-sparkline
      :auto-draw-duration="drawDuration" 
      :value="value"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
    ></v-sparkline>
    </v-card> 
    </div>
</template>

<script>

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
    data() {
        return {
            drawDuration: 5000,
            blocks: 11000,
            transactions: 20000454,
            tps: 1000,
            width: 2,
            radius: 10,
            padding: 8,
            lineCap: 'round',
            gradient: gradients[5],
            value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
            gradientDirection: 'top',
            gradients,
            fill: false,
            type: 'trend',
            autoLineWidth: false,
        }
    }
}
</script>


<style scoped>

.main-info {
    padding: 5px; 
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px;
}

.total-blocks-card {
    -webkit-box-shadow: 0 0 20px#dda50a !important;
    -moz-box-shadow: 0 0 20px #dda50a !important;
    box-shadow: 0 0 20px #dda50a !important;
    background-color: black;
    width: 40vh;
    height: 30vh;
    border-radius: 25px;
    display: grid;
    align-items: center;
    margin: 20px;
}
.total-transactions-card {
    -webkit-box-shadow: 0 0 20px#dda50a !important;
    -moz-box-shadow: 0 0 20px #dda50a !important;
    box-shadow: 0 0 20px #dda50a !important;
    background-color: black;
    width: 40vh;
    height: 30vh;
    border-radius: 25px;
    display: grid;
    align-items: center;
    margin: 20px;
}
.total-tps-card {
    -webkit-box-shadow: 0 0 20px#dda50a !important;
    -moz-box-shadow: 0 0 20px #dda50a !important;
    box-shadow: 0 0 20px #dda50a !important;
    background-color: black;
    width: 40vh;
    height: 30vh;
    border-radius: 25px;
    display: grid;
    align-items: center;
    margin: 20px;
}

.title{
    color: orange;
}

.text{
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

/* Landscape phones and portrait tablets */
@media (max-width: 767px) {
    .total-blocks-card {
        width: 35vh;
    }
    .total-transactions-card{
        width: 35vh;
    }
    .total-tps-card{
        width:35vh;
    }
}

/* Portrait phones and smaller */
@media (max-width: 480px) {
    .total-blocks-card {
        width: 30vh;
    }
    .total-transactions-card{
        width: 30vh;
    }
    .total-tps-card{
        width:30vh;
    }
}

</style>