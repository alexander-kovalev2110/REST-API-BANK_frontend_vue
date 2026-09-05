import type { Customer } from "@/domain/cust"

export type CustRequest = Pick<Customer, "name" | "password">

export type CustResponse = {
  token: string
}
