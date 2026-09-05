<template>
  <v-container class="pa-4 flex-grow-1" fluid>
    <v-card class="mb-4" variant="outlined">
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
            <td class="text-center text-grey py-4" colspan="3">No transactions found</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <div class="d-flex align-center">
      <v-btn
        class="mr-4"
        :disabled="paginationState.previousDisabled"
        prepend-icon="mdi-chevron-left"
        variant="outlined"
        @click="handlePrev"
      >
        Previous
      </v-btn>

      <v-btn
        append-icon="mdi-chevron-right"
        :disabled="paginationState.nextDisabled"
        variant="outlined"
        @click="handleNext"
      >
        Next
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const transactions = computed(() => store.getters['trans/paginatedTransactions'])
  const paginationState = computed(() => store.getters['trans/paginationState'])

  function handlePrev () {
    store.commit('trans/previousPage')
    store.dispatch('trans/fetchTransactionsByFilter')
  }

  function handleNext () {
    store.commit('trans/nextPage')
    store.dispatch('trans/fetchTransactionsByFilter')
  }

  function formatDate (dateVal: any) {
    if (!dateVal) return ''
    return dateVal.toString()
  }
</script>
