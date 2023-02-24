import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConversionUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../sidebar/sidebar.component.css']
  
})
export class SidebarComponent implements OnInit {

  constructor() { }
  
  UName:string = ""

  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;
  
  ngOnInit(): void {
    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3];
    }
  }

 
  findByUName(evento:string){

    console.log(evento);
    
    this.UName = evento
  }

}
