<script setup>
import { ref } from 'vue'

// getting time and update it each seconds
const nTime = ref(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds())
setInterval(() => {
  nTime.value = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
}, 1000);

</script>

<template>
    <v-layout>
    <v-system-bar color="#010409" class="d-flex align-center justify-space-between" window>
      <span class="ms-2" title="its just time ⌚ ">{{ nTime }}</span>

      <router-link to="/" title="Home Page 🏡">Github Cards</router-link>
      <v-hover>
        <a title="My github page 🚀" href="https://github.com/mamadjavaad" target=“_blank” class="d-flex">
          <span class="ms-2">github/mamadjavaad</span>

          <v-icon class="ms-2 " icon="mdi-github"></v-icon>
        </a>
      </v-hover>

    </v-system-bar>
    
    <routerView />
    
  </v-layout>
</template>

<style lang="scss" scoped>

.v-layout {
  background: url("./assets/github-bg.webp");
}

</style>
