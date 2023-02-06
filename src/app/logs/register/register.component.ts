import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../logs/logs.component.css']
})
export class RegisterComponent implements OnInit {

  errorPasswords:string = "";

  myForm: FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    name: [null],
    surname: [null, [Validators.required, Validators.minLength(1)]],
    password: [null, [Validators.required]],
    password2: [null, [Validators.required]]
  })
  
  constructor(private fb: FormBuilder, private acRoute: Router) { }

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

    equalsPasswords(){
      return this.myForm.controls['password'].value == this.myForm.controls['password2'].value
    }

    /**
   * Método cuando se envía el formulario correctamente
   */
  save = (e: { preventDefault: () => void; }) => {
    if(this.equalsPasswords()){
      console.log("Enviado")
      this.myForm.reset()
      this.errorPasswords=""

      Swal.fire({
        icon: 'success',
        title: 'Register success',
        text: 'Now check your email to verify your account'
      })
    }
    if(!this.equalsPasswords()){
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        timer: 2000,
        timerProgressBar: true
      })
      this.errorPasswords="Password do not match"
    }
    



  }
}
