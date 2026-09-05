<template>
  <v-dialog v-model="transOpen" max-width="450px" persistent>
    <v-card v-if="transAction" class="pa-2">
      <v-card-title class="d-flex align-center">
        <span>Transaction Operation</span>
        <v-spacer />
        <v-btn icon="mdi-close" variant="text" @click="close" />
      </v-card-title>

      <v-card-text>
        <div v-for="field in currentFields" :key="field.id">
          <!-- Text field for strings/numbers -->
          <v-text-field
            v-if="field.type !== 'date'"
            v-model="formValues[field.id]"
            class="mb-2"
            density="comfortable"
            :label="field.label"
            :type="field.type"
            variant="underlined"
          />

          <!-- Input field for dates (uses HTML date picker or text input with date type) -->
          <v-text-field
            v-else
            v-model="formValues[field.id]"
            class="mb-2"
            density="comfortable"
            focused
            :label="field.label"
            type="date"
            variant="underlined"
          />
        </div>
      </v-card-text>

      <v-card-actions class="justify-end pr-6 pb-4">
        <v-btn
          color="primary"
          prepend-icon="mdi-send"
          variant="outlined"
          @click="handleSubmit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { TransAction } from '@/types/ui-actions'

  type FieldDef = {
    id: string
    label: string
    type: string
  }

  const formSchema: Record<TransAction, FieldDef[]> = {
    [TransAction.Add]: [
      { id: 'amount', label: 'Amount', type: 'number' },
    ],
    [TransAction.Get]: [
      { id: 'transactionId', label: 'Transaction ID', type: 'number' },
    ],
    [TransAction.Filter]: [
      { id: 'amount', label: 'Amount', type: 'number' },
      { id: 'date', label: 'Date', type: 'date' },
    ],
    [TransAction.Update]: [
      { id: 'transactionId', label: 'Transaction ID', type: 'number' },
      { id: 'amount', label: 'Amount', type: 'number' },
    ],
    [TransAction.Delete]: [
      { id: 'transactionId', label: 'Transaction ID', type: 'number' },
    ],
  }

  const store = useStore()

  const transOpen = computed({
    get: () => store.state.modal.transOpen,
    set: val => {
      if (!val) close()
    },
  })

  const transAction = computed<TransAction | null>(() => store.state.modal.transAction)

  const currentFields = computed<FieldDef[]>(() => {
    if (!transAction.value) return []
    return formSchema[transAction.value] || []
  })

  const formValues = ref<Record<string, any>>({})

  // Reset form values on dialog open
  watch(transOpen, isOpen => {
    if (isOpen) {
      formValues.value = {}
    }
  })

  function close () {
    store.commit('modal/closeTrans')
  }

  function collectFormData () {
    const data: Record<string, any> = {}
    for (const field of currentFields.value) {
      const val = formValues.value[field.id]
      if (val === undefined || val === '') continue

      if (field.type === 'number') {
        const n = Number(val)
        if (!Number.isNaN(n)) data[field.id] = n
      } else {
        data[field.id] = val
      }
    }
    return data
  }

  function handleSubmit () {
    if (!transAction.value) return

    const data = collectFormData()

    switch (transAction.value) {
      case TransAction.Add: {
        store.dispatch('trans/createTransaction', { amount: data.amount })
        break
      }
      case TransAction.Get: {
        store.dispatch('trans/fetchTransactionById', { id: String(data.transactionId) })
        break
      }
      case TransAction.Filter: {
        store.commit('trans/setFilter', { amount: data.amount, date: data.date })
        store.dispatch('trans/fetchTransactionsByFilter')
        break
      }
      case TransAction.Update: {
        store.dispatch('trans/updateTransaction', { id: String(data.transactionId), amount: data.amount })
        break
      }
      case TransAction.Delete: {
        store.dispatch('trans/deleteTransaction', { id: String(data.transactionId) })
        break
      }
    }
    close()
  }
</script>
