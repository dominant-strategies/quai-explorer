<template>
  <v-footer dark padless style="height: 100%; margin-top: 10%">
    <v-card flat tile class="footer-card lighten-1 white--text text-center">
      <v-card-text class="white--text pt-0">
        <v-row>
          <v-col v-for="(list, i) in lists" :key="i">
            <v-row v-for="item in list" :key="item.title">
              <v-btn
                @click="openLink(item.internal, item.link)"
                color="white"
                text
                rounded
                class="my-2"
              >
                <v-col class="footer-column">{{ item.title }} </v-col>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        <a
          href="//www.dmca.com/Protection/Status.aspx?ID=6d1b5298-cc9d-4f02-b8fa-12f2878950b4"
          title="DMCA.com Protection Status"
          class="dmca-badge"
        >
          <img
            src="https://images.dmca.com/Badges/dmca-badge-w150-5x1-11.png?ID=6d1b5298-cc9d-4f02-b8fa-12f2878950b4"
            alt="DMCA.com Protection Status"
        /></a>
        <div>
          The entirety of this site is protected by copyright ©
          {{ new Date().getFullYear() }} Dominant Strategies. All rights
          reserved.
        </div>
      </v-card-text>
    </v-card>
    <v-row justify="center" no-gutters></v-row>
  </v-footer>
</template>

<script>
export default {
  head: {
    script: [
      {
        src: 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js',
      },
    ],
  },
  data: () => ({
    lists: [
      [
        { title: 'FAQs', internal: true, link: 'faq' },
        { title: 'Wallet Setup', link: '' },
        {
          title: 'Developer Docs',
          link: 'https://docs.quai.network/',
        },
        { title: 'Block Explorer', link: '' },
        { title: 'Network Analyzer', link: '' },
      ],
      [
        { title: 'Mission', link: '' },
        { title: 'Careers', link: '' },
      ],
      [
        { title: 'Twitter', link: 'https://twitter.com/QuaiNetwork' },
        { title: 'Discord', link: 'https://discord.gg/ngw88VXXnV' },
        { title: 'Medium', link: 'https://medium.com/quai-network' },
      ],
    ],
  }),
  methods: {
    openLink(internal, link) {
      if (link) {
        if (internal) {
          this.$router.push({ name: link })
        } else {
          window.open(link, '_blank')
        }
      }
    },
  },
}
</script>

<style scoped>
.footer-card {
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 15%;
  padding-right: 15%;
}

.footer-column {
  text-align: left !important;
  width: 10vw;
}

@media (max-width: 700px) {
  .footer-card {
    padding-left: 5%;
    padding-right: 5%;
  }

  .footer-column {
    font-size: 12px !important;
  }
}
</style>
