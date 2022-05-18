import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterAuthService implements HttpInterceptor{

  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = sessionStorage.getItem('Token');
    if(authToken){
      req = req.clone({
        setHeaders : {
          Authorization : "Bearer "+authToken
        }
      })
    }
    return next.handle(req);
  }
}
