import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConversionUtils } from 'turbocommons-ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../sidebar/sidebar.component.css']
  
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router) { }

  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;
  role!: string;
  
  ngOnInit(): void {
    
    
    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3];
      this.role = this.payload.split('"')[9];
    }
  }
  

}
