import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthentificationService } from '../service/authentification.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService:AuthentificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!(request.url.includes("/token")||request.url.includes("/categories")
    ||request.url.includes("/products" )||request.url.includes("/new_user")
  || request.url.includes("/verify")|| request.url.includes("/sentOtp")
  || request.url.includes("/resetPassword")
    )){

     let newRequest=request.clone({ 
      setHeaders:{
        Authorization:'Bearer '+this.authService.accessToken
      }
      })
      
    
    return next.handle(newRequest).pipe(catchError(err=>{
           if(err.status==401){
          this.authService.logout()
           }
           return throwError(err.message)
    }))
  }else return next.handle(request)
  }
} 
