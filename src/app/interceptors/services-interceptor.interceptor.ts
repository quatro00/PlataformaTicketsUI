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
        console.log('error--->>>', error); 
        var tipoError:number = error.estatus;
        var errorMsg:string = ''; 
        switch (tipoError) {
          case 400:
            
            break;
        
          default:
              errorMsg = 'Ocurrio un error inesperado';
            break;
        }
                
        this.msg.error(errorMsg);
        return throwError(error);
    }),
    finalize(() =>{
        //console.log('terminado');
    }));;
  }

  
}
