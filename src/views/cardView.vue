<script setup>
//imports
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { useRoute } from 'vue-router'
//getting param of the page we are in
const route = useRoute()
const username = computed(() => route.params.username)

//using axios as axios.req
const app = getCurrentInstance()
const axios = app.appContext.config.globalProperties.$http
//getting user data
const userData = ref(null)
const getUser = async () => {
  await axios.get('users/' + username.value)
    .then((response) => {
      userData.value = response.data
    })
    .catch((error) => {
      console.log(error.message)
      alert('error')
    })
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <v-main class="d-flex align-center justify-center flex-column">

    <div class="github-box d-flex " v-if="userData && userData.avatar_url">
      <div class="sidebar d-flex flex-column pa-3 align-center ">
        <img :src="userData && userData.avatar_url ? userData.avatar_url : null" alt="profile photo" class="mb-4">
        <span class="mb-0">{{ username }}</span>
        <span class="mb-3 acc-type">{{ userData && userData.type ? userData.type : null }}</span>
        <div class="d-flex flex-wrap justify-space-evenly mb-4 w-100 follow-data">
          <v-icon icon="mdi-account-multiple "></v-icon>
          <span>{{ userData && (userData.followers !== null && userData.followers !== undefined) ?
            userData.followers : 'N/A' }} Followers</span>
          <span>{{ userData && (userData.following !== null && userData.following !== undefined) ?
            userData.following : 'N/A' }} Following</span>
        </div>
        <div class="d-flex flex-wrap justify-center mb-4 w-100 follow-data">
          <v-icon icon="mdi-source-repository" class="mr-2"></v-icon>
          <span>{{ userData && (userData.public_repos !== null && userData.public_repos !== undefined) ?
            userData.public_repos : 'N/A' }} Public repos</span>
        </div>
        <a :href="userData && userData.html_url ? userData.html_url : null" target="_blank">
          <v-btn prepend-icon="mdi-github" variant="" class="mb-4 page-btn">
            Github Page
          </v-btn>
        </a>
        <span class="mb-4 text-center bio" v-if="userData && userData.bio">
          {{ userData && userData.bio ? userData.bio : null }}
        </span>

        <div class="w-100 pa-2 mt-auto  d-flex flex-column flex-wrap user-details">
          <span class="text-center details mb-2">
            <v-icon icon="mdi-id-card " class="mr-2"></v-icon>
            id : {{ userData && userData.id ? userData.id : 'N/A' }}</span>
          <span class="text-center details mb-2">
            <v-icon icon="mdi-account"></v-icon>
            Fullname : {{ userData && userData.name ? userData.name : 'N/A' }}</span>
        <span   v-if="userData.email" class="text-center details mb-2">
          <v-icon icon="mdi-email" class="mr-2"></v-icon>
email : {{ userData && userData.email ? userData.email : 'N/A' }}

        </span>
            <span class="text-center details mb-2" v-if="userData.location">
            <v-icon icon="mdi-pin" class="mr-2"></v-icon>
            location : {{ userData && userData.location ? userData.location : 'N/A' }}</span>
            <span  class="text-center details mb-2" v-if="userData.blog">
            <v-icon icon="mdi-post"></v-icon>
              blog : <a class="text-grey" target="_blank" :href="userData && userData.blog ?userData.blog :'' ">link</a></span>
        </div>


      </div>
    </div>

    <div v-if="!userData || !userData.avatar_url">
      <div class="loading d-flex justify-center align-center">
        <v-progress-circular indeterminate color="white" :size="50"></v-progress-circular>
      </div>
    </div>
  </v-main>
</template>

<style lang="scss" scoped>
.v-main {
  min-height: 100vh;
}

.loading {
  background: #9d9d9d52;
  border-radius: 11px;
  backdrop-filter: blur(12px);
  width: 100px;
  height: 100px;
}

.github-box {
  border: 1px solid $boxborderColor;
  width: 42%;
  border-radius: 5px;
  background-color: $boxbackgroundColor;
  backdrop-filter: blur(20px);
  color: white;

  .sidebar {
    width: 35%;
    height: inherit;
    border-right: 1px solid $boxborderColor;

    img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 1px solid $boxborderColor;
    }

    .acc-type {
      opacity: 0.6;
      font-size: 13.3px;
    }


    .follow-data {
      font-size: 13.3px;
    }

    a {
      .page-btn {
        border: 1px solid $boxborderColor;
        background: rgba(185, 186, 187, 0.1019607843);
      }
    }


    .bio,
    .details {
      font-size: 14px;
    }

    .user-details {
      border-top: 1px solid rgba(185, 186, 187, 0.1019607843);
    }
  }


}
</style>