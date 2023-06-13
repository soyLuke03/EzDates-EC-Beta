import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts.service';
import { Post } from '../../interfaces/post.interface';
import { ConversionUtils } from 'turbocommons-ts';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class ListComponent implements OnInit {

  listaPosts!: Post[];
  commentsList!: any[];
  comment: string = ""

  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;

  constructor(private pS:PostService) { 
  }
  
  ngOnInit(): void {


    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3];
    }
    else{
      this.username = "Anonimous"
    }

    this.pS.getPosts()
    .subscribe({
      next: resp => {
        this.listaPosts = resp
        
      },
      error: (error)=> {}
    })
    
  }
  
  submitNewComment(idPost:number): void{
    this.pS.addComment(idPost,this.username,this.comment)
    .subscribe({
      next: resp => {
        location.reload()
      },
      error: (error) => {
        location.reload()
      }
    })
    
    this.comment = ""
  }

  addLike(idPost:number): void{
    this.pS.addLike(idPost,this.username)
    .subscribe({
      next: resp => {
        location.reload()
      },
      error: (error) => {
        if(error.status == 200){
          location.reload()
        }
      }
    })
  }

}
