<script setup> 
import { ref, onMounted, getCurrentInstance } from 'vue'
const app = getCurrentInstance()
const axios = app.appContext.config.globalProperties.$http
//getting user data
const userData = ref(null)
const getUser = async () => {
  await axios.get('users/mamadjavaad')
    .then((response) => {
      userData.value = response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}

onMounted(() => {
  getUser()
})
</script>

<template>
    <v-main class="d-flex align-center justify-center flex-column">

      <div class="github-box d-flex ">
        <img :src="userData && userData.avatar_url ? userData.avatar_url : null" alt="profile">
      </div>
    </v-main>
</template>

<style lang="scss" scoped>
.v-main {
  min-height: 100vh;
}
.github-box {
  border: 1px solid $boxborderColor;
  width: 42%;
  height: 550px;
  border-radius: 5px;
  background-color: $boxbackgroundColor;
  backdrop-filter: blur(20px);
  color: white;

  img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 1px solid $boxborderColor;
  }
}
</style>