import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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

  commentsList!: Comment[];
  comment: string = ""

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

    this.aCRoute.paramMap.subscribe((params:ParamMap) => {

      //Actualiza la ruta en función del usuario
      if(params.get('id')!=null){

        this.tS.getTrend(params.get('id')!).subscribe({
          next: resp => {
            this.trend = resp
            
          }
        })

        this.pS.getPosts()
        .subscribe({
          next: resp => {
            this.posts = resp
            this.postDelTrend = []
            for (const post of this.posts) {
              for(const trend of post.trendsList) {
                if(trend.trend.name == this.trend.name){
                  this.postDelTrend.unshift(post); 
                } 
              }
            }
            
          },
          error: (error) => {}
        })
      }
      else{
        this.username = "NO USER FOUND"
      }
      
    })

  }



  submitNewComment(idPost:number): void{
    this.pS.addComment(idPost,this.username,this.comment)
    .subscribe({
      next: resp => {
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
