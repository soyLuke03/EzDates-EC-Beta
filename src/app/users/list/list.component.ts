import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../users/users.component.css']
})
export class ListComponent implements OnInit {

  constructor(private uS:UserService) { }

  userList!:User[];

  ngOnInit(): void {
    this.uS.getUsers().subscribe({
      next: resp => this.userList = resp
    })
  }

}
