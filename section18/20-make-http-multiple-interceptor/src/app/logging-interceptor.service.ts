import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('[LoggingInterceptorService] req.url: ', req.url);
        console.log('[LoggingInterceptorService] header: ', req.headers);
        return next.handle(req).pipe(tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log('[LoggingInterceptorService] Response: ', event.body);

            }
        }));
    }
}