<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <!-- Global Widgets -->
    <ErrorDialog />
    <LoadingDialog />
  </v-app>
</template>

<script lang="ts" setup>
  import ErrorDialog from '@/components/widgets/ErrorDialog.vue'
  import LoadingDialog from '@/components/widgets/LoadingDialog.vue'
</script>
