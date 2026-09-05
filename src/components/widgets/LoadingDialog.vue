<template>
  <v-dialog
    v-model="loading"
    persistent
    transition="none"
    width="auto"
  >
    <v-card class="pa-6 text-center" rounded="lg">
      <v-card-text class="d-flex flex-column align-center justify-center">
        <v-progress-circular
          class="mb-4"
          color="primary"
          indeterminate
          size="64"
        />

        <div class="text-h6">Processing your request...</div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const loading = computed(() => store.state.ui.loading)
</script>
