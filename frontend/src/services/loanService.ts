import axios from "axios";
import type { DecisionResult, LoanRequest } from "../types";

const baseUrl = "http://localhost:3000/api/loan";

const getLoanDecision = async (data: LoanRequest): Promise<DecisionResult> => {
    const response = await axios.post(`${baseUrl}/decision`, data);
    return response.data
}

export default {
    getLoanDecision
}; 