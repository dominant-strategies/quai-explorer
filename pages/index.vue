<template>
    <div style="height: 100%; overflow-y: scoll">
        <div class="nav">
            <LogosQuaiRound id="home" />
            <h1 class="heading"> Quai Network Stats </h1>
        </div>
        <HomeSection1 id="home-1" />
        <HomeSection2 id="home-2" />
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

<style scoped>
.nav {
    display: flex;
}

.heading{
    color: rgba(0, 218, 189, 0.582);
    display: grid;
    font-family: Arial, Helvetica, sans-serif;
    align-content: center;
}
</style>