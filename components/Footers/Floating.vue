<template>
  <v-card
    flat
    tile
    class="lighten-1 white--text text-center footer-style"
    style="border-radius: 25px !important"
  >
    <v-card-text>
      <v-btn
        v-for="icon in icons"
        :key="icon.icon"
        class="mx-1 white--text"
        icon
      >
        <v-icon size="24px" @click="openLink(icon.link)">
          {{ icon.icon }}
        </v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    icons: [
      { icon: 'mdi-discord', link: 'https://discord.gg/ngw88VXXnV' },
      { icon: 'mdi-github', link: ' ' },
      { icon: 'mdi-twitter', link: 'https://twitter.com/QuaiNetwork' },
      // { icon: 'mdi-instagram', link: ' ' },
    ],
  }),
  methods: {
    openLink(link) {
      window.open(link, '_blank')
    },
  },
}
</script>

<style scoped>
.footer-style {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: none;
  -webkit-box-shadow: 0 0 5px white !important;
  -moz-box-shadow: 0 0 5px white !important;
  box-shadow: 0 0 5px white !important;
}
</style>
