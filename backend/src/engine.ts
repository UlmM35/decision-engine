import { DecisionResult } from "./types";
import { MAX_PERIOD, MAX_AMOUNT, MIN_AMOUNT } from "./constants/constants";

// function for calculating the maximum possible loan
const calculateMaxLoan = (modifier: number, period: number): number | null => {
    const max = Math.min(MAX_AMOUNT, modifier * period);

    if (max < MIN_AMOUNT) {
        return null;
    }

    return Math.floor(max);
}

export const decide = (creditModifier: number, requestedAmount: number, requestedPeriod: number): DecisionResult => {

    const score = (creditModifier / requestedAmount) * requestedPeriod;
    // Check if credit score is >= 1
    if (score >= 1) {
        const maxAmount = calculateMaxLoan(creditModifier, requestedPeriod);

        if (maxAmount) {
            return {
                approved: true,
                amount: maxAmount,
                period: requestedPeriod,
            };
        }   
    }

    // try to find another option for the loan
    for (let period = requestedPeriod; period <= MAX_PERIOD; period++) {
        const maxAmount = calculateMaxLoan(creditModifier, period);

        if (maxAmount) {
            return {
                approved: true,
                amount: maxAmount,
                period,
            };
        }
    }

  // didnt pass so return false
  return { approved: false, reason: "Not good enough credit score" };
};