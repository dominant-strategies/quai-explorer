<template>
  <div class="block-details">
    <h2>Block #{{ blockNo }}</h2>
    <v-simple-table class="block-table elevation-1">
      <template v-slot:default>
        <tbody>
          <tr v-for="item in blockDetails" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
const blockDetails = [
  {
    name: 'Block Height',
    value: 13499990,
  },
  {
    name: 'Timestamp',
    value: '53 secs ago (Oct-27-2021 02:40:20 PM +UTC)',
  },
  {
    name: 'Transactions',
    value:
      '507 transactions and 104 contract internal transactions in this block',
  },
  {
    name: 'Mined by',
    value: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5 (Nanopool) in 1 secs',
  },
  {
    name: 'Block Reward',
    value:
      '2.817340202698361849 Ether (2 + 5.539228950545775165 - 4.721888747847413316)',
  },
  {
    name: 'Uncles Reward',
    value: 0,
  },
  {
    name: 'Difficulty',
    value: '10,241,352,357,269,457',
  },
  {
    name: 'Total Difficulty',
    value: '33,215,734,136,291,425,914,868',
  },
  {
    name: 'Size',
    value: '121,665 bytes',
  },
  {
    name: 'Gas Used',
    value: '29,943,404 (99.81%) +100% Gas Target',
  },
  {
    name: 'Gas Limit',
    value: '30,000,000',
  },
  {
    name: 'Base Fee Per Gas',
    value: '0.000000157693786179 Ether (157.693786179 Gwei)',
  },
  {
    name: 'Burnt Fees',
    value: '4.721888747847413316 Ether',
  },
  {
    name: 'Extra Data',
    value: 'nanopool.org (Hex:0x6e616e6f706f6f6c2e6f7267)',
  },
  {
    name: 'Hash',
    value: '0xc787926007614156b45f91ba5df53bd44dedd66765e2364f81ba1e7b8ee9b76f',
  },
  {
    name: 'Parent Hash',
    value: '0x55b1dec9ae49222fb45472e7a0446d938c7d4c354c2cc701fb6e9e9ce4f59213',
  },
  {
    name: 'Sha3Uncles',
    value: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  },
  {
    name: 'StateRoot',
    value: '0x862837b1dea0b52b5184e708e59dae2e9a65863d626776d61c6d7149cb13f433',
  },
  {
    name: 'Nonce',
    value: '0xad28698fab38360d',
  },
]

export default {
  data() {
    return {
      blockNo: this.$route.query.bno,
      blockDetails: blockDetails,
    }
  },
}
</script>

<style scoped>
.block-table {
  border: black;
}
.block-details {
  margin: 3%;
}
</style>
