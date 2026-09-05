import type { Transaction as DomainTransaction } from "@/domain/trans"

export type Transaction = Omit<DomainTransaction, "id"> & {
  transactionId: DomainTransaction["id"]
}

export type TransactionsResponse = {
  transactions: Transaction[]
  total: number
}
