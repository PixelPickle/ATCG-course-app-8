import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {

  // Intercept is required to be an interceptor service
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('Outgoing Request to: ' + req.url);
    console.log('Headers: ' + req.headers);

    return next.handle(req).pipe(
      tap( event => {
        if (event.type === HttpEventType.Response) {
          console.log('Response arrived: ');
          console.log(event.body);
        }
      })
    );
  }

}
