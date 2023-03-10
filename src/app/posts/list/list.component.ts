import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts.service';
import { Post } from '../../interfaces/post.interface';
import { Trend } from '../../interfaces/trend.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class ListComponent implements OnInit {

  listaPosts!: Post[];

  constructor(private pS:PostService) { 
  }
  
  ngOnInit(): void {
    this.pS.getPosts()
    .subscribe({
      next: resp => {this.listaPosts = resp},
      error: (error)=> console.log()
    })
    
  }
  


}
