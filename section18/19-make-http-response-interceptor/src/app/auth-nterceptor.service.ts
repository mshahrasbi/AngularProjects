import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log('[AuthInterceptorService] Request is on its way');
        console.log('[AuthInterceptorService] req. URL: ', req.url);


        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });

        return next.handle(modifiedRequest).pipe(
            tap( event => {
                console.log('[AuthInterceptorService] event: ', event);

                if (event.type === HttpEventType.Response) {
                    console.log('[AuthInterceptorService] Response: ', event.body);
                }
            })
        );
    }
    
}
