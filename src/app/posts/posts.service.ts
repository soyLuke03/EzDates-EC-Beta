import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../interfaces/post.interface';


@Injectable({
    providedIn: 'root'
  })
  
  export class PostService {
    
    //access_token:string = localStorage.getItem('token')!;
    
    // url:string = "https://ezdatesbeta-production.up.railway.app/posts"
    url:string = "http://localhost:8080/posts"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    Multipart = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    }
  
    constructor(private http: HttpClient) { }
    
    getPosts():Observable<Post[]>{
        return this.http.get<Post[]>(this.url)
    }
    
    getPost(id:number):Observable<Post>{
       return this.http.get<Post>(this.url+"/"+id)
    }

    postPost(post:any,trends:any, username:string, file:File){
      const form: FormData = new FormData();
      form.append('file', file, file.name);
      form.append('post', new Blob([JSON.stringify(post)], {type: 'application/json'}))
      
      

      return this.http.post<Post>(this.url+"/add/"+username+"?trends="+trends,form);

    }

    putPost(post:Post,id:number, username:string){
      return this.http.put<Post>(this.url+"/"+id+"/"+username,post);
    }

    deletePost(id:number){
      return this.http.delete<Post>("http://localhost:8080/posts/"+id)
    }

  
  }