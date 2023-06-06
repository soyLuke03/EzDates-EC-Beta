import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Follower } from '../interfaces/follower.interface';
import { Profile } from '../interfaces/profile.interface';
import { Game } from '../interfaces/game.interface';
import { Interest } from '../interfaces/interest.interface';
import { ProfileGame } from '../interfaces/profileGame.interface';
import { ProfileInterest } from '../interfaces/profileInterest.interface copy';


@Injectable({
    providedIn: 'root'
  })
  
  export class UserService {
    
    //access_token:string = localStorage.getItem('token')!;

    /* URL follows */
    followUrl:string = "https://ezdatesbeta-production.up.railway.app/follows"
    // followUrl:string = "http://localhost:8080/follows"

    /* URL register */
    urlRegister:string = "https://ezdatesbeta-production.up.railway.app/register"
    // urlRegister:string = "http://localhost:8080/register"

    /* URL users */
    url:string = "https://ezdatesbeta-production.up.railway.app/users"
    // url:string = "http://localhost:8080/users"

    /* URL games */
    urlGames:string = "https://ezdatesbeta-production.up.railway.app/games"
    // urlGames:string = "http://localhost:8080/games"

    /* URL interests */
    urlInterests:string = "https://ezdatesbeta-production.up.railway.app/interest"
    // urlInterests:string = "http://localhost:8080/interest"

    /* URL Profile */
    urlProfile:string = "https://ezdatesbeta-production.up.railway.app/profile"
    // urlProfile:string = "http://localhost:8080/profile"

    /* URL ProfileInterests */
    urlProfileInterests:string = "https://ezdatesbeta-production.up.railway.app/profileInterest"
    // urlProfileInterests:string = "http://localhost:8080/profileInterest"

    /* URL ProfileGames */
    urlProfileGames:string = "https://ezdatesbeta-production.up.railway.app/profileGame"
    // urlProfileGames:string = "http://localhost:8080/profileGame"

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    constructor(private http: HttpClient) { }
    
    getUsers():Observable<User[]>{
        return this.http.get<User[]>(this.url)
    }
    
    getUser(username:string):Observable<User[]>{
       return this.http.get<User[]>(this.url+"/"+username)
    }

    register(user:User){
      return this.http.post<User>(this.urlRegister,user);
    }

    putUser(user:User, username:string, email:string){
      return this.http.put<User>(this.url+"/"+username+"/"+email,user);
    }

    deleteUser(username:string){
      return this.http.delete<User>(this.url+"/"+username)
    }



    getFollows(){
      return this.http.get<Follower[]>(this.followUrl)
    }

    followUser(seguidor:string, seguido:string){
      return this.http.post<Follower>(this.followUrl+"/add/"+seguidor+"/"+seguido,null)
    }

    unfollowUser(seguidor:string, seguido:string){
      return this.http.delete<Follower>(this.followUrl+"/del/"+seguidor+"/"+seguido)
    }

    postProfile(profile:any, file:File){
      const form: FormData = new FormData();
      form.append('image', file, file.name);
      form.append('profile', new Blob([JSON.stringify(profile)], {type: 'application/json'}))
      // console.log(form.get("image"));
      // console.log(form.get("profile"));
      
      

      return this.http.post<Profile>(this.urlProfile+"/add",form);

    }

    getProfile(username:string){
      return this.http.get<Profile>(this.urlProfile+"/"+username)
    }

    getProfiles(){
      return this.http.get<Profile[]>(this.urlProfile)
    }

    getGames(){
      return this.http.get<Game[]>(this.urlGames)
    }

    getInterests(){
      return this.http.get<Interest[]>(this.urlInterests)
    }


    addNewGame(idProfile:string, idGame:number){
      return this.http.post<Game>(this.urlProfileGames+"/add/"+idProfile+"/"+idGame,"")
    }

    addNewInterest(idProfile:string, idInterest:number){
      return this.http.post<Game>(this.urlProfileInterests+"/add/"+idProfile+"/"+idInterest,"")
    }


    getProfileGames(idProfile:string){
      return this.http.get<ProfileGame[]>(this.urlProfileGames+"/"+idProfile)
    }

    getProfileInterests(idProfile:string){
      return this.http.get<ProfileInterest[]>(this.urlProfileInterests+"/"+idProfile)
    }
  
  }