import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, delay, finalize, map, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ServicesInterceptorInterceptor implements HttpInterceptor {

  constructor(private cookieService:CookieService
    , private msg:NzMessageService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): 
  Observable<HttpEvent<unknown>> {
   const authRequest = request.clone({
    setHeaders:{
      'Authorization':this.cookieService.get('Authorization')
    }
   });

   return next.handle(authRequest).pipe(
    delay(0),
    map((event: HttpEvent<any>) => {           
        return event;
    }),
    catchError((error: any) => {                
        //console.log('error--->>>', error.error.errors.error.join(','));                
        this.msg.error(error.error.errors.error.join(','));
        return throwError(error);
    }),
    finalize(() =>{
        console.log('terminado');
    }));;
  }

  
}