import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorResponse: any = {
            timestamp: new Date().toISOString(),
            path: request.url,
            code: 'INTERNAL_ERROR',
            message: 'An unexpected error occurred',
        };

        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();
            status = exception.getStatus();

            if (typeof exceptionResponse === 'object') {
                errorResponse = {
                    ...errorResponse,
                    ...exceptionResponse,
                    status,
                };
            } else {
                errorResponse = {
                    ...errorResponse,
                    message: exceptionResponse,
                    status,
                };
            }
        } else if (exception instanceof Error) {
            errorResponse = {
                ...errorResponse,
                message: exception.message,
            };
        }

        response.status(status).json(errorResponse);
    }
}
