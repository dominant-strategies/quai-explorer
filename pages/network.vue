<template>
   <div>
    <v-toolbar
    >
      <template>
        <v-tabs
          align-with-title
        >
          <v-tabs-slider color="orange"></v-tabs-slider>
          <v-tab
            v-for="item in items"
            :key="item"
            @click="selected=item;"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <component :is="componentInstance" /> 
    </div> 
</template>

<script>
export default {
  computed: {
    componentInstance () {
      const selected = this.selected;
      return () => import(`../components/Network/${selected}`)
    }
  },
  data(){
      return {
      items: [ "Prime", "Region-1", "Region-2", "Region-3", "Zone-1-1", "Zone-1-2", "Zone-1-3", "Zone-2-1", "Zone-2-2", "Zone-2-3", "Zone-3-1", "Zone-3-2", "Zone-3-3"],
      selected: "Prime" 
      }
  },
} 
</script>