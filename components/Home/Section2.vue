<template>
    <div class="quai-info">
        <v-card class="blocks-card">
            <v-card-title class="title"> Blocks </v-card-title>
            <v-data-table
            :headers="headersblock"
            :items="blocks"
            :items-per-page="5"
            class="elevation-1"
            dense
            ></v-data-table>
        </v-card>
        <v-card class="blocks-card">
            <v-card-title class="title"> Transactions </v-card-title>
            <v-data-table
            :headers="headerstx"
            :items="transactions"
            :items-per-page="5"
            class="elevation-1"
            dense
            ></v-data-table>
        </v-card>
    </div>
</template>

<script>

export default ({
    data () {
      return {
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
        headerstx:[
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
        blocks: [
            {
            location: "Prime",
            miner: "0xdhwfjhkjwhfw",
            txs: 100,
            timestamp: "12:34:09"
        },

            {
            location: "Region",
            miner: "0xdhwfjhkjwhfw",
            txs: 100,
            timestamp: "12:34:09"
        },
            {
            location: "Zone",
            miner: "0xdhwfjhkjwhfw",
            txs: 100,
            timestamp: "12:34:09"
        }
        ],
        transactions: [
            {
                hash:"0xcdjwjdljwlkjdklwjgh686t4862g4i2g4",
                block:"2345",
                sent: "1.34",
                burnt: "0.24"
            },
            {
                hash:"0xcdjwjdljwlkjdklwjgh686t4862g4i2g4",
                block:"2345",
                sent: "1.34",
                burnt: "0.24"
            },
            {
                hash:"0xcdjwjdljwlkjdklwjgh686t4862g4i2g4",
                block:"2345",
                sent: "1.34",
                burnt: "0.24"
            },
        ]
      }
    },
  })
</script>


<style scoped>

.quai-info{
    padding: 5px; 
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px;
}

.blocks-card{
    -webkit-box-shadow: 0 0 20px#dda50a !important;
    -moz-box-shadow: 0 0 20px #dda50a !important;
    box-shadow: 0 0 20px #dda50a !important;
    background-color: black;
    width: 80vh;
    border-radius: 25px;
    display: grid;
    align-items: center;
    margin: 20px;
}

.title{
    color: orange;
}

@media (max-width: 1000px) {
.quai-info{
    padding: 5px; 
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:center;
    margin: 20px; 
}
}

</style>