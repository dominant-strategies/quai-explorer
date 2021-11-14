<template>
  <v-app-bar
    hide-on-scroll
    fixed
    app
    style="background-color: white; max-width: 100vw !important"
  >
    <LogosQuaiRound style="cursor: pointer" />
    <div
      style="
        margin-left: 24%;
        margin-right: 30%;
        width: 40%;
        display: flex;
        justify-content: space-around;
      "
    >
      <v-btn class="header-text" color="black" text rounded nuxt to="/">
        Explorer
      </v-btn>
      <v-btn class="header-text" color="black" text rounded nuxt to="/network">
        Network Stats
      </v-btn>
      <v-btn class="header-text" color="black" text rounded nuxt to="/chains">
        Chains
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
  font-size: 1.5rem;
  width: 300px;
  left: 10vw;
  position: absolute;
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
