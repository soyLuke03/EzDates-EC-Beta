import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendService } from '../trend.service';
import { Trend } from '../../interfaces/trend.interface';
import { PostService } from '../../posts/posts.service';
import { Post } from '../../interfaces/post.interface';
import { ConversionUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['../../trends/trends.component.css']
})
export class TrendComponent implements OnInit {
  trend!:Trend;
  posts!:Post[]
  postDelTrend:Post[] = []

  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;
  role!:string;
  
  constructor(private aCRoute:ActivatedRoute, private tS:TrendService, private pS:PostService) {
  
   }


  ngOnInit(): void {

    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3];
      this.role = this.payload.split('"')[9];
    }

    let id = this.aCRoute.snapshot.params['id'];
    this.tS.getTrend(id).subscribe({
      next: resp => this.trend = resp
    })

    this.pS.getPosts()
    .subscribe({
      next: resp => this.complementario(resp),
      error: (error) => console.log()
    })
  }

  complementario(resp:any){
    this.posts = resp

    for (const post of this.posts) {
      for(const trend of post.trendsList) {
        if(trend.trend.name == this.trend.name){
          // console.log(this.trend.name);
          this.postDelTrend.unshift(post);
          
        }
        
      }
      
    }
  }

}
