<script setup>
//imports
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { useRoute } from 'vue-router'
import norepos from '@/assets/norepos.webp'
import notfound from '@/assets/notfound.webp'
import { mdiAccountMultiple } from '@mdi/js'
import { mdiSourceRepository } from '@mdi/js'
import { mdiIdCard } from '@mdi/js'
import { mdiAccount } from '@mdi/js'
import { mdiEmail } from '@mdi/js'
import { mdiPin } from '@mdi/js'
import { mdiPost } from '@mdi/js'
import { mdiCheckboxBlankBadgeOutline } from '@mdi/js'
// avatar loading data
const avatarLoad = ref(false)
const imageToggle = () => {
  avatarLoad.value = true
}
//getting param of the page we are in
const route = useRoute()
const username = computed(() => route.params.username)
//using axios as axios.req
const app = getCurrentInstance()
const axios = app.appContext.config.globalProperties.$http
//getting user data
const userData = ref(null)
const errorData = ref(false)
const getUser = async () => {
  await axios.get('users/' + username.value)
    .then((response) => {
      userData.value = response.data
    })
    .catch((error) => {
      console.log(error.message)
      errorData.value = true
    })
}
//getting repos data
const repoData = ref(null)

const getRepo = async () => {
  await axios.get('users/' + username.value + '/repos')
    .then((response) => {
      repoData.value = response.data
    })
    .catch((error) => {
      console.log(error.message)
    })
}
//running get functions on mounted
onMounted(() => {
  getUser()
  getRepo()
})
</script>

<template>
  <v-main class="d-flex align-center justify-center flex-column" :class="errorData ? 'error-container' : ''">

    <div class="github-box d-flex " v-if="userData && repoData">
      <div class="sidebar d-flex flex-column pa-3 align-center ">
        <img v-show="avatarLoad" @load="imageToggle" :src="userData && userData.avatar_url ? userData.avatar_url : null"
          alt="profile photo" class="mb-4">
        <div class="loading d-flex justify-center align-center rounded-circle" v-if="!avatarLoad">
          <v-progress-circular indeterminate color="white" :size="50"></v-progress-circular>
        </div>

        <span class="mb-0">{{ username }}</span>
        <span class="mb-3 acc-type">{{ userData && userData.type ? userData.type : null }}</span>
        <div class="d-flex flex-wrap justify-space-evenly mb-4 w-100 follow-data">
          <v-icon :icon="mdiAccountMultiple"></v-icon>
          <span>{{ userData && (userData.followers !== null && userData.followers !== undefined) ?
            userData.followers : 'N/A' }} Followers</span>
          <span>{{ userData && (userData.following !== null && userData.following !== undefined) ?
            userData.following : 'N/A' }} Following</span>
        </div>
        <div class="d-flex flex-wrap justify-center mb-4 w-100 follow-data">
          <v-icon :icon="mdiSourceRepository" class="mr-2"></v-icon>
          <span>{{ userData && (userData.public_repos !== null && userData.public_repos !== undefined) ?
            userData.public_repos : 'N/A' }} Public repos</span>
        </div>
        <a :href="userData && userData.html_url ? userData.html_url : null" target="_blank">
          <v-btn prepend-icon="$mdiGithub" variant="elevated" class="mb-4 page-btn">
            Github Page
          </v-btn>
        </a>
        <span class="mb-4 text-center bio" v-if="userData && userData.bio">
          {{ userData && userData.bio ? userData.bio : null }}
        </span>

        <div class="w-100 pa-2 mt-auto  d-flex flex-column flex-wrap user-details">
          <span class="text-center details mb-2">
            <v-icon :icon="mdiIdCard" class="mr-2"></v-icon>
            id : {{ userData && userData.id ? userData.id : 'N/A' }}</span>
          <span class="text-center details mb-2" v-if="userData.name">
            <v-icon :icon="mdiAccount"></v-icon>
            Fullname : {{ userData && userData.name ? userData.name : 'N/A' }}</span>
          <span v-if="userData.email" class="text-center details mb-2">
            <v-icon :icon="mdiEmail" class="mr-2"></v-icon>
            email : {{ userData && userData.email ? userData.email : 'N/A' }}
          </span>
          <span class="text-center details mb-2" v-if="userData.location">
            <v-icon :icon="mdiPin" class="mr-2"></v-icon>
            location : {{ userData && userData.location ? userData.location : 'N/A' }}</span>
          <span class="text-center details mb-2" v-if="userData.blog">
            <v-icon :icon="mdiPost"></v-icon>
            blog : <a class="text-grey" target="_blank"
              :href="userData && userData.blog ? userData.blog : ''">link</a></span>
        </div>
      </div>
      <div class="public-repos d-flex flex-column " v-if="repoData.length > 0">
        <h3>Public repos</h3>
        <div class=" w-100 d-flex flex-wrap justify-space-between repos-container">
          <div class="repo mt-3 pa-2 d-flex flex-column" v-for="repo in repoData" :key="repo">
            <a target="_blank" :href="repo.html_url" class="text-blue">{{ repo.name }}</a>
            <span class="mb-1 subtext" v-if="repo.fork">Forked</span>
            <span class="mb-1 subtext">{{ repo.description }}</span>
            <div class="w-100" v-if="repo.language">
              <v-icon class=" subtext text-black" :icon="mdiCheckboxBlankBadgeOutline"></v-icon>
              <span class="subtext pa-2" v-if="repo.language">{{ repo.language }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!(repoData.length > 0)" class="d-flex justify-center align-center public-repos">
        <div class="text-center">
          <v-img title="github octocat🐙😺" :src="norepos" aspect-ratio="1" class="mx-auto"></v-img>
          <h2 class="title mt-3">No Repos found </h2>
          <p>Please check back later.</p>
        </div>

      </div>
    </div>
    <div v-if="(!userData || !repoData) && errorData === false">
      <div class="loading d-flex justify-center align-center">
        <v-progress-circular indeterminate color="white" :size="50"></v-progress-circular>
      </div>
    </div>

    <div class="error-box px-3 d-flex justify-center align-center" v-if="errorData">
      <div class="text-center">
        <v-img title="github octocat🐙😺" :src="notfound" aspect-ratio="2" class="mx-auto"></v-img>
        <h2 class="title mt-3 ">User doesn’t exist. </h2>
        <p>This Username doesn’t exist in Github</p>
        <router-link to="/">
          <v-btn prepend-icon="$mdiGithub" variant="elevated" class="mt-3 page-btn">
            Retun to search
          </v-btn>
        </router-link>
      </div>
    </div>

  </v-main>
</template>

<style lang="scss" scoped>
.v-main {
  min-height: 100vh;
}

.error-container {
  backdrop-filter: blur(20px);
}

.loading {
  background: #9d9d9d52;
  border-radius: 11px;
  backdrop-filter: blur(12px);
  width: 100px;
  height: 100px;
}

.error-box {
  border: 1px solid $boxborderColor;
  height: 365px;
  width: 100%;
  border-radius: 5px;
  padding: 8px;
  background-color: $boxbackgroundColor;
  backdrop-filter: blur(20px);
  color: white;

  .page-btn {
    border: 1px solid $boxborderColor;
    color: white !important;
    background: rgba(185, 186, 187, 0.1019607843);
  }
}

.github-box {
  border: 1px solid $boxborderColor;
  width: 95%;
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
        color: white !important;
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

  .public-repos {
    width: 65%;
    height: inherit;
    padding: 12px;

    .repos-container {
      max-height: 450px;
      overflow-y: auto;

      .repo {
        width: 49%;
        // height: 150px;
        border-radius: 5px;
        border: 1px solid $boxborderColor;
        background: #b9babb24;

        .subtext {
          opacity: 0.6;
          font-size: 11.5px;
        }

      }
    }


  }
}

//responsivity
@media screen and (min-width: 650px) {
  .github-box {
    max-width: 920px;
    min-width: 620px;
    backdrop-filter: blur(80px) !important;
  }
}

@media screen and (max-width:650px) {
  .github-box {
    flex-direction: column !important;
    background: none;
    border: 0;
  }

  .sidebar,
  .public-repos {
    width: 100% !important;
    margin-top: 15px;
    border: 1px solid $boxborderColor;
    background: $boxbackgroundColor;
    border-radius: 5px;
  }

  .repo {
    width: 100% !important;
  }
}
</style>