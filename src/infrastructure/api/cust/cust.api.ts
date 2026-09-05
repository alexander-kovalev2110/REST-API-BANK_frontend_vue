// src/infrastructure/api/cust/cust.api.ts
import { axiosInstanceCust } from "./axiosInstanceCust"
import type { CustRequest, CustResponse } from "./cust.types"

export const custApi = {
  async login(cust: CustRequest): Promise<CustResponse> {
    const { data } = await axiosInstanceCust.post<CustResponse>(
      "/customers/login", 
      cust
    )
    return data
  },

  async register(cust: CustRequest): Promise<CustResponse> {
    const { data } = await axiosInstanceCust.post<CustResponse>(
      "/customers/register", 
      cust
    )
    return data
  }
}
