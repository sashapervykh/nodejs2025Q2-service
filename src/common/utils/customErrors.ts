export class CustomNotFoundError extends Error {
  constructor(endpoint: string) {
    super(`The ${endpoint} with requested id was not found!`);
    this.name = 'NotFoundError';
  }
}

export class CustomNotAuthorizedError extends Error {
  constructor() {
    super(`Wrong password was provided!`);
    this.name = 'NotAuthorizedError';
  }
}
