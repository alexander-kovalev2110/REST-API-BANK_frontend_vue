// src/infrastructure/api/cust/axiosInstanceCust.ts
import axios from "axios"
import { API_URL } from "@/config/env"

export const axiosInstanceCust = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
