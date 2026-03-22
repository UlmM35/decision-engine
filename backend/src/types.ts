interface CustomerWithDebt {
    hasDebt: true;
}

interface CustomerWithoutDebt {
    hasDebt: false;
    creditModifier: number;
}

export type Customer = CustomerWithDebt | CustomerWithoutDebt

export interface LoanRequest {
    personalCode: string;
    loanAmount: number;
    loanPeriod: number;
}

interface DecisionResultFalse {
    approved: false;
}

interface DecisionResultTrue {
    approved: true;
    amount: number;
    period: number;
}

export type DecisionResult = DecisionResultFalse | DecisionResultTrue

export interface ErrorResult {
    error: string;
    status: number;
}