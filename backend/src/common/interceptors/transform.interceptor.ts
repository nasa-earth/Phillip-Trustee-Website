import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  timestamp: string;
  status: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Skip transformation for auth endpoints to avoid breaking client expectations
    const isAuthEndpoint = request.path.includes('/api/auth/');

    return next.handle().pipe(
      map((data) => {
        if (isAuthEndpoint) {
          // Return auth responses directly without transformation
          return data;
        }

        // Transform other responses with the standard format
        return {
          data,
          timestamp: new Date().toISOString(),
          status: response.statusCode,
        };
      }),
    );
  }
}
