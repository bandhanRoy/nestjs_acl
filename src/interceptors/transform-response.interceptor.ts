import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, { message: string; data: T | null }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ message: string; data: T | null }> {
    return next.handle().pipe(
      map((data) => ({
        message: data.message || 'Success',
        data: data.data || null,
      })),
    );
  }
}
