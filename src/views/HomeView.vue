<script setup>
// import { ref} from 'vue'

</script>

<template>

    <v-main class="d-flex align-center justify-center flex-column">
      <div class="search-box">
        <v-text-field
        bg-color="#ffffff30"
        density="compact"
        variant="solo"
        label="Search github cards"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
      </div>

  
    </v-main>
</template>

<style lang="scss" scoped>
.v-main {
  min-height: 100vh;
}
.search-box {
  width: 35%;
 .v-text-field{
  backdrop-filter: blur(20px);
 }
}

</style>