import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { LogsService } from '../logs.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../logs/logs.component.css']
})
export class LoginComponent implements OnInit {

  errorLogin:string = "";
  /**
   * Cosas del formulario TEMPLATE
   */
  @ViewChild('myForm') myForm!: NgForm;
  
  username:string=""
  password:string=""
  /*--- --------------------- ---*/



  constructor(private router:Router, private auth:AuthService, private lS:LogsService) { }

  ngOnInit(): void {
    
  }

  
  /**
   * Método para logear al usuario
   */
  login(){
    // console.log(this.username, this.password)
    this.lS.login(this.username,this.password).subscribe({
      next: resp => console.log(resp),
      error: (error) => window.location.reload()
    })

    this.auth.login(this.username,this.password)
    .subscribe({
      next: (resp) => {
        if (resp) {
          Swal.fire({
            title: "Log in",
            text: "Please wait a second",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      
            color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          })
          
          this.router.navigate(['/posts']).then(() => window.location.reload());
        }
      }
    })
  }



  /**
   * Método para validar que los campos no estén vacíos
   * @param campo 
   * @returns 
   */
  notValid(campo: string): boolean{
    return this.myForm?.controls[campo]?.invalid &&
      this.myForm?.controls[campo]?.touched
  }






  /**
   * Método cuando se envía el formulario correctamente
   */
  verifyLogin = () => {

    if(localStorage.getItem('token')!=null){
      Swal.fire({
        title: "Log in",
        text: "You've been logged in",
        background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',
        color: 'white',
        confirmButtonColor: 'black',
        confirmButtonText: 'OK'
      })
      this.router.navigate(['/posts/list'])
    }
    else{
      Swal.fire({
        title: "Oh oh",
        text: "Incorrect credentials",
        background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',
        color: 'white',
        confirmButtonColor: 'black',
        confirmButtonText: 'OK'
      })
    }
  }




}
