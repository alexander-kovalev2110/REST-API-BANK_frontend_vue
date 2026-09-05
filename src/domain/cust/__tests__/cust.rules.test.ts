import { describe, expect, it } from 'vitest'
import { validateRegister } from '../cust.rules'

describe('cust.rules validation', () => {
  it('should fail when username is less than 3 characters', () => {
    const customer = { name: 'ab', password: 'password' }
    const result = validateRegister(customer)
    expect(result).toBe('Username must be at least 3 characters')
  })

  it('should fail when password is less than 3 characters', () => {
    const customer = { name: 'alex', password: '12' }
    const result = validateRegister(customer)
    expect(result).toBe('Password must be at least 3 characters')
  })

  it('should return null for valid registration data', () => {
    const customer = { name: 'alex', password: 'password' }
    const result = validateRegister(customer)
    expect(result).toBeNull()
  })
})
