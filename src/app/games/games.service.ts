import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Trend } from '../interfaces/trend.interface';
import { Game } from '../interfaces/game.interface';


@Injectable({
    providedIn: 'root'
  })
  
  export class GamesService {
    
    // url:string = "https://ezdatesbeta-production.up.railway.app/games"
    url:string = "http://localhost:8080/games"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) { }

    getGames():Observable<Game[]>{
      return this.http.get<Game[]>(this.url)
    }
    
    deleteGame(name:string):Observable<Game>{
        return this.http.delete<Game>(this.url+"/delete/"+name)
    }

    postGame(game:Game):Observable<Game>{
      return this.http.post<Game>(this.url+"/add",game)
    }

    updateGame(name:string, game:Game):Observable<Game>{
        return this.http.put<Game>(this.url+"/update/"+name,game)
    }
  
  }