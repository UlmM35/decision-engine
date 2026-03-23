import { useState } from "react";
import loanService from "../services/loanService";
import type { DecisionResult } from "../types";
import "./LoanForm.css";
import axios from "axios";

const LoanForm = () => {
  const [personalCode, setPersonalCode] = useState("");
  const [loanAmount, setLoanAmount] = useState(2000);
  const [loanPeriod, setLoanPeriod] = useState(12);

  const [result, setResult] = useState<DecisionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const data = await loanService.getLoanDecision({
        personalCode,
        loanAmount,
        loanPeriod,
      });

      setResult(data);
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            setError(err.response?.data?.error || "Something went wrong");
        } else {
            setError("Unexpected error");
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loan-form-container">
        <div className="loan-form">
            <form onSubmit={handleSubmit}>
                <h2>Apply for a loan</h2>

            <div className="form-group">
                <label>Personal Code</label>
                <input
                    value={personalCode}
                    onChange={(e) => setPersonalCode(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
            <label>Loan Amount (€)</label>
            <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                required
                />
            </div>

            <div className="form-group">
            <label>Loan Period (months)</label>
            <input
                type="number"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(Number(e.target.value))}
                required
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Loading." : "Check"}
            </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
            <div className="result">
                {result.approved ? (
                    <p>
                        Approved: {result.amount} € for {result.period} months
                    </p>
                ) : (
                <p>Loan not approved, reason: {result.reason}</p>
            )}
        </div>
        )}
      </div>
    </div>
  );
};

export default LoanForm;