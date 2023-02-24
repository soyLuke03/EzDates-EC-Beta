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
  listaTrend!: Trend[];

  constructor(private pS:PostService) { }

  ngOnInit(): void {
    this.pS.getPosts()
    .subscribe({
      next: resp => this.complementario(resp),
      error: (error)=> console.log(error)
    })
  }
  
  complementario(resp:any){
    this.listaPosts = resp;
    for (const post of this.listaPosts) {
      console.log(post.trendsList[0]);
      
      
      // if(post.trendsList.length!=0){
      //   for(const trend of post.trendsList){
      //     console.log(trend);
          
      //   }
        
      // }
      
    }
    
  }

}
