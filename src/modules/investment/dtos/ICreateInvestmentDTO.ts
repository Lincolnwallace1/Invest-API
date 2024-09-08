interface ICreateInvestmentDTO {
  user: number;
  name: string;
  initialValue: number;
  initialDate: string;
  expectedValue?: number;
}

export default ICreateInvestmentDTO;
