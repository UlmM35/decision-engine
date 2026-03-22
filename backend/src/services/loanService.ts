import { getCustomer } from "../customers/customers"
import { decide } from "../engine"
import { DecisionResult, ErrorResult } from "../types"

export const processLoanDecision = (personalCode: string, loanAmount: number, loanPeriod: number): DecisionResult | ErrorResult => {
  const customer = getCustomer(personalCode)

  if (!customer) {
    return { error: "Personal code not found", status: 404 }
  }

  if (customer.hasDebt) {
    return { approved: false }
  }

  return decide(customer.creditModifier, loanAmount, loanPeriod)
}