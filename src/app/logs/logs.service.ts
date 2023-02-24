import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/token.interface';


@Injectable({
    providedIn: 'root'
  })
  
  export class LogsService {
    
    //Url de verificación
    url:string = "http://localhost:8080/signin"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
  
  
    constructor(private http: HttpClient) { }
    
    verify(user:string, code:string){
      return this.http.get<any>(`http://localhost:8080/users/verify?code=${code}&user=${user}`)
    }

    login(username: string, password: string):Observable<boolean>{
        //Recuperamos el usuario y comprobamos que la contraseña sea correcta
      return this.http.post<boolean>(this.url, {username, password},this.httpOptions)
    }
  
  }