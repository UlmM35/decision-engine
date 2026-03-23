import { getCustomer } from "../customers/customers"
import { decide } from "../engine"
import { DecisionResult } from "../types"

export const processLoanDecision = (personalCode: string, loanAmount: number, loanPeriod: number): DecisionResult | { error: string; status: number } => {
  const customer = getCustomer(personalCode)

  if (!customer) {
    return { error: "Personal code not found", status: 404 }
  }

  if (customer.hasDebt) {
    return { approved: false, reason: "You have debt" }
  }

  return decide(customer.creditModifier, loanAmount, loanPeriod)
}