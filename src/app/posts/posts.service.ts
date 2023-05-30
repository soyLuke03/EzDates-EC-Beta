import { Injectable } from '@angular/core';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../interfaces/post.interface';
import { Like } from '../interfaces/like.interface';
import { Comment } from '../interfaces/comment.interface';


@Injectable({
    providedIn: 'root'
  })
  
  export class PostService {
    
    //access_token:string = localStorage.getItem('token')!;
    
    url:string = "https://ezdatesbeta-production.up.railway.app"
    urlPost:string = "https://ezdatesbeta-production.up.railway.app/posts"
    // urlPost:string = "http://localhost:8080/posts"
    // url:string = "http://localhost:8080"
  
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    Multipart = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    }
  
    constructor(private http: HttpClient) { }
    
    getPosts():Observable<Post[]>{
        return this.http.get<Post[]>(this.urlPost)
    }
    
    getPost(id:number):Observable<Post>{
       return this.http.get<Post>(this.urlPost+"/"+id)
    }

    postPost(post:any,trends:any, username:string, file:File){
      const form: FormData = new FormData();
      form.append('file', file, file.name);
      form.append('post', new Blob([JSON.stringify(post)], {type: 'application/json'}))
      
      

      return this.http.post<Post>(this.urlPost+"/add/"+username+"?trends="+trends,form);
    }

    putPost(post:Post,id:number, username:string){
      return this.http.put<Post>(this.urlPost+"/"+id+"/"+username,post);
    }

    deletePost(id:number){
      return this.http.delete<Post>(this.urlPost+"/"+id)
    }
    
    // LIKES Y POSTS //

    getLikes(){
      return this.http.get<Like[]>(this.url+"/likesPost")
    }

    addLike(id:number,username:string){
      return this.http.post<Like>(this.url+"/likesPost/add/"+username+"/"+id,{});
    }

    addComment(id:number,username:string,message:string){
      return this.http.post<Comment>(this.url+"/commentPosts/add/"+username+"/"+id,message)
    }

    // ------------------------------- //
  
  }