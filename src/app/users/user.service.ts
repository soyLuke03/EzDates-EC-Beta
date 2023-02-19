import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';


@Injectable({
    providedIn: 'root'
  })
  
  export class UserService {
    
    //access_token:string = localStorage.getItem('token')!;
    
    url:string = "http://localhost:8080/users"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) { }
    
    getUsers():Observable<User[]>{
        return this.http.get<User[]>(this.url)
    }
    
    getUser(username:string):Observable<User>{
       return this.http.get<User>(this.url+"/"+username)
    }

    register(user:User){
      return this.http.post<User>(this.url+"/register",user);
    }

    putUser(user:User, username:string, email:string){
      return this.http.put<User>(this.url+"/"+username+"/"+email,user);
    }

    deleteUser(username:string){
      return this.http.delete<User>("http://localhost:8080/users/"+username)
    }

  
  }