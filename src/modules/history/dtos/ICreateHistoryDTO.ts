interface ICreateHistoryDTO {
  investment: number;
  valueWithdrawn: number;
  realValueWithdrawn: number;
  date: Date;
  tax: number;
}

export default ICreateHistoryDTO;
