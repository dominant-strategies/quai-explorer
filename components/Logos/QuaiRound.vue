<template>
  <img
    @click="clickedLogo"
    class="quai-logo"
    alt="Quai Logo"
    src="/quai-rounded-logo.svg"
  />
</template>

<script>
export default {
  methods: {
    clickedLogo() {
      this.$router.replace('/')
    },
  },
}
</script>

<style scoped>
.quai-logo {
  height: 80px;
}
@media (max-width: 700px) {
  .quai-logo {
    height: 50px;
  }
}
</style>