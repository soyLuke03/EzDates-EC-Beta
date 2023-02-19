import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../posts.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class PostComponent implements OnInit {

  post!: Post;

  constructor(private pS:PostService, private acRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let idPost = this.acRoute.snapshot.params['id'];
    this.pS.getPost(idPost)
    .subscribe({
      next: resp => this.post = resp,
      error: (error) => console.log("ERROR on loading post")
    })
  }

  

}
