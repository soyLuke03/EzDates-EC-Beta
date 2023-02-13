import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { LogsService } from '../logs.service';


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


  /*-- Credenciales de acceso temporales--*/
  entryusername:string = "0"
  entryPassword:string = "0"
  /*----------------------------*/


  constructor(private router:Router, private logsService:LogsService) { }

  ngOnInit(): void {
  }


  /**
   * Método para logear al usuario
   */
  login(){
    console.log(this.username, this.password)
    this.logsService.login(this.username,this.password)
    .subscribe({
      next: resp => console.log(resp),
      error: resp => console.log("ERROR")
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
  save = (e: { preventDefault: () => void; }) => {
    let username = this.myForm.controls['username'].value;
    let pass = this.myForm.controls['password'].value

    if(username===this.entryusername && pass === this.entryPassword){
      this.errorLogin="";
      this.myForm.resetForm({
        email:"",
        password:""
      })
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
      this.errorLogin="Credentials are incorrect"
      setTimeout(() => {
        this.errorLogin=""
      }, 3000);
    }

  }

}
