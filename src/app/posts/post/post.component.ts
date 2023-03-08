import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../posts.service';
import { Post } from '../../interfaces/post.interface';
import { ConversionUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class PostComponent implements OnInit {

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

    let idPost = this.acRoute.snapshot.params['id'];
    this.pS.getPost(idPost)
    .subscribe({
      next: resp => {this.post = resp},
      error: (error) => console.log("ERROR on loading post")
    })
  }

  belong(user:string){
    return this.username == user
  }

  

}
