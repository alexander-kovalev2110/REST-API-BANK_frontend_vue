// domain/trans/trans.rules.ts
export function validateAmount (amount: number): string | null {
  return amount > 0 ? null : 'Amount must be greater than 0'
}
