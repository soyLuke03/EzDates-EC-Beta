import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['../../logs/logs.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['logs/login'])
    Swal.fire({
      title: "Loging out",
      text: "You've been logged out",
      background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      color: 'white',
      confirmButtonColor: 'black',
      confirmButtonText: 'OK',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload()
    }})
  }
}
