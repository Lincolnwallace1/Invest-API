class IListInvestmentResponse {
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
  records: {
    investment: {
      id: number;
      name: string;
      initialDate: Date;
      initialValue: number;
      expectedValue: number;
      status: string;
      history: {
        date: Date;
        valueWithdrawn: number;
        realValueWithdrawn: number;
        tax: number;
      }[];
    };
  }[];
}

export default IListInvestmentResponse;
