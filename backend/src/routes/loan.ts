import { Request, Response, Router } from "express"
import { processLoanDecision } from "../services/loanService"
import { LoanRequest } from "../types"
import { MIN_AMOUNT, MAX_AMOUNT, MIN_PERIOD, MAX_PERIOD } from "../constants/constants"

const router = Router()

router.post("/decision", (req: Request<{}, {}, LoanRequest>, res: Response) => {
  const { personalCode, loanAmount, loanPeriod } = req.body

  if (!personalCode || !loanAmount || !loanPeriod) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  if (loanAmount < MIN_AMOUNT || loanAmount > MAX_AMOUNT) {
    return res.status(400).json({ error: `Loan amount must be between ${MIN_AMOUNT} and ${MAX_AMOUNT}` })
  }

  if (loanPeriod < MIN_PERIOD || loanPeriod > MAX_PERIOD) {
    return res.status(400).json({ error: `Loan period must be between ${MIN_PERIOD} and ${MAX_PERIOD} months` })
  }

  const result = processLoanDecision(personalCode, loanAmount, loanPeriod)

  if ("error" in result) {
    const { status, error } = result;
    return res.status(status).json({ error });
  }

  res.json(result)
})

export default router