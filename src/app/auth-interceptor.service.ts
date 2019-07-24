import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

  // Intercept is required to be an interceptor service
  intercept( req: HttpRequest<any>, next: HttpHandler ) {

    // Here is the code that will execute before the HTTP request is sent out
    const modidfiedRequest = req.clone({
      headers: req.headers.append( 'auth', 'Bearer ajsoSDFNlNsD876SF11' )
    });

    // Must always return the next handle called, passing the request.
    return next.handle(modidfiedRequest);
  }

}
