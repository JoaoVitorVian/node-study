import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public resource: string = 'Resource') {
    super(`${resource} not found`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export class ValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: { message: string; field?: string }[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(public originalError: Error) {
    super('Database operation failed');
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Internal server error' }];
  }
}