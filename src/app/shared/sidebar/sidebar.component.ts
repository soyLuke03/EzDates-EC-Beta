import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ConversionUtils } from 'turbocommons-ts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../sidebar/sidebar.component.css']
  
})
export class SidebarComponent implements OnInit {

  constructor(private router:Router, private acRoute:ActivatedRoute) { }

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
  

  /* Método para dejar el navBar arriba y devolverlo cuando subas */
  isNavbarSticky: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkNavbarPosition();
  }

  checkNavbarPosition() {
    const navbar = document.getElementById('navbar');
    const sticky = navbar!.offsetTop;
    // console.log(window.pageYOffset, sticky);
    
    if(window.pageYOffset >= sticky && window.pageYOffset > 300){
      this.isNavbarSticky = true
    }
    else {
      this.isNavbarSticky = false
    }
    
  }
  

}

