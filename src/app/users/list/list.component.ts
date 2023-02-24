import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../users/users.component.css']
})
export class ListComponent implements OnInit {

  constructor(private uS:UserService, private route:ActivatedRoute) { }

  

  
  @Input() nombreABuscar:string = ""
  
  
  
  error: boolean = false;
  userList: User[] = [];
  UserN:string = ""
  
  ngOnInit(): void {
    this.uS.getUsers().subscribe({
      next: resp => this.userList = resp
    })
    
  }

  emitUsername(){
    this.uS.getUser(this.UserN).subscribe({
      next: resp => this.userList = resp
    })
    this.UserN = "";
  }



}
