import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Trend } from '../interfaces/trend.interface';


@Injectable({
    providedIn: 'root'
  })
  
  export class TrendService {
    
    //access_token:string = localStorage.getItem('token')!;
    
    url:string = "http://localhost:8080/trends"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) { }


    getTrends():Observable<Trend[]>{
      return this.http.get<Trend[]>(this.url)
    }

    getTrend(name:string):Observable<Trend>{
      return this.http.get<Trend>(this.url+"/"+name)
    }

    putTrend(name:string, trend:Trend):Observable<Trend>{
      return this.http.put<Trend>(this.url+"/"+name,trend)
    }

    deleteTrend(name:string):Observable<Trend>{
      return this.http.delete<Trend>(this.url+"/"+name)
    }
  
  }