<template>
  <v-container fluid class="pa-4 flex-grow-1">
    <v-card variant="outlined" class="mb-4">
      <v-table density="compact">
        <thead>
          <tr>
            <th class="font-weight-bold">TransactionId</th>
            <th class="font-weight-bold">Amount</th>
            <th class="font-weight-bold">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in transactions" :key="index">
            <td>{{ item.transactionId }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ formatDate(item.date) }}</td>
          </tr>
          <tr v-if="transactions.length === 0">
            <td colspan="3" class="text-center text-grey py-4">No transactions found</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <div class="d-flex align-center">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-chevron-left"
        :disabled="paginationState.previousDisabled"
        @click="handlePrev"
        class="mr-4"
      >
        Previous
      </v-btn>
      <v-btn
        variant="outlined"
        append-icon="mdi-chevron-right"
        :disabled="paginationState.nextDisabled"
        @click="handleNext"
      >
        Next
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()

const transactions = computed(() => store.getters["trans/paginatedTransactions"])
const paginationState = computed(() => store.getters["trans/paginationState"])

const handlePrev = () => {
  store.commit("trans/previousPage")
  store.dispatch("trans/fetchTransactionsByFilter")
}

const handleNext = () => {
  store.commit("trans/nextPage")
  store.dispatch("trans/fetchTransactionsByFilter")
}

const formatDate = (dateVal: any) => {
  if (!dateVal) return ""
  return dateVal.toString()
}
</script>
