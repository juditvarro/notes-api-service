import { ApplicationError } from './custom.js';

export class NotFoundError extends ApplicationError {}
export class BadRequestError extends ApplicationError {}
export class DatabaseError extends ApplicationError {}
export class HTTPError extends ApplicationError {}
export class ValidationError extends ApplicationError {}
