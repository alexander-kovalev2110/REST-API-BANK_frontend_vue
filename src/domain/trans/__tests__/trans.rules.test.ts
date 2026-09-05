import { describe, expect, it } from 'vitest'
import { validateAmount } from '../trans.rules'

describe('trans.rules validation', () => {
  it('should fail when amount is 0', () => {
    const result = validateAmount(0)
    expect(result).toBe('Amount must be greater than 0')
  })

  it('should fail when amount is negative', () => {
    const result = validateAmount(-10.5)
    expect(result).toBe('Amount must be greater than 0')
  })

  it('should return null when amount is positive', () => {
    const result = validateAmount(100.25)
    expect(result).toBeNull()
  })
})
