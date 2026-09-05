<template>
  <v-layout class="fill-height">
    <NavBar />

    <v-navigation-drawer permanent style="z-index: 1004;" width="240">
      <v-list class="mt-16">
        <v-list-item link @click="menuHandler(TransAction.Add)">
          <v-list-item-title>Add Transaction</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="menuHandler(TransAction.Get)">
          <v-list-item-title>Get Transaction</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="menuHandler(TransAction.Filter)">
          <v-list-item-title>Get Transaction by Filter</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="menuHandler(TransAction.Update)">
          <v-list-item-title>Update Transaction</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="menuHandler(TransAction.Delete)">
          <v-list-item-title>Delete Transaction</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column fill-height mt-16" style="min-height: 100vh;">
      <TransTable />
      <TransDialog />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import NavBar from '@/components/NavBar.vue'
  import TransDialog from '@/components/TransDialog.vue'
  import TransTable from '@/components/TransTable.vue'
  import { TransAction } from '@/types/ui-actions'

  const store = useStore()
  const router = useRouter()

  const username = computed(() => store.state.cust.username)

  // Redirect to login if user logs out
  watch(
    username,
    newVal => {
      if (newVal === null) {
        router.push('/')
      }
    },
    { immediate: true },
  )

  function menuHandler (action: TransAction) {
    store.commit('modal/openTrans', action)
  }
</script>
