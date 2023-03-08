import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
 

  
  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    let request = req;

    if(token){ 
      request =req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`          
        }
      })

    }
    // console.log(request.headers.keys());
    // console.log(request);
    
    return next.handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401){
          Swal.fire({
            title: "Oh no",
            text: "Invalid credentials",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          })
          this.router.navigateByUrl('/logs/login');
          
        }
        return throwError(err);
      })
    )
  }
}
