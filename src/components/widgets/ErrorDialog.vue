<template>
  <v-snackbar
    v-model="show"
    color="error"
    location="bottom left"
    :timeout="6000"
  >
    {{ error }}
    <template #actions>
      <v-btn
        icon="mdi-close"
        variant="text"
        @click="close"
      />
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const error = computed(() => store.state.ui.error)

  const show = computed({
    get: () => error.value !== null,
    set: val => {
      if (!val) {
        close()
      }
    },
  })

  function close () {
    store.commit('ui/clearError')
  }
</script>
