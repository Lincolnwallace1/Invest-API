interface IAppErrorOptions {
  statusCode: number;
  name?: string;
  errorCode?: string;
  data?: any;
}

class AppError {
  public readonly name?: string;

  public readonly statusCode: number;

  public readonly errorCode?: string;

  public readonly data?: any;

  constructor(data: IAppErrorOptions) {
    this.name = data.name;
    this.statusCode = data.statusCode;
    this.errorCode = data.errorCode;
    this.data = data.data;
  }
}

export default AppError;
