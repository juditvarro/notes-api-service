export class ApplicationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
