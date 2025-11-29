export class CustomNotFoundError extends Error {
  constructor(endpoint: string) {
    super(`The ${endpoint} with requested id was not found!`);
    this.name = 'NotFoundError';
  }
}

export class FavsNotFoundError extends Error {
  constructor(endpoint: string) {
    super(`The ${endpoint} was not in favorites!`);
    this.name = 'FavsNotFoundError';
  }
}

export class CustomNotAuthorizedError extends Error {
  constructor() {
    super(`Wrong password was provided!`);
    this.name = 'NotAuthorizedError';
  }
}

export class CustomUnprocessableEntityError extends Error {
  constructor(endpoint: string) {
    super(
      `The ${endpoint} with requested id was not found and could not be added to Favorites!`,
    );
    this.name = 'UnprocessableEntity';
  }
}
