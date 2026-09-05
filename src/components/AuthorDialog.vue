<template>
  <v-dialog v-model="authorOpen" max-width="400px" persistent>
    <v-card class="pa-2">
      <v-card-title class="d-flex align-center">
        <span>Authorization</span>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" @click="close"></v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
          variant="underlined"
          density="comfortable"
          class="mb-2"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="underlined"
          density="comfortable"
        ></v-text-field>
      </v-card-text>
      
      <v-card-actions class="justify-end pr-6 pb-4">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-login"
          @click="handleLogin"
          color="primary"
          class="mr-2"
        >
          Log in
        </v-btn>
        <v-btn
          variant="outlined"
          prepend-icon="mdi-account-plus"
          @click="handleRegister"
          color="secondary"
        >
          Sign up
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"

const store = useStore()

const authorOpen = computed({
  get: () => store.state.modal.authorOpen,
  set: (val) => {
    if (!val) close()
  }
})

const name = ref("")
const password = ref("")

// Reset inputs when dialog opens
watch(authorOpen, (newVal) => {
  if (newVal) {
    name.value = ""
    password.value = ""
  }
})

const close = () => {
  store.commit("modal/closeAuthor")
}

const handleLogin = () => {
  close()
  store.dispatch("cust/login", { name: name.value, password: password.value })
}

const handleRegister = () => {
  close()
  store.dispatch("cust/register", { name: name.value, password: password.value })
}
</script>
