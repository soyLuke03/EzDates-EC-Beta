import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import Swal from 'sweetalert2'
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../logs/logs.component.css']
})
export class RegisterComponent implements OnInit {

  errorPasswords:string = "";

  myForm: FormGroup = this.fb.group({
    username: [null, [Validators.required,Validators.maxLength(199)]],
    email: [null, [Validators.required, Validators.email, Validators.maxLength(199)]],
    name: [null,Validators.maxLength(199)],
    surname: [null, [Validators.required,Validators.maxLength(199)]],
    password: [null, [Validators.required,Validators.maxLength(199),Validators.minLength(8)]],
    password2: [null, [Validators.required,Validators.maxLength(199),Validators.minLength(8)]]
  })


  
  constructor(private fb: FormBuilder, private router: Router, private uS:UserService) { }

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

    let newUser:User = {
      username: this.myForm.controls['username'].value,
      email: this.myForm.controls['email'].value,
      password: this.myForm.controls['password'].value,
      name: this.myForm.controls['name'].value,
      surname: this.myForm.controls['username'].value,
      verificationCode: "",
      enabled: false,
      role: "USER_ROLE"
    }

    if(this.equalsPasswords()){
      console.log(newUser);
      
      this.uS.register(newUser).subscribe({
        next: resp => 
        Swal.fire({
          title: "Created",
          text: "Your profile has been created succesfully. Now verifiy your account",
          background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
          confirmButtonColor: 'black',
          confirmButtonText: 'OK'
        }),
        error: (error) =>
          Swal.fire({
            title: "An error has appeared",
            text: "The profile cannot be created. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }) 
      })
      // console.log("Enviado")
      this.myForm.reset()
      this.errorPasswords=""

      this.router.navigate(['logs/login'])
    }
    if(!this.equalsPasswords()){
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
        confirmButtonColor: 'black',
        confirmButtonText: 'OK'
      })
      this.errorPasswords="Password do not match"
    }
    



  }
}
