export class CustomNotFoundError extends Error {
  constructor(endpoint: string) {
    super(`The ${endpoint} with requested id was not found!`);
    this.name = 'NotFoundError';
  }
}
