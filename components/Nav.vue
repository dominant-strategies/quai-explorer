<template>
  <v-app-bar
    hide-on-scroll
    fixed
    app
    style="background-color: rgba(0, 0, 0, 0.2); max-width: 100vw !important"
  >
    <LogosQuaiRound style="cursor: pointer" />
    <h5 class="network-stats">Quai Netstats</h5>
    <div
      style="
        margin-left: 24%;
        margin-right: 30%;
        width: 40%;
        display: flex;
        justify-content: space-around;
      "
    >
      <v-btn class="header-text" color="white" text rounded nuxt to="/">
        Home
      </v-btn>
      <v-btn class="header-text" color="white" text rounded nuxt to="/chains">
        Chains
      </v-btn>
      <v-btn class="header-text" color="white" text rounded nuxt to="/network">
        Network
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    openLink(link) {
      window.open(link, '_blank')
    },
  },
}
</script>

<style>
.network-stats {
  font-size: 1rem;
}

@media (max-width: 700px) {
  .header-text {
    font-size: 10px !important;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    padding-left: 2px;
    padding-right: 2px;
  }
}
</style>
