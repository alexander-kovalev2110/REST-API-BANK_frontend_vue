<template>
  <div class="fill-height d-flex flex-column">
    <NavBar />
    <AuthorDialog />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import NavBar from "@/components/NavBar.vue"
import AuthorDialog from "@/components/AuthorDialog.vue"

const store = useStore()
const router = useRouter()

const username = computed(() => store.state.cust.username)

// Redirect to /trans if customer is logged in
watch(
  username,
  (newVal) => {
    if (newVal !== null) {
      router.push("/trans")
    }
  },
  { immediate: true }
)
</script>
