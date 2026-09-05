<template>
  <v-snackbar
    v-model="show"
    color="error"
    location="bottom left"
    :timeout="6000"
  >
    {{ error }}
    <template v-slot:actions>
      <v-btn
        variant="text"
        icon="mdi-close"
        @click="close"
      ></v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()

const error = computed(() => store.state.ui.error)

const show = computed({
  get: () => error.value !== null,
  set: (val) => {
    if (!val) {
      close()
    }
  }
})

const close = () => {
  store.commit("ui/clearError")
}
</script>
