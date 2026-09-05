<template>
  <v-dialog v-model="authorOpen" max-width="400px" persistent>
    <v-card class="pa-2">
      <v-card-title class="d-flex align-center">
        <span>Authorization</span>
        <v-spacer />
        <v-btn icon="mdi-close" variant="text" @click="close" />
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="name"
          class="mb-2"
          density="comfortable"
          label="Name"
          variant="underlined"
        />

        <v-text-field
          v-model="password"
          density="comfortable"
          label="Password"
          type="password"
          variant="underlined"
        />
      </v-card-text>

      <v-card-actions class="justify-end pr-6 pb-4">
        <v-btn
          class="mr-2"
          color="primary"
          prepend-icon="mdi-login"
          variant="outlined"
          @click="handleLogin"
        >
          Log in
        </v-btn>

        <v-btn
          color="secondary"
          prepend-icon="mdi-account-plus"
          variant="outlined"
          @click="handleRegister"
        >
          Sign up
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const authorOpen = computed({
    get: () => store.state.modal.authorOpen,
    set: val => {
      if (!val) close()
    },
  })

  const name = ref('')
  const password = ref('')

  // Reset inputs when dialog opens
  watch(authorOpen, newVal => {
    if (newVal) {
      name.value = ''
      password.value = ''
    }
  })

  function close () {
    store.commit('modal/closeAuthor')
  }

  function handleLogin () {
    close()
    store.dispatch('cust/login', { name: name.value, password: password.value })
  }

  function handleRegister () {
    close()
    store.dispatch('cust/register', { name: name.value, password: password.value })
  }
</script>
