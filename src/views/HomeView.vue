<script setup>
import { ref } from 'vue'
let defCards = [
  {
    prependIcon: 'mdi-clock-outline',
    title: 'mamadjavaad',
  },
  {
    prependIcon: 'mdi-vuejs',
    title: 'vuejs',
  },
  {
    prependIcon: 'mdi-vuetify',
    title: 'vuetifyjs',
  },
]
let searchModel = ref(null)
let searchSubmit = () => {
  alert(searchModel.value)
}

</script>

<template>
  <v-main class="d-flex align-center justify-center flex-column">
    <v-card class="pa-8 d-flex justify-center flex-wrap">
      <v-responsive max-width="550">
        <v-img class="mx-auto mb-11 p-2 search-img" max-height="140" max-width="300"
          src="src/assets/img/githubSearch.png"></v-img>

        <div class="search-box">
          <v-text-field density="compact"  variant="solo"  theme="light" bg-color="#9d9d9d52"
            label="Search github cards" append-inner-icon="mdi-github" single-line hide-details v-model="searchModel" @keydown.enter="searchSubmit"
            @click:append-inner="searchSubmit"></v-text-field>
        </div>

      </v-responsive>
    </v-card>

  </v-main>
</template>

<style lang="scss" scoped>
.v-main {
  backdrop-filter: blur(12px);
  min-height: 100vh;
}

.v-card {
  width: 100%;
  box-shadow: none;
  background: rgba(0, 128, 128, 0);
}

.v-text-field {
  backdrop-filter: blur(20px);
}

.v-field {
  color: #a0a0a0 !important;
}

.search-img {
  background: #9d9d9d52;
  border-radius: 11px;
  backdrop-filter: blur(12px);
}
</style>