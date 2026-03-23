export interface LoanRequest {
    personalCode: string;
    loanAmount: number;
    loanPeriod: number;
}

interface DecisionResultFalse {
    approved: false;
    reason: string;
}

interface DecisionResultTrue {
    approved: true;
    amount: number;
    period: number;
}

export type DecisionResult = DecisionResultFalse | DecisionResultTrue
