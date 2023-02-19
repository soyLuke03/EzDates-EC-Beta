import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/token.interface';


@Injectable({
    providedIn: 'root'
  })
  
  export class LogsService {
    
    //access_token:string = localStorage.getItem('token')!;
    
    url:string = "http://localhost:8080/signin"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
  
  
    constructor(private http: HttpClient) { }
    
    login(username: string, password: string):Observable<boolean>{
        //Recuperamos el usuario y comprobamos que la contraseña sea correcta
      return this.http.post<AuthResponse>(this.url, {username, password},this.httpOptions)
        .pipe( switchMap(token => {
          console.log(token.token);
          localStorage.setItem('token', token.token);
          console.log("Token creado")
          return of(true);
        }),catchError(error => {
          localStorage.removeItem('token');
          console.log(error)
          return of(false);
        })
        )
      }
  
  }