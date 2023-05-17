import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../posts/posts.service';
import { ConversionUtils } from 'turbocommons-ts';
import { Follower } from '../../interfaces/follower.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../users/users.component.css']
})
export class UserComponent implements OnInit {

  constructor(private uS:UserService, private acRoute:ActivatedRoute, private pS:PostService) { }

  user!:User[];
  userPosts:Post[] = [];

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

    //Obtener el usuario
    let idUser = this.acRoute.snapshot.params['id'];
    this.uS.getUser(idUser)
    .subscribe({
      next: resp => {
        this.user = resp
        console.log(resp);
        
      },
      error: (error) => console.log()
    })

    //Obtener los posts
    this.pS.getPosts()
    .subscribe({
      next: resp => {
        for (let post of resp) {
          if(post.user.username==this.user[0].username){
            this.userPosts.unshift(post)
          }
        }
      },
      error: (error) => console.log()
    })

    //Obtener seguidores
    this.uS.getFollows().subscribe({
      next: resp => {
        for (const followed of resp) {
          // console.log(followed.follower.username.toLowerCase(), this.username.toLowerCase());
          if(followed.follower.username.toLowerCase()==this.username.toLowerCase()){
            this.followers.unshift(followed.user.username)
          }
        }
        // console.log(this.followers)
      }
    })
  }

  //Seguir usuario
  follow(user:string){
    this.uS.followUser(this.username,user).subscribe({
      next: resp => {
        this.follows.unshift(user),
        this.reload()
      },
      error: (err) => console.log(err)  
    })
    // console.log(user + " is followed by " + this.username);
  }

  //Dejar de seguir un usuario
  unfollow(user:string){
    this.uS.unfollowUser(this.username,user).subscribe({
      next: resp => this.reload(),
      error: (err) => console.log(err)  
    })
    // console.log(user + " is unfollowed by " + this.username);

  }

  belong(user:string){
    return this.username == user
  }

  reload(){
    location.reload()
  }
}
