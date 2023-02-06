import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as e from 'express';

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
  email:string=""
  password:string=""
  /*--- --------------------- ---*/

  /*-- Credenciales de acceso temporales--*/
  entryEmail:string = "0"
  entryPassword:string = "0"
  /*----------------------------*/


  constructor() { }

  ngOnInit(): void {
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
    let email = this.myForm.controls['email'].value;
    let pass = this.myForm.controls['password'].value

    if(email===this.entryEmail && pass === this.entryPassword){
      this.errorLogin="";
      this.myForm.resetForm({
        email:"",
        password:""
      })
    }
    else{
      this.errorLogin="Credentials are incorrect"
    }

  }

}
