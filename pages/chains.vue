<template>
  <v-data-table
    :headers="headers"
    :items="chains"
    :items-per-page="20"
    class="chains"
    hide-default-footer
  ></v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('sockets', ['sockets']),
  },
  mounted() {
    if (this.sockets.length != 13) {
      this.createSockets()
    }
  },
  methods: {
    ...mapActions('sockets', ['createSockets']),
  },
  data() {
    return {
      headers: [
        {
          text: 'Chain',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: '# Addresses',
          align: 'start',
          sortable: false,
          value: 'noAddress',
        },
        { text: '# Transactions', value: 'noTransactions' },
        { text: '# Outgoing ETxs', value: 'noOutgoing' },
        { text: 'The total hashrate of each blockchain', value: 'hashrate' },
        { text: 'Current block reward', value: 'blockReward' },
        { text: 'Current block time', value: 'blockTime' },
      ],
      chains: [
        {
          name: 'Prime',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Region-1',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Region-2',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Region-3',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-1-1',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-1-2',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-1-3',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-2-1',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-2-2',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-2-3',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-3-1',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-3-2',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
        {
          name: 'Zone-3-3',
          noAddress: '30',
          noTransactions: 159,
          noIncoming: 6.0,
          noOutgoing: 24,
          hashrate: 4.0,
          blockReward: '13',
          blockTime: '300s',
        },
      ],
    }
  },
}
</script>
<style scoped>
.chains {
  padding: 4%;
}
</style>
