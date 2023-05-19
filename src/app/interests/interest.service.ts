import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interest } from '../interfaces/interest.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

    // url:string = "https://ezdatesbeta-production.up.railway.app/interest"
    url:string = "http://localhost:8080/interest"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) { }

    getInterest():Observable<Interest[]>{
      return this.http.get<Interest[]>(this.url)
    }

    deleteInterest(name:string):Observable<Interest>{
      return this.http.delete<Interest>(this.url+"/delete/"+name)
    }

    updateInterest(name:string, interest:Interest):Observable<Interest>{
      return this.http.put<Interest>(this.url+"/update/"+name,interest)
    }

}
