import { Customer } from "../types";

const customers: Record<string, Customer> = {
  "49002010965": { hasDebt: true },
  "49002010976": { hasDebt: false, creditModifier: 100 },
  "49002010987": { hasDebt: false, creditModifier: 300 },
  "49002010998": { hasDebt: false, creditModifier: 1000 },
}

export function getCustomer(personalCode: string): Customer | null {
  return customers[personalCode] ?? null;
}