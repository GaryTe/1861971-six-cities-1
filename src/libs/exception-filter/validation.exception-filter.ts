import {
  inject,
  injectable
} from 'inversify';
import {
  NextFunction,
  Request,
  Response
} from 'express';
import { StatusCodes } from 'http-status-codes';

import { ExceptionFilter } from './exception-filter.interface.js';
import { LoggerInterface } from '../../core/logger/index.js';
import { AppComponent } from '../../core/constants/app-component.enum.js';
import { ValidationError } from '../errors/index.js';
import { createErrorObject } from '../../helpers/index.js';
import { ApplicationError } from '../types/application-error.enum.js';

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] — ${errorField.message}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
