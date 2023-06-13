import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from '../posts.service';
import { Post } from '../../interfaces/post.interface';
import { ConversionUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class PostComponent implements OnInit {

  
  commentsList: any[] = [];
  comment: string = ""

  likes: number = 0;

  
  post!: Post;
  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;
  

  constructor(private pS:PostService, private acRoute:ActivatedRoute) { }



  ngOnInit(): void {

    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3].toLowerCase();
    }

    this.acRoute.paramMap.subscribe((params:ParamMap) => {
      if(params.get('id')!=null){
        let idPost:any = params.get('id')!
        this.pS.getPost(idPost)
        .subscribe({
          next: resp => {
            this.post = resp
            for(let comentario of this.post.comments){
              this.commentsList.unshift(comentario)
            }
            this.likes = resp.likes.length
          },
          error: (error) => {}
        })
      }
    })

  }

  belong(user:string){
    return this.username == user
  }

  submitNewComment(idPost:number): void{
    
    this.pS.addComment(idPost,this.username,this.comment)
    .subscribe({
      next: resp => {
        this.commentsList.unshift(
          {
            user: this.username,
            message: this.comment
          }
        )
        this.comment = ""
      },
      error: (error) => {
        this.comment = ""
        
      }
    })
    
  }

  addLike(idPost:number): void{
    this.pS.addLike(idPost,this.username)
    .subscribe({
      next: resp => {
        this.likes+=1
      },
      error: (error) => {
        if(error.status == 200){
          this.likes-=1
        }
      }
    })
  }
  

}
