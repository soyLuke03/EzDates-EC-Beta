import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../posts/posts.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../users/users.component.css']
})
export class UserComponent implements OnInit {

  constructor(private uS:UserService, private acRoute:ActivatedRoute, private pS:PostService) { }

  user!:User;
  userPosts:Post[] = [];

  ngOnInit(): void {
    let idUser = this.acRoute.snapshot.params['id'];
    this.uS.getUser(idUser)
    .subscribe({
      next: resp => this.user = resp,
      error: (error) => console.log("ERROR on loading user")
    })

    this.pS.getPosts()
    .subscribe({
      next: resp => this.getUserPosts(resp),
      error: (error) => console.log("ERROR on loading posts")
    })

    
  }


  getUserPosts(posts:Post[]){
    for (let post of posts) {
      if(post.user.username==this.user.username){
        this.userPosts.unshift(post)
      }
    }
  }

}
