import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/token.interface';
import Swal from 'sweetalert2';


@Injectable({
    providedIn: 'root'
  })
  
  export class LogsService {
    
    //access_token:string = localStorage.getItem('token')!;
    
    url:string = "localhost:8080/signin"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
  
  
    constructor(private http: HttpClient) { }
    
    login(email: string, password: string):Observable<boolean>{
        //Recuperamos el usuario y comprobamos que la contraseña sea correcta
      return this.http.post<AuthResponse>(this.url, {email, password},this.httpOptions)
        .pipe( switchMap(token => {
          localStorage.setItem('token', token.access_token);
          return of(true);
        }),catchError(error => {
          localStorage.removeItem('token');
          return of(false);
        })
        )
      }
  
  }