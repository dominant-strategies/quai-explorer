<template>
  <div style="height: 100%; overflow-y: scoll">
    <HomeInfo id="home-1" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Network Stats',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Home',
          name: 'Home',
          content:
            'Quai is a scalable network of blockchains designed for the future. Visit our site to learn more!',
        },
        {
          name: 'dmca-site-verification',
          content: 'R2dCZFNJdkNQOUFMYndpZTlOYk0xdz090',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
