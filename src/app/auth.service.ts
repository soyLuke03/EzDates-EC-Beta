import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, Observable, of, switchMap } from "rxjs";
import Swal from "sweetalert2";
import { AuthResponse } from "./interfaces/token.interface";
import { Router } from '@angular/router';
 
@Injectable()
export class AuthService {
    
    

    url:string = "http://localhost:8080/signin"
  

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    constructor(private http:HttpClient, private route:Router){ }
    
    urlAuth: string = 'http://localhost:8080/jwt'
//   loggedIn = false;
 
  isAuthenticated(): Observable<boolean> { 
    return this.http.get<any>(this.urlAuth)
    .pipe( switchMap( resp => {
      return of(true)
    }),
    catchError(err => {
      localStorage.removeItem('token')
      this.route.navigate(['/logs/login'])

      return of(false)
    })
    )
  }
 


  login(username: string, password: string):Observable<boolean>{
    //Recuperamos el usuario y comprobamos que la contraseña sea correcta
  return this.http.post<AuthResponse>(this.url, {username, password},this.httpOptions)
    .pipe( switchMap(token => {
    //   console.log(token.token);
      localStorage.setItem('token', token.token);
    //   console.log("Token creado")
    //   console.log(token.token);      
      return of(true);
    }),catchError(error => {
      localStorage.removeItem('token');
      // console.log(error)
      return of(false);
    })
    )
  }
 
  logout() {
    localStorage.removeItem('token');
  }
}