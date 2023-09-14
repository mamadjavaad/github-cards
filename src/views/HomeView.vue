<script setup>
//imports
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import githubSearch from '@/assets/githubSearch.png'
//using router to push client to the search he did
const router = useRouter()
let searchModel = ref(null)
let snackbarError = ref(false)
let searchSubmit = () => {
  let validRegex = /^(?=.*[a-zA-Z0-9-])[a-zA-Z0-9\s-]{1,39}$/i
  if (!(validRegex.test(searchModel.value))) {
    snackbarError.value = true
  } else {
    if (searchModel.value.includes(' ')) {
      router.push('/' + searchModel.value.split(" ").join(''))
    } else {
      router.push('/' + searchModel.value)
    }

  }
}


</script>

<template>
  <v-main class="d-flex align-center justify-center flex-column">
    <v-card class="pa-8 d-flex justify-center flex-wrap">
      <v-responsive max-width="550">
        <v-img class="mx-auto mb-11 p-2 search-img" max-height="140" max-width="300"
          :src="githubSearch"></v-img>
        <div class="search-box">
          <v-text-field density="compact" variant="solo" theme="light" bg-color="#9d9d9d52" label="Search github cards"
            append-inner-icon="$mdiGithub" single-line hide-details v-model="searchModel" @keydown.enter="searchSubmit"
            @click:append-inner="searchSubmit"></v-text-field>
        </div>

      </v-responsive>
    </v-card>
    <v-snackbar :timeout="2000" color="#dc3545" location="bottom left" v-model="snackbarError"
      @click="snackbarError = false" :absolute="true" class="ma-6">
      <v-icon icon="mdi-alert-octagon"></v-icon>
      This type of username is invalid!
    </v-snackbar>
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

.v-snackbar {
  cursor: pointer;
  color: white !important;
}

.search-img {
  background: #9d9d9d52;
  border-radius: 11px;
  backdrop-filter: blur(12px);
}
</style>