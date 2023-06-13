import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../posts/posts.service';
import { ConversionUtils } from 'turbocommons-ts';
import { Profile } from 'src/app/interfaces/profile.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../users/users.component.css', 
              '../../posts/posts.component.css']
})
export class UserComponent implements OnInit {

  constructor(private uS:UserService, private acRoute:ActivatedRoute, private pS:PostService) { }

  user!:User[];
  userName: string = ""

  listaPosts:Post[] = [];
  profile!:Profile

  commentsList!: Comment[];
  comment: string = ""

  games:string[] = []
  interests:string[] = []

  followers:string[] = []
  follows:string[] = []

  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;
  role!: string;

  ngOnInit(): void {

    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3].toLowerCase();
      this.role = this.payload.split('"')[9];
    }
    

    this.acRoute.paramMap.subscribe((params:ParamMap) => {

      //Actualiza la ruta en función del usuario
      if(params.get('id')!=null){
        this.userName = params.get('id')!
        // console.log(this.userName);
        // console.log(this.username);
        
        
        this.uS.getUser(this.userName)
        .subscribe({
          next: resp => {
            this.user = resp

            //Obtener los posts
            this.pS.getPosts()
            .subscribe({
              next: resp => {
                for (let post of resp) {
                  if(post.userId.toString()==this.user[0].username){
                    this.listaPosts.unshift(post)
                  }
                }
              },
              error: (error) => {}
            }),

            //Obtener el profile
            this.uS.getProfiles()
            .subscribe({
              next: resp => {
                for (const profile of resp) {
                  if(profile.username==this.user[0].username){
                    this.profile = profile
                  }
                }
                //Obtener los juegos del usuario
                // console.log(this.profile);
                
                if(this.profile){
                  this.uS.getProfile(this.userName)
                  .subscribe({
                  next: resp => {
                    console.log(resp);
                    
                    for(let game of resp.game_list){
                      this.games.unshift(game.game.name)
                    }
                  }
                })
                }

                //Obtener los intereses del usuario
                if(this.profile){
                  this.uS.getProfile(this.userName)
                  .subscribe({
                    next: resp => {
                      console.log(resp);
                      
                      for(let interest of resp.interest_list){
                        this.interests.unshift(interest.interest.name)
                      }
                    }
                  })
                }
                
              },
              error: (err) => {}
            })

            
          },
          error: (error) => {}
        })
    
        
    

    
        //Obtener seguidores
        this.uS.getFollows().subscribe({
          next: resp => {
            this.follows = []
            for (const u of resp) {
              if(u.user.toString()==this.username){
                this.follows.unshift(u.follower.toString())
              }
            }
            // console.log(this.follows);
            this.followers = []
            for (const a of resp) {
              if(a.user.toString()!=this.username){
                this.followers.unshift(a.user.toString())
              }
            }
            // console.log(this.followers);
          }
        })



      }
      else{
        this.username = "NO USER FOUND"
      }
      
    })


  }

  //Seguir usuario
  follow(user:string){
    // console.log(user);
    
    this.uS.followUser(this.username,user).subscribe({
      next: resp => {
        this.followers.unshift(user)
        // console.log(this.follows);
        // console.log(this.followers);
      },
      error: (err) => console.log(err)  
    })
  }

  //Dejar de seguir un usuario
  unfollow(user:string){
    this.uS.unfollowUser(this.username,user).subscribe({
      next: resp => {
        this.followers.splice(this.followers.indexOf(user), 1)

        // console.log(this.followers);
        // console.log(this.follows);
      },
      error: (err) => {}
    })
  }

  belong(user:string){
    return this.username == user
  }

  reload(){
    location.reload()
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
      }
      
    })
  }
}
