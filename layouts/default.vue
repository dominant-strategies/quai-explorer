<template>
  <v-app dark>
    <Nav />
    <v-main class="background">
      <Nuxt />
    </v-main>
    <FootersFloating />
    <FootersBottom />
  </v-app>
</template>

<style>
.background {
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  display: table-cell !important;
}
</style>