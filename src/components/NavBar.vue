<template>
  <v-app-bar color="primary" flat style="z-index: 1006;">
    <v-app-bar-title class="user-select-none font-weight-bold">
      REST-API-BANK
    </v-app-bar-title>

    <div v-if="username" class="text-center text-h6 font-weight-medium flex-grow-1">
      {{ username }}
    </div>

    <template #append>
      <v-btn
        v-if="username"
        color="white"
        prepend-icon="mdi-logout"
        variant="outlined"
        @click="logout"
      >
        Log out
      </v-btn>

      <v-btn
        v-else
        color="white"
        prepend-icon="mdi-login"
        variant="outlined"
        @click="openAuthor"
      >
        Log in
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const username = computed(() => store.state.cust.username)

  function openAuthor () {
    store.commit('modal/openAuthor')
  }

  function logout () {
    store.dispatch('cust/logout')
  }
</script>

<style scoped>
.user-select-none {
  user-select: none;
}
</style>
