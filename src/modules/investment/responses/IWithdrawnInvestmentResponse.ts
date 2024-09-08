interface IWithdrawnInvestmentResponse {
  id: number;
  date: Date;
  valueWithdrawn: number;
  realValueWithdrawn: number;
  tax: number;
  status: string;
}

export default IWithdrawnInvestmentResponse;
