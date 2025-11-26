import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomNotAuthorizedError, CustomNotFoundError } from './customErrors';

export function handleError(err) {
  if (err instanceof CustomNotFoundError) {
    throw new HttpException(
      {
        message: err.message,
        statusCode: HttpStatus.NOT_FOUND,
        error: 'NOT FOUND',
      },
      HttpStatus.NOT_FOUND,
      { cause: err },
    );
  }

  if (err instanceof CustomNotAuthorizedError) {
    throw new HttpException(
      {
        message: err.message,
        statusCode: HttpStatus.FORBIDDEN,
        error: 'FORBIDDEN',
      },
      HttpStatus.FORBIDDEN,
      { cause: err },
    );
  }

  throw new HttpException(
    {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message ? err.message : 'Unexpected internal server error',
      error: 'INTERNAL SERVER ERROR',
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
    { cause: err },
  );
}
