import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './users/user.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor() {
    
  }
  
  ngOnInit(): void { 
  }

  title = 'EzDates';
}
