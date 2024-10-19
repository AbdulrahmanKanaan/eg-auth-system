export class Exception extends Error {
  constructor({ message }: Exception.Constructor) {
    super(message);
  }
}

export namespace Exception {
  export interface Constructor {
    message?: string;
  }
}
