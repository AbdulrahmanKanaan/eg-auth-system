import { Exception } from "./exception";

export class ApiCallException extends Exception {
  public readonly data: ApiCallException.Data;

  constructor({ data, message }: ApiCallException.Constructor) {
    super({ message });
    this.data = data;
  }
}

export namespace ApiCallException {
  export interface Constructor extends Exception.Constructor {
    data: Data;
  }

  export interface Data {
    error: string;
    message: string | string[];
    statusCode: number;
  }
}
